import {
  CommentRepository,
  PostRepository,
  UserRepository,
} from '../../repository/definitions';

export interface Context {
  userRepository: UserRepository;
  postRepository: PostRepository;
  commentRepository: CommentRepository;
}
