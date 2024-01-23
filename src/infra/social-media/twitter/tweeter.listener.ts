import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Tweet, EventHandler, TweeterServices } from '../../../core';

@Injectable()
export class TweeterListenerService implements TweeterServices {
  eventHandler: EventHandler;

  @OnEvent('tweet')
  private async handleTweetCreatedEvent(payload: Tweet) {
    if (this.eventHandler) {
      this.eventHandler(payload);
    }
  }

  async tweetHandler(handler: EventHandler) {
    if (!this.eventHandler) {
      this.eventHandler = handler;
    }
    return this.eventHandler;
  }
}
