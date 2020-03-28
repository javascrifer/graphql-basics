import { Resolver } from '../../types/graphql/resolver';
import { Comment } from '../../types/models';

type Args = Omit<Comment, 'id'>;

type CreateCommentResolver = Resolver<unknown, Args, Comment>;

export const createComment: CreateCommentResolver = (
  _: unknown,
  args,
  { commentRepository, postRepository, userRepository },
) => {
  const author = userRepository.findUser(args.authorId);
  if (!author) {
    throw new Error('author not found');
  }

  const post = postRepository.findPost(args.postId);
  if (!post) {
    throw new Error('post not found');
  }

  return commentRepository.createComment(args);
};
