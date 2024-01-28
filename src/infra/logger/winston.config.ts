import * as winston from 'winston';
import 'winston-daily-rotate-file';

const createTransport = (level: string): winston.transport => {
  return new winston.transports.DailyRotateFile({
    filename: `./logs/${level}-%DATE%.log`,
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json(),
    ),
    level,
  });
};

const levels = ['debug', 'info', 'warn', 'error'];

const transports = levels.map(createTransport);

const { combine, timestamp, prettyPrint, json } = winston.format;

export const Logger = winston.createLogger({
  format: combine(timestamp(), prettyPrint(), json()),
  transports,
});
