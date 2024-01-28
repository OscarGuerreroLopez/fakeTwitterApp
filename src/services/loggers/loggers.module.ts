import { Module } from '@nestjs/common';
import { LoggerModule } from '../../infra/logger/logger.module';

@Module({
  imports: [LoggerModule],
  exports: [LoggerModule],
})
export class LoggersModule {}
