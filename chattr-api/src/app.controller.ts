import { Controller, Get } from '@nestjs/common';

@Controller("/")
export class AppController {
  constructor() { }

  @Get("alive")
  getAlive(): string {
    return 'OK';
  }

}
