import { Resolver } from '../../types/graphql/resolver';
import { User } from '../../types/models';

type UsersResolver = Resolver<unknown, unknown, User[]>;

export const users: UsersResolver = (
  _: unknown,
  __: unknown,
  { db: { users: dbUsers } },
) => dbUsers;
