import { Injectable } from '@nestjs/common';
import { LoggersService as LoggerServiceImpl } from '../../core';
import { Logger } from './winston.config';

@Injectable()
export class LoggerService implements LoggerServiceImpl {
  info(message: string, context?: { [key: string]: any }): void {
    Logger.info(message, { context });
  }
  error(
    message: string,
    trace?: string,
    context?: { [key: string]: any },
  ): void {
    Logger.error(message, trace, { context });
  }
  warn(message: string, context?: { [key: string]: any }): void {
    Logger.warn(message, { context });
  }
  debug(message: string, context?: { [key: string]: any }): void {
    Logger.debug(message, { context });
  }
}
