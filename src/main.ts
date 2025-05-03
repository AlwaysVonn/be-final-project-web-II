import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import * as cors from 'cors';

async function bootstrap() {
  const server = express();

  server.use(
    cors({
      origin: [
        'http://localhost:3000',
        'https://self-management-xi.vercel.app',
      ],
      credentials: true,
    }),
  );

  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

  await app.init();

  server.listen(3000, () => console.log('Server running...'));
}
bootstrap();
