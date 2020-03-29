import { Resolver } from '../../types/graphql/resolver';
import { Comment, User } from '../../types/models';

type CommentsResolver = Resolver<User, unknown, Comment[]>;

export const comments: CommentsResolver = ({ id }, _, { commentRepository }) =>
  commentRepository.getUserComment(id);
