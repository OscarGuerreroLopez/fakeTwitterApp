import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { SimulatedStreamingService } from './facebook.service';
import { FacebookServices } from '../../../core';
import { FacebookListenerService } from './facebook.listener';
@Module({
  imports: [EventEmitterModule.forRoot()],
  providers: [
    SimulatedStreamingService,
    {
      provide: FacebookServices,
      useClass: FacebookListenerService,
    },
  ],
  exports: [SimulatedStreamingService, FacebookServices],
})
export class FacebookServicesModule {}
