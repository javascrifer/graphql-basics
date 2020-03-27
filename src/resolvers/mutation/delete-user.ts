import { Resolver } from '../../types/graphql/resolver';
import { ObjectWithKey } from '../../types/map';

type DeleteUserResolver = Resolver<
  unknown,
  ObjectWithKey<'userId'>,
  ObjectWithKey<'error'>
>;

export const deleteUser: DeleteUserResolver = (
  _: unknown,
  { userId },
  { db: { comments, posts, users } },
) => {
  const hasUser = users.some(({ id }) => id === userId);
  if (!hasUser) {
    return { error: 'user not found' };
  }
  users = users.filter(({ id }) => id !== userId);

  const deletablePostIds = new Set<string>();
  posts = posts.filter(({ id, authorId }) => {
    const shouldDelete = authorId === userId;
    if (shouldDelete) {
      deletablePostIds.add(id);
    }
    return !shouldDelete;
  });

  comments = comments.filter(
    ({ postId, authorId }) =>
      authorId !== userId && !deletablePostIds.has(postId),
  );

  return { error: null };
};
