import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';

import { SimulatedStreamingService } from './facebook.service';

@Module({
  imports: [EventEmitterModule.forRoot()],
  providers: [SimulatedStreamingService],
})
export class FacebookServicesModule {}
