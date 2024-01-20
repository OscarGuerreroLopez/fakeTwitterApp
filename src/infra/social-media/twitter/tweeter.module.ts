import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';

import { SimulatedStreamingService } from './tweeter.service';

@Module({
  imports: [EventEmitterModule.forRoot()],
  providers: [SimulatedStreamingService],
})
export class TweetServicesModule {}
