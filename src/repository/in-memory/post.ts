import { PubSub } from 'graphql-yoga';
import { v4 as uuid } from 'uuid';

import { subscriptionName } from '../../resolvers/subscription/post-count';
import { Post } from '../../types/models';
import { PostRepository } from '../definitions/post';
import { inMemoryDB, InMemoryDB } from './database';

type NewPostRepository = (pubSub: PubSub) => PostRepository;

const getPostsFn = (db: InMemoryDB) => {
  return async () => db.posts;
};

const getAuthorPostsFn = (db: InMemoryDB) => {
  return async (authorId: string) =>
    db.posts.filter(post => post.authorId === authorId);
};

const getFindPostFn = (db: InMemoryDB) => {
  return async (postId: string) => db.posts.find(({ id }) => id === postId);
};

const getCreatePostFn = (db: InMemoryDB) => {
  return async (args: Omit<Post, 'id'>) => {
    const post = { ...args, id: uuid() };
    db.posts.push(post);
    return post;
  };
};

const getDeletePostFn = (db: InMemoryDB) => {
  return async (postId: string) => {
    const hasPost = db.posts.some(({ id }) => id === postId);
    if (!hasPost) {
      throw new Error('post not found');
    }

    db.posts = db.posts.filter(({ id }) => id !== postId);
  };
};

const getDeleteAuthorPostsFn = (db: InMemoryDB) => {
  return async (authorId: string) => {
    const deletablePostIds = new Set<string>();

    db.posts = db.posts.filter(post => {
      const shouldDelete = post.authorId === authorId;
      if (shouldDelete) {
        deletablePostIds.add(post.id);
      }
      return !shouldDelete;
    });

    return Array.from(deletablePostIds);
  };
};

const publishPostCount = (db: InMemoryDB, pubSub: PubSub) => {
  const count = db.posts.length;
  pubSub.publish(subscriptionName, { [subscriptionName]: count });
};

const postCountPublisher = <T>(
  fn: (...args: any) => Promise<T>,
  db: InMemoryDB,
  pubSub: PubSub,
) => {
  return async (...args: any) => {
    const response = await fn(...args);
    publishPostCount(db, pubSub);
    return response;
  };
};

export const newPostRepository: NewPostRepository = (pubSub: PubSub) => {
  const db = inMemoryDB;

  return {
    getPosts: getPostsFn(db),
    getAuthorPosts: getAuthorPostsFn(db),
    findPost: getFindPostFn(db),
    createPost: postCountPublisher(getCreatePostFn(db), db, pubSub),
    deletePost: postCountPublisher(getDeletePostFn(db), db, pubSub),
    deleteAuthorPosts: postCountPublisher(
      getDeleteAuthorPostsFn(db),
      db,
      pubSub,
    ),
  };
};
