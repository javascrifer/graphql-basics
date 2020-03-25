import { v4 as uuid } from 'uuid';

import { Resolver } from '../../types/graphql/resolver';
import { Comment } from '../../types/models';

type Args = Omit<Comment, 'id'>;

type CreateCommentResolver = Resolver<unknown, Args, Comment>;

export const createComment: CreateCommentResolver = (
  _: unknown,
  args,
  { db: { comments, posts, users } },
) => {
  const authorExists = users.some(({ id }) => id === args.authorId);
  if (!authorExists) {
    throw new Error('author not found');
  }

  const postExists = posts.some(({ id }) => id === args.postId);
  if (!postExists) {
    throw new Error('post not found');
  }

  const comment = { ...args, id: uuid() };
  comments.push(comment);
  return comment;
};
