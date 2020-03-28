import { v4 as uuid } from 'uuid';

import { Post } from '../../types/models';
import { PostRepository } from '../definitions/post';
import { inMemoryDB, InMemoryDB } from './database';

type NewPostRepository = () => PostRepository;

const getPostsFn = ({ posts }: InMemoryDB) => {
  return async () => posts;
};

const getAuthorPostsFn = ({ posts }: InMemoryDB) => {
  return async (authorId: string) =>
    posts.filter(post => post.authorId === authorId);
};

const getFindPostFn = ({ posts }: InMemoryDB) => {
  return async (postId: string) => posts.find(({ id }) => id === postId);
};

const getCreatePostFn = ({ posts }: InMemoryDB) => {
  return async (args: Omit<Post, 'id'>) => {
    const post = { ...args, id: uuid() };
    posts.push(post);
    return post;
  };
};

const getDeletePostFn = (db: InMemoryDB) => {
  return async (postId: string) => {
    const hasPost = db.posts.some(({ id }) => id === postId);
    if (!hasPost) {
      throw new Error('post not found');
    }

    db.posts = db.posts.filter(({ id }) => id !== postId);
  };
};

const getDeleteAuthorPostsFn = (db: InMemoryDB) => {
  return async (authorId: string) => {
    const deletablePostIds = new Set<string>();

    db.posts = db.posts.filter(post => {
      const shouldDelete = post.authorId === authorId;
      if (shouldDelete) {
        deletablePostIds.add(post.id);
      }
      return !shouldDelete;
    });

    return Array.from(deletablePostIds);
  };
};

const newPostRepository: NewPostRepository = () => {
  const db = inMemoryDB;

  return {
    getPosts: getPostsFn(db),
    getAuthorPosts: getAuthorPostsFn(db),
    findPost: getFindPostFn(db),
    createPost: getCreatePostFn(db),
    deletePost: getDeletePostFn(db),
    deleteAuthorPosts: getDeleteAuthorPostsFn(db),
  };
};

export const postRepository = newPostRepository();
