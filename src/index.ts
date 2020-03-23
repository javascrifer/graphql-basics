import { GraphQLServer } from 'graphql-yoga';
import { v4 as uuid } from 'uuid';

import { comments, posts, users } from './fixtures/data.json';
import { ObjectWithKey } from './types/map';
import { Post } from './types/post';
import { User } from './types/user';

const typeDefs = `
  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    author: User!
  }

  type Comment {
    id: ID!
    text: String!
    post: Post!
    author: User!
  }

  type Query {
    hello(name: String): String!
    me: User!
    users: [User!]!
    posts: [Post!]!
    comments: [Comment!]!
  }

  type Mutation {
    createUser(name: String!, email: String!, age: Int): User!
    createPost(title: String!, body: String!, authorId: ID!): Post!
  }
`;

const resolvers = {
  Post: {
    // To get author of the post you have to use relationship resolver.
    // Post will be sent as a parent and we will need to determine how
    // to receive author from it.
    author: ({ authorId }: ObjectWithKey<'authorId'>) =>
      users.find(({ id }) => id === authorId),
  },
  Comment: {
    // After comment will be able to receive a post, post itself will be able
    // to receive author of the post by Post.author resolver.
    post: ({ postId }: ObjectWithKey<'postId'>) =>
      posts.find(({ id }) => id === postId),
    // Receiving author of the comment.
    author: ({ authorId }: ObjectWithKey<'authorId'>) =>
      users.find(({ id }) => id === authorId),
  },
  Query: {
    // Same as in type specific resolvers you will get a parent object as a
    // first parameter and arguments as a second. Arguments are map of
    // properties which you need return as a response. If you have non scalar
    // type it will call a resolver for an argument for a given type.
    // Example => Posts.author
    hello: (_: unknown, { name }: ObjectWithKey<'name'>) =>
      `Hello ${name || 'World'}`,
    me: () => users[0],
    users: () => users,
    posts: () => posts,
    comments: () => comments,
  },
  Mutation: {
    createUser: (_: unknown, args: Omit<User, 'id'>) => {
      const user = { ...args, id: uuid() };
      users.push(user);
      return user;
    },
    createPost: (
      _: unknown,
      args: Omit<Post, 'id'> & ObjectWithKey<'authorId'>,
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
};

const server = new GraphQLServer({ typeDefs, resolvers });

// tslint:disable-next-line: no-console
server.start(() => console.log('Server is running on localhost:4000'));
