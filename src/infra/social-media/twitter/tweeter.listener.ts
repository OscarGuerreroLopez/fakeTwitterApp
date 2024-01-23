import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Tweet, TweetEventHandler, TweeterServices } from '../../../core';

@Injectable()
export class TweeterListenerService implements TweeterServices {
  eventHandler: TweetEventHandler;

  @OnEvent('tweet')
  private async handleTweetCreatedEvent(payload: Tweet) {
    if (this.eventHandler) {
      this.eventHandler(payload);
    }
  }

  async tweetHandler(handler: TweetEventHandler) {
    if (!this.eventHandler) {
      this.eventHandler = handler;
    }
    return this.eventHandler;
  }
}
