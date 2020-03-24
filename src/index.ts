import { GraphQLServer } from 'graphql-yoga';
import { v4 as uuid } from 'uuid';

import { inMemoryDB } from './database';
import { Query } from './resolvers/query';
import { Context } from './types/graphql/context';
import { ObjectWithKey } from './types/map';
import { Post, User } from './types/models';

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
      args: Omit<Post, 'id'> & ObjectWithKey<'authorId'>,
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
  Post: {
    // To get author of the post you have to use relationship resolver.
    // Post will be sent as a parent and we will need to determine how
    // to receive author from it.
    author: (
      { authorId }: ObjectWithKey<'authorId'>,
      _: unknown,
      { db: { users } }: Context,
    ) => users.find(({ id }) => id === authorId),
  },
  Comment: {
    // After comment will be able to receive a post, post itself will be able
    // to receive author of the post by Post.author resolver.
    post: (
      { postId }: ObjectWithKey<'postId'>,
      _: unknown,
      { db: { posts } }: Context,
    ) => posts.find(({ id }) => id === postId),
    // Receiving author of the comment.
    author: (
      { authorId }: ObjectWithKey<'authorId'>,
      _: unknown,
      { db: { users } }: Context,
    ) => users.find(({ id }) => id === authorId),
  },
};

const server = new GraphQLServer({ typeDefs, resolvers, context });

// tslint:disable-next-line: no-console
server.start(() => console.log('Server is running on localhost:4000'));
