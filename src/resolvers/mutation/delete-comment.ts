import { Resolver } from '../../types/graphql/resolver';
import { ObjectWithKey } from '../../types/map';

type DeleteCommentResolver = Resolver<
  unknown,
  ObjectWithKey<'commentId'>,
  ObjectWithKey<'error'>
>;

export const deleteComment: DeleteCommentResolver = (
  _: unknown,
  { commentId },
  { db: { comments } },
) => {
  const hasComment = comments.some(({ id }) => id === commentId);
  if (!hasComment) {
    return { error: 'comment not found' };
  }

  comments = comments.filter(({ id }) => id !== commentId);
  return { error: null };
};
