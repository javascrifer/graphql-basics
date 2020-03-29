import { Resolver } from '../../types/graphql/resolver';
import { Comment } from '../../types/models';

type CommentsResolver = Resolver<unknown, unknown, Comment[]>;

export const comments: CommentsResolver = (_, __, { commentRepository }) =>
  commentRepository.getComments();
