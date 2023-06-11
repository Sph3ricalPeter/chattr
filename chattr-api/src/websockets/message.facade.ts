import { Injectable } from '@nestjs/common';
import { Message } from '@prisma/client';
import { MessageService } from './message.service';

@Injectable()
export class MessageFacade {
  constructor(private messageService: MessageService) {}

  async createMessage(clientId: string, username: string, text: string): Promise<Message> {
    return await this.messageService.createMessage({
        clientId: clientId,
        username: username,
        text: text,
        createdAt: new Date().toISOString(),
    });
  }

}
