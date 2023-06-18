import { Controller, Get } from '@nestjs/common';
import { MessageDto } from './message.dto';
import { MessageFacade } from './message.facade';

@Controller("/")
export class MessageController {
  constructor(private readonly messageFacade: MessageFacade) {}

  @Get("messages")
  getMessages(): Promise<MessageDto[]> {
    return this.messageFacade.getMessages();
  }

}