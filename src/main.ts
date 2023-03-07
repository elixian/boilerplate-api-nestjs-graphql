
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const startServer = async () => {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT || 3001);
  console.log(`Server has started on the URL: http://localhost:${process.env.PORT || 3001}`);
};

startServer();
