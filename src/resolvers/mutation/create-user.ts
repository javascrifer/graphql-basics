import { v4 as uuid } from 'uuid';

import { Resolver } from '../../types/graphql/resolver';
import { User } from '../../types/models';

type CreateUserResolver = Resolver<unknown, Omit<User, 'id'>, User>;

export const createUser: CreateUserResolver = (
  _: unknown,
  args,
  { db: { users } },
) => {
  const user = { ...args, id: uuid() };
  users.push(user);
  return user;
};
