import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';

import { SimulatedStreamingService } from './tweeter.service';
import { TweeterListenerService } from './tweeter.listener';
import { TweeterServices } from '../../../core';

@Module({
  imports: [EventEmitterModule.forRoot()],
  providers: [
    SimulatedStreamingService,
    {
      provide: TweeterServices,
      useClass: TweeterListenerService,
    },
  ],
  exports: [SimulatedStreamingService, TweeterServices],
})
export class TweetServicesModule {}
