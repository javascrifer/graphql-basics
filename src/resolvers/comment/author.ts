import { Resolver } from '../../types/graphql/resolver';
import { Comment, User } from '../../types/models';

type AuthorResolver = Resolver<Comment, unknown, User>;

export const author: AuthorResolver = ({ authorId }, _, { userRepository }) =>
  userRepository.findUser(authorId);
