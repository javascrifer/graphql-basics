import { Resolver } from '../../types/graphql/resolver';
import { Comment, Post } from '../../types/models';

type CommentsResolver = Resolver<Post, unknown, Comment[]>;

export const comments: CommentsResolver = ({ id }, _, { commentRepository }) =>
  commentRepository.getPostComments(id);
