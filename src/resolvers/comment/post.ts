import { Resolver } from '../../types/graphql/resolver';
import { Comment, Post } from '../../types/models';

type PostResolver = Resolver<Comment, unknown, Post>;

export const post: PostResolver = (
  { postId }: Comment,
  __: unknown,
  { db: { posts } },
) => posts.find(({ id }) => id === postId);
