import { Comment } from '../../types/models';

export interface CommentRepository {
  getComments: () => Promise<Comment[]>;
  getUserComment: (userId: string) => Promise<Comment[]>;
  getPostComments: (postId: string) => Promise<Comment[]>;
  findComment: (id: string) => Promise<Comment>;
  createComment: (comment: Omit<Comment, 'id'>) => Promise<Comment>;
  deleteComment: (id: string) => Promise<void>;
  deleteAuthorComments: (authorId: string) => Promise<void>;
  deletePostsComments: (postIds: string[]) => Promise<void>;
}
