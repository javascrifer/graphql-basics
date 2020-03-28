import { User } from '../../types/models';

export interface UserRepository {
  getUsers: () => Promise<User[]>;
  findUser: (userId: string) => Promise<User>;
  createUser: (user: Omit<User, 'id'>) => Promise<User>;
  deleteUser: (userId: string) => Promise<void>;
}
