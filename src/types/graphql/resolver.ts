import { Context } from './context';

export type Resolver<P, A, R> = (
  parent: P,
  args: A,
  context: Context,
) => Promise<R> | R;

export type SubscriptionResolver<K extends string, P, A, R> = {
  [k in K]: { subscribe: Resolver<P, A, R> };
};
