export abstract class LoggersService {
  abstract info: (message: string, context?: { [key: string]: any }) => void;
  abstract error: (
    message: string,
    trace: string,
    context?: { [key: string]: any },
  ) => void;
  abstract warn: (message: string, context?: { [key: string]: any }) => void;
  abstract debug: (message: string, context?: { [key: string]: any }) => void;
}
