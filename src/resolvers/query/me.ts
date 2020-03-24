import { Resolver } from '../../types/graphql/resolver';
import { User } from '../../types/models';

type MeResolver = Resolver<unknown, unknown, User>;

export const me: MeResolver = (_: unknown, __: unknown, { db: { users } }) => {
  const [user] = users;
  return user;
};
