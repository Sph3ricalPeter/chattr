import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaService } from './prisma.service';
import { MessageModule } from './messages/message.module';

@Module({
  imports: [AuthModule, UsersModule, MessageModule],
  controllers: [AppController],
  providers: [PrismaService],
})
export class AppModule { }
