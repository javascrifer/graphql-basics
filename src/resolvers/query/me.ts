import { Resolver } from '../../types/graphql/resolver';
import { User } from '../../types/models';

type MeResolver = Resolver<unknown, unknown, User>;

export const me: MeResolver = async (_, __, { userRepository }) => {
  const [user] = await userRepository.getUsers();
  return user;
};
