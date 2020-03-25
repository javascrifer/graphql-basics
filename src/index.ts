import { GraphQLServer } from 'graphql-yoga';
import { v4 as uuid } from 'uuid';

import { inMemoryDB } from './database';
import { Comment } from './resolvers/comment';
import { Post } from './resolvers/post';
import { Query } from './resolvers/query';
import { Context } from './types/graphql/context';
import { ObjectWithKey } from './types/map';
import { Post as PostModel, User } from './types/models';

const typeDefs = './src/schema.graphql';

const context: Context = {
  db: inMemoryDB,
};

const resolvers = {
  Query,
  Mutation: {
    createUser: (
      _: unknown,
      args: Omit<User, 'id'>,
      { db: { users } }: Context,
    ) => {
      const user = { ...args, id: uuid() };
      users.push(user);
      return user;
    },
    createPost: (
      _: unknown,
      args: Omit<PostModel, 'id'> & ObjectWithKey<'authorId'>,
      { db: { posts, users } }: Context,
    ) => {
      const authorExists = users.some(({ id }) => id === args.authorId);
      if (!authorExists) {
        throw new Error('author not found');
      }

      const post = { ...args, id: uuid() };
      posts.push(post);
      return post;
    },
  },
  Post,
  Comment,
};

const server = new GraphQLServer({ typeDefs, resolvers, context });

// tslint:disable-next-line: no-console
server.start(() => console.log('Server is running on localhost:4000'));
