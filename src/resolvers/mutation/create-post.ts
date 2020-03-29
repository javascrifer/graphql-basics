import { Resolver } from '../../types/graphql/resolver';
import { Post } from '../../types/models';

type CreatePostResolver = Resolver<unknown, Omit<Post, 'id'>, Post>;

export const createPost: CreatePostResolver = async (
  _,
  args,
  { postRepository, userRepository },
) => {
  const author = await userRepository.findUser(args.authorId);
  if (!author) {
    throw new Error('author not found');
  }

  return postRepository.createPost({ ...args });
};
