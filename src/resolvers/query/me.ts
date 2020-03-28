import { Resolver } from '../../types/graphql/resolver';
import { User } from '../../types/models';

type MeResolver = Resolver<unknown, unknown, User>;

export const me: MeResolver = async (
  _: unknown,
  __: unknown,
  { userRepository },
) => {
  const [user] = await userRepository.getUsers();
  return user;
};
