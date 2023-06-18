import { Injectable } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageDto } from './message.dto';

@Injectable()
export class MessageFacade {
  constructor(private messageService: MessageService) { }

  async createMessage(clientId: string, message: MessageDto): Promise<MessageDto> {
    const newMessage = await this.messageService.createMessage({
      clientId: clientId,
      username: message.username,
      text: message.text,
      createdAt: new Date().toISOString(),
    });
    return { ...newMessage } as MessageDto;
  }

  async getMessages(): Promise<MessageDto[]> {
    const messages = await this.messageService.getMessages({});
    return messages.map((message) => {
      return { ...message } as MessageDto;
    });
  }

}
