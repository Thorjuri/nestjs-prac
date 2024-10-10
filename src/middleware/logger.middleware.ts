// ./middleware/logger.middleware.ts

import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(`Request... Method: ${req.method}, Path: ${req.path}`);
    next();
  }
}

// 함수형 미들웨어 추가
export function logger(req: Request, res: Response, next: NextFunction) {
  console.log(`Request... Method: ${req.method}, Path: ${req.path}`);
  next();
}
