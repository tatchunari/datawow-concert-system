import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  // Enable CORS for all origins (you can restrict later)
  app.enableCors({
    origin: 'http://localhost:3000', // frontend origin
    credentials: true, // allow cookies if needed
  });

  await app.listen(3001);
}
bootstrap();
