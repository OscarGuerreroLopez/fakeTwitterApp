import { TweetEventHandler } from '../entities';

export abstract class TweeterServices {
  abstract eventHandler: TweetEventHandler;
  abstract tweetHandler: (
    handler: TweetEventHandler,
  ) => Promise<TweetEventHandler>;
}
