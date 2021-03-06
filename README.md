# Course for GraphQL usage in NodeJS

## Motivation

Learn how GraphQL works behind the scenes, implement demo GraphQL API.

## About the project

This project is a part of
[course](https://www.udemy.com/course/graphql-bootcamp/). Project contains blog
service which exposes queries, mutations, subscriptions in order to deal with
users, posts and comments.

## Local development

- Boot NodeJS v13.12.0 using NVM.

```bash
  nvm use
```

- Install dependencies.

```bash
  npm ci
```

- Launch development server.

```bash
  npm run dev
```

- Open GraphQL Playground.

[Link to GraphQL Playground](http://localhost:4000/)

## Building

This project supports docker image building. To build an image from a project
source code simply run:

```bash
  npm run build:docker
```

Afterwards you can run GraphQL server using docker by running the following
command:

```bash
  npm run start:docker
```
