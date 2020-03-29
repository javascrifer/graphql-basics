import { Resolver } from '../../types/graphql/resolver';
import { User } from '../../types/models';

type CreateUserResolver = Resolver<unknown, Omit<User, 'id'>, User>;

export const createUser: CreateUserResolver = (_, args, { userRepository }) =>
  userRepository.createUser(args);
