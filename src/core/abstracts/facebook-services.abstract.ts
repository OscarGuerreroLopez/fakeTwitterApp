import { FacebookEventHandler } from '../entities';

export abstract class FacebookServices {
  abstract eventHandler: FacebookEventHandler;
  abstract facebookHandler: (
    handler: FacebookEventHandler,
  ) => Promise<FacebookEventHandler>;
}
