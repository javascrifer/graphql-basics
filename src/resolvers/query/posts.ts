import { Resolver } from '../../types/graphql/resolver';
import { Post } from '../../types/models';

type PostsResolver = Resolver<unknown, unknown, Post[]>;

export const posts: PostsResolver = (_, __, { postRepository }) =>
  postRepository.getPosts();
