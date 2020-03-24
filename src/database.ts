import { comments, posts, users } from './fixtures/data.json';
import { Comment, Post, User } from './types/models';

export interface InMemoryDB {
  users: User[];
  posts: Post[];
  comments: Comment[];
}

export const inMemoryDB: InMemoryDB = {
  users,
  posts,
  comments,
};
