import { Resolver } from '../../types/graphql/resolver';
import { ObjectWithKey } from '../../types/map';

type DeleteUserResolver = Resolver<
  unknown,
  ObjectWithKey<'userId'>,
  ObjectWithKey<'error'>
>;

export const deleteUser: DeleteUserResolver = async (
  _: unknown,
  { userId },
  { commentRepository, postRepository, userRepository },
) => {
  try {
    await userRepository.deleteUser(userId);
    const deletedPostIds = await postRepository.deleteAuthorPosts(userId);
    await commentRepository.deleteAuthorComments(userId);
    await commentRepository.deletePostsComments(deletedPostIds);

    return { error: null };
  } catch (error) {
    return { error: (error as Error).message };
  }
};
