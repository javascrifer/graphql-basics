import { v4 as uuid } from 'uuid';

import { User } from '../../types/models';
import { UserRepository } from '../definitions/user';
import { inMemoryDB, InMemoryDB } from './database';

type NewUserRepository = () => UserRepository;

const getUsersFn = ({ users }: InMemoryDB) => {
  return async () => users;
};

const getFindUserFn = ({ users }: InMemoryDB) => {
  return async (userId: string) => users.find(({ id }) => id === userId);
};

const getCreateUserFn = ({ users }: InMemoryDB) => {
  return async (args: Omit<User, 'id'>) => {
    const user = { ...args, id: uuid() };
    users.push(user);
    return user;
  };
};

const getDeleteUserFn = (db: InMemoryDB) => {
  return async (userId: string) => {
    const hasUser = db.users.some(({ id }) => id === userId);
    if (!hasUser) {
      throw new Error('user not found');
    }
    db.users = db.users.filter(({ id }) => id !== userId);
  };
};

const newUserRepository: NewUserRepository = () => {
  const db = inMemoryDB;

  return {
    getUsers: getUsersFn(db),
    findUser: getFindUserFn(db),
    createUser: getCreateUserFn(db),
    deleteUser: getDeleteUserFn(db),
  };
};

export const userRepository = newUserRepository();
