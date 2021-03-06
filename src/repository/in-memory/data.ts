import { Comment, Post, User } from '../../types/models';

export const users: User[] = [
  {
    id: '1',
    name: 'My name 1',
    email: 'mycoolemail1@email.test',
    age: 24,
  },
  {
    id: '2',
    name: 'My name 2',
    email: 'mycoolemail2@email.test',
    age: null,
  },
  {
    id: '3',
    name: 'My name 3',
    email: 'mycoolemail3@email.test',
    age: null,
  },
];

export const posts: Post[] = [
  {
    id: '1',
    title: 'My post 1',
    body: 'This is my first post! Hello!',
    authorId: '2',
  },
  {
    id: '2',
    title: 'My post 2',
    body: 'This is my second post!',
    authorId: '3',
  },
  {
    id: '3',
    title: 'My post',
    body: 'This is my last post! Bye!',
    authorId: '1',
  },
];

export const comments: Comment[] = [
  {
    id: '1',
    text: 'Comment 1',
    postId: '2',
    authorId: '3',
  },
  {
    id: '2',
    text: 'Comment 2',
    postId: '1',
    authorId: '1',
  },
  {
    id: '3',
    text: 'Comment 3',
    postId: '2',
    authorId: '2',
  },
  {
    id: '4',
    text: 'Comment 4',
    postId: '3',
    authorId: '2',
  },
];
