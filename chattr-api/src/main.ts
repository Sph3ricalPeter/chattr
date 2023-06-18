import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './http-ex.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
  }))
  app.useGlobalFilters(new HttpExceptionFilter())

  await app.listen(process.env.PORT || 4000, process.env.HOSTNAME || "localhost");
}
bootstrap();
