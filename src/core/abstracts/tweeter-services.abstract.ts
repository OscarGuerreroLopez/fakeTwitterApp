import { EventHandler } from '../entities';

export abstract class TweeterServices {
  abstract eventHandler: EventHandler;
  abstract tweetHandler: (handler: EventHandler) => Promise<EventHandler>;
}
