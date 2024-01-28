import { Module } from '@nestjs/common';
import { LoggersService as LoggerServiceImpl } from '../../core';
import { LoggerService } from './logger.service';

@Module({
  providers: [
    {
      provide: LoggerServiceImpl,
      useClass: LoggerService,
    },
  ],
  exports: [LoggerServiceImpl],
})
export class LoggerModule {}
