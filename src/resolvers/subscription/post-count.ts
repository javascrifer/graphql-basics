import { SubscriptionResolver } from '../../types/graphql/resolver';

export const subscriptionName = 'postCount';

type PostCountResolver = SubscriptionResolver<
  'postCount',
  unknown,
  unknown,
  AsyncIterator<number>
>;

const resolver: PostCountResolver = {
  postCount: {
    subscribe: (_, __, { pubSub }) => {
      return pubSub.asyncIterator<number>(subscriptionName);
    },
  },
};

export const { postCount } = resolver;
