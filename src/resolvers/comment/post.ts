import { Resolver } from '../../types/graphql/resolver';
import { Comment, Post } from '../../types/models';

type PostResolver = Resolver<Comment, unknown, Post>;

export const post: PostResolver = ({ postId }, _, { postRepository }) =>
  postRepository.findPost(postId);
