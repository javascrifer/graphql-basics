import { v4 as uuid } from 'uuid';

import { Resolver } from '../../types/graphql/resolver';
import { Post } from '../../types/models';

type CreatePostResolver = Resolver<unknown, Omit<Post, 'id'>, Post>;

export const createPost: CreatePostResolver = (
  _: unknown,
  args,
  { db: { posts, users } },
) => {
  const authorExists = users.some(({ id }) => id === args.authorId);
  if (!authorExists) {
    throw new Error('author not found');
  }

  const post = { ...args, id: uuid() };
  posts.push(post);
  return post;
};
