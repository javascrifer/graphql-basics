import { Resolver } from '../../types/graphql/resolver';
import { Post, User } from '../../types/models';

type PostsResolver = Resolver<User, unknown, Post[]>;

export const posts: PostsResolver = ({ id }, _, { postRepository }) =>
  postRepository.getAuthorPosts(id);
