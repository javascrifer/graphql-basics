import { Post } from '../../types/models';

export interface PostRepository {
  getPosts: () => Promise<Post[]>;
  getAuthorPosts: (authorId: string) => Promise<Post[]>;
  findPost: (postId: string) => Promise<Post>;
  createPost: (post: Omit<Post, 'id'>) => Promise<Post>;
  deletePost: (postId: string) => Promise<void>;
  deleteAuthorPosts: (authorId: string) => Promise<string[]>;
}
