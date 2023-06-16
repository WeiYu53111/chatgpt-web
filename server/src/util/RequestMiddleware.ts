import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
@Injectable()
export class RequestMiddleware implements NestMiddleware {
  private readonly logger = new Logger(RequestMiddleware.name);
  use(req: Request, res: Response, next: () => void) {
    this.logger.log('Request path:', req.path);
    this.logger.log('Request URL:', req.originalUrl);
    this.logger.log('Request Method:', req.method);
    this.logger.log('Request Query Params:', req.query);
    this.logger.log('Request Body:', req.body);
    next();
  }
}
