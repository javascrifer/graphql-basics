import { GraphQLServer, PubSub } from 'graphql-yoga';

import {
  commentRepository,
  newPostRepository,
  userRepository,
} from './repository/in-memory';
import { Comment } from './resolvers/comment';
import { Mutation } from './resolvers/mutation';
import { Post } from './resolvers/post';
import { Query } from './resolvers/query';
import { Subscription } from './resolvers/subscription';
import { User } from './resolvers/user';
import { Context } from './types/graphql/context';

const typeDefs = process.env.TYPE_DEFS || './src/schema.graphql';

const pubSub = new PubSub();

const postRepository = newPostRepository(pubSub);

const context: Context = {
  pubSub,
  userRepository,
  postRepository,
  commentRepository,
};

const resolvers = {
  Query,
  Mutation,
  Subscription,
  User,
  Post,
  Comment,
};

const server = new GraphQLServer({ typeDefs, resolvers, context });
const startOptions = { port: process.env.PORT || 4000 };

server.start(startOptions, () => {
  // tslint:disable-next-line: no-console
  console.log('Server is running on localhost:4000');
});
