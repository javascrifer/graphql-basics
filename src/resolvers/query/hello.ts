import { Resolver } from '../../types/graphql/resolver';
import { ObjectWithKey } from '../../types/map';

type HelloResolver = Resolver<unknown, ObjectWithKey<'name'>, string>;

export const hello: HelloResolver = (_: unknown, { name }) => {
  return `Hello ${name || 'World'}`;
};
