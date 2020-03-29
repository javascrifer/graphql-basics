import { PubSub } from 'graphql-yoga';

import {
  CommentRepository,
  PostRepository,
  UserRepository,
} from '../../repository/definitions';

export interface Context {
  pubSub: PubSub;
  userRepository: UserRepository;
  postRepository: PostRepository;
  commentRepository: CommentRepository;
}
