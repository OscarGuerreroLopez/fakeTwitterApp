import * as winston from 'winston';
import 'winston-daily-rotate-file';

const transports = [
  new winston.transports.DailyRotateFile({
    filename: './logs/debug-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json(),
    ),
    level: 'debug',
  }),
  new winston.transports.DailyRotateFile({
    filename: './logs/info-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json(),
    ),
    level: 'info',
  }),
  new winston.transports.DailyRotateFile({
    filename: './logs/warn-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json(),
    ),
    level: 'warn',
  }),
  new winston.transports.DailyRotateFile({
    filename: './logs/error-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json(),
    ),
    level: 'error',
  }),
];

const { combine, timestamp, prettyPrint, json } = winston.format;

export const Logger = winston.createLogger({
  format: combine(timestamp(), prettyPrint(), json()),
  transports,
});
