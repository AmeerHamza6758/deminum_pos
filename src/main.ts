import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './config/swagger.config';
import { ValidationPipe } from '@nestjs/common';
import { ValidationInterceptor } from './helpers/interceptors/validation-exception.interceptor';
import { ServerErrorInterceptor } from './helpers/interceptors/server-exception.interceptor';
import { UnauthorizedInterceptor } from './helpers/interceptors/unauthorized-exception.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new ValidationInterceptor());
  app.useGlobalInterceptors(new ServerErrorInterceptor());
  app.useGlobalInterceptors(new UnauthorizedInterceptor());
  // Setup Swagger for User and Admin APIs
  setupSwagger(app);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
