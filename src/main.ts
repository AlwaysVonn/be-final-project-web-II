import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';

async function bootstrap() {
  const server = express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  await app.init();
  app.enableCors({
    origin: 'https://be-self-management-git-main-roldleos-projects.vercel.app', // URL aplikasi Vercel kamu
  });
  server.listen(3000, () => console.log('Server running...'));
}
bootstrap();
