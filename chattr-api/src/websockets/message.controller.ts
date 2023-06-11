import { Controller, Get } from '@nestjs/common';
import { MessageService } from './message.service';
import { Message } from '@prisma/client';

@Controller("/")
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get("messages")
  getMessages(): Promise<Message[]> {
    return this.messageService.getMessages({});
  }

}