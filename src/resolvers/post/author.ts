import { Resolver } from '../../types/graphql/resolver';
import { Post, User } from '../../types/models';

type AuthorResolver = Resolver<Post, unknown, User>;

export const author: AuthorResolver = (
  { authorId }: Post,
  __: unknown,
  { db: { users } },
) => users.find(({ id }) => id === authorId);
