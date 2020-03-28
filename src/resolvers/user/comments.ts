import { Resolver } from '../../types/graphql/resolver';
import { Comment, User } from '../../types/models';

type CommentsResolver = Resolver<User, unknown, Comment[]>;

export const comments: CommentsResolver = (
  { id }: User,
  __: unknown,
  { commentRepository },
) => commentRepository.getUserComment(id);
