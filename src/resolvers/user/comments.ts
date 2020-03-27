import { Resolver } from '../../types/graphql/resolver';
import { Comment, User } from '../../types/models';

type CommentsResolver = Resolver<User, unknown, Comment[]>;

export const comments: CommentsResolver = (
  { id }: User,
  __: unknown,
  { db: { comments: dbComments } },
) => dbComments.filter(({ authorId }) => authorId === id);
