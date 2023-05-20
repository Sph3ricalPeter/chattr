import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller("/")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("alive")
  getAlive(): string {
    return this.appService.getAliveMessage();
  }

  @Get("/user")
  getUser(): string {
    return "Bob";
  }
  
}
