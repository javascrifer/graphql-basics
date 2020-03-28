import { GraphQLServer } from 'graphql-yoga';

import * as repositories from './repository/in-memory';
import { Comment } from './resolvers/comment';
import { Mutation } from './resolvers/mutation';
import { Post } from './resolvers/post';
import { Query } from './resolvers/query';
import { User } from './resolvers/user';
import { Context } from './types/graphql/context';

const typeDefs = './src/schema.graphql';

const context: Context = { ...repositories };

const resolvers = {
  Query,
  Mutation,
  User,
  Post,
  Comment,
};

const server = new GraphQLServer({ typeDefs, resolvers, context });

// tslint:disable-next-line: no-console
server.start(() => console.log('Server is running on localhost:4000'));
