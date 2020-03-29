import { Resolver } from '../../types/graphql/resolver';
import { ObjectWithKey } from '../../types/map';

type DeleteCommentResolver = Resolver<
  unknown,
  ObjectWithKey<'commentId'>,
  ObjectWithKey<'error'>
>;

export const deleteComment: DeleteCommentResolver = async (
  _,
  { commentId },
  { commentRepository },
) => {
  try {
    await commentRepository.deleteComment(commentId);
    return { error: null };
  } catch (error) {
    return { error: (error as Error).message };
  }
};
