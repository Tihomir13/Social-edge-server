import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { api } from './shared/constants/api';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: api,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(3000);
}
bootstrap();
