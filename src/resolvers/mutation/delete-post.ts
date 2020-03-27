import { Resolver } from '../../types/graphql/resolver';
import { ObjectWithKey } from '../../types/map';

type DeletePostResolver = Resolver<
  unknown,
  ObjectWithKey<'postId'>,
  ObjectWithKey<'error'>
>;

export const deletePost: DeletePostResolver = (
  _: unknown,
  { postId },
  { db: { comments, posts } },
) => {
  const hasPost = posts.some(({ id }) => id === postId);
  if (!hasPost) {
    return { error: 'post not found' };
  }

  posts = posts.filter(({ id }) => id !== postId);
  comments = comments.filter(comment => comment.postId !== postId);
  return { error: null };
};
