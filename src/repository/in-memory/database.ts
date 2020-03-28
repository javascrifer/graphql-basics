import { Comment, Post, User } from '../../types/models';
import { comments, posts, users } from './data';

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
