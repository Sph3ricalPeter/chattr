import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageGateway } from './message.gateway';
import { MessageController } from './message.controller';
import { PrismaService } from 'src/prisma.service';
import { MessageFacade } from './message.facade';

@Module({
  controllers: [MessageController],
  providers: [MessageService, MessageFacade, MessageGateway, PrismaService],
})
export class MessageModule {}