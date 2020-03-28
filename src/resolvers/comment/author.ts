import { Resolver } from '../../types/graphql/resolver';
import { Comment, User } from '../../types/models';

type AuthorResolver = Resolver<Comment, unknown, User>;

export const author: AuthorResolver = (
  { authorId }: Comment,
  __: unknown,
  { userRepository },
) => userRepository.findUser(authorId);
