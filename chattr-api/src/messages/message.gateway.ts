import { Logger } from '@nestjs/common';
import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets'
import { Server, Socket } from 'socket.io';
import { MessageFacade } from './message.facade';
import { MessageDto } from './message.dto';

@WebSocketGateway({ cors: true })
export class MessageGateway {
  constructor(
    private readonly messageFacade: MessageFacade) { }

  private logger: Logger = new Logger('MessageGateway');

  @WebSocketServer() wss: Server;

  afterInit(server: Server) {
    this.logger.log('Initialized');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client Disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client Connected: ${client.id}`);
  }

  @SubscribeMessage('sendMessage')
  async handleSendMessage(client: Socket, message: MessageDto): Promise<void> {
    const newMessage = await this.messageFacade.createMessage(client.id, message);
    this.logger.log(`Client ${client.id} (${newMessage.username}) sent a message at ${newMessage.createdAt}: ${newMessage.text}`);
    this.wss.emit('receiveMessage', newMessage);
  }

}