import { Context } from './context';

export type Resolver<P, A, R> = (
  parent: P,
  args: A,
  context: Context,
) => Promise<R> | R;
