import { Resolver } from '../../types/graphql/resolver';
import { Comment } from '../../types/models';

type CommentsResolver = Resolver<unknown, unknown, Comment[]>;

export const comments: CommentsResolver = (
  _: unknown,
  __: unknown,
  { commentRepository },
) => commentRepository.getComments();
