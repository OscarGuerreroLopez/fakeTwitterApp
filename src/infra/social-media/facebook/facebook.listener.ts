import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import {
  Facebook,
  FacebookEventHandler,
  FacebookServices,
} from '../../../core';

@Injectable()
export class FacebookListenerService implements FacebookServices {
  eventHandler: FacebookEventHandler;

  @OnEvent('facebook')
  private async handleFaceBookCreatedEvent(payload: Facebook) {
    if (this.eventHandler) {
      this.eventHandler(payload);
    }
  }

  async facebookHandler(handler: FacebookEventHandler) {
    if (!this.eventHandler) {
      this.eventHandler = handler;
    }
    return this.eventHandler;
  }
}
