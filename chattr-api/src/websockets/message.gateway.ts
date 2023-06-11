import { Logger } from '@nestjs/common';
import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets'
import { Server, Socket } from 'socket.io';
import { MessageService } from './message.service';
import { MessageFacade } from './message.facade';

@WebSocketGateway(80, { cors: true })
export class MessageGateway {
    constructor(
        private readonly messageFacade: MessageFacade,
        private readonly messageService: MessageService) { }

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
    async handleSendMessage(client: Socket, payload: { username: string, message: string}): Promise<void> {
        const newMessage = await this.messageFacade.createMessage(client.id, payload.username, payload.message);
        this.wss.emit('receiveMessage', newMessage);
        this.logger.log(`[${newMessage.createdAt}; ${newMessage.clientId}] ${newMessage.username}: ${newMessage.text}`);
    }

}