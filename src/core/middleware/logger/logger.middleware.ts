import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { LoggerService } from 'src/core/logger/logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly loggerService: LoggerService) {}

  use(req: Request, res: Response, next: () => void) {
    res.on('finish', () => {
      const { url, method } = req;
      const logData = {
        url,
        method,
      };
      const { statusCode } = res;

      const logMessage = `${method} ${url}`;

      if (statusCode >= 500) {
        this.loggerService.error(logMessage, undefined, 'HTTP', logData);
      } else if (statusCode >= 400) {
        this.loggerService.warn(logMessage, 'HTTP', logData);
      } else {
        this.loggerService.log(logMessage, 'HTTP', logData);
      }
    });
    next();
  }
}
