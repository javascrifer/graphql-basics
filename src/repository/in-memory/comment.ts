import { v4 as uuid } from 'uuid';

import { Comment } from '../../types/models';
import { CommentRepository } from '../definitions/comment';
import { inMemoryDB, InMemoryDB } from './database';

type NewCommentRepository = () => CommentRepository;

const getCommentsFn = ({ comments }: InMemoryDB) => {
  return async () => comments;
};

const getCommentsByKeyFn = ({ comments }: InMemoryDB, key: keyof Comment) => {
  return async (value: string) =>
    comments.filter(comment => comment[key] === value);
};

const getFindCommentFn = ({ comments }: InMemoryDB) => {
  return async (commentId: string) =>
    comments.find(({ id }) => id === commentId);
};

const getCreateCommentFn = ({ comments }: InMemoryDB) => {
  return async (args: Omit<Comment, 'id'>) => {
    const comment = { ...args, id: uuid() };
    comments.push(comment);
    return comment;
  };
};

const getDeleteCommentFn = (db: InMemoryDB) => {
  return async (commentId: string) => {
    const hasComment = db.comments.some(({ id }) => id === commentId);
    if (!hasComment) {
      throw new Error('comment not found');
    }
    db.comments = db.comments.filter(({ id }) => id !== commentId);
  };
};

const getDeleteAuthorCommentsFn = (db: InMemoryDB) => {
  return async (authorId: string) => {
    db.comments = db.comments.filter(comment => comment.authorId !== authorId);
  };
};

const getDeletePostsCommentsFn = (db: InMemoryDB) => {
  return async (postIds: string[]) => {
    db.comments = db.comments.filter(({ postId }) => !postIds.includes(postId));
  };
};

const newCommentRepository: NewCommentRepository = () => {
  const db = inMemoryDB;

  return {
    getComments: getCommentsFn(db),
    getUserComment: getCommentsByKeyFn(db, 'authorId'),
    getPostComments: getCommentsByKeyFn(db, 'postId'),
    findComment: getFindCommentFn(db),
    createComment: getCreateCommentFn(db),
    deleteComment: getDeleteCommentFn(db),
    deleteAuthorComments: getDeleteAuthorCommentsFn(db),
    deletePostsComments: getDeletePostsCommentsFn(db),
  };
};

export const commentRepository = newCommentRepository();
