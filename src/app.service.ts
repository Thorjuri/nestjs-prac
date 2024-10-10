import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  PostHello(): string {
    return 'Post Hello World!';
  }
}
