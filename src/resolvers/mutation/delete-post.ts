import { Resolver } from '../../types/graphql/resolver';
import { ObjectWithKey } from '../../types/map';

type DeletePostResolver = Resolver<
  unknown,
  ObjectWithKey<'postId'>,
  ObjectWithKey<'error'>
>;

export const deletePost: DeletePostResolver = async (
  _: unknown,
  { postId },
  { commentRepository, postRepository },
) => {
  try {
    await postRepository.deletePost(postId);
    await commentRepository.deletePostsComments([postId]);
    return { error: null };
  } catch (error) {
    return { error: (error as Error).message };
  }
};
