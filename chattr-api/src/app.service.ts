import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getAliveMessage(): string {
    return 'Hello World!';
  }
}
