import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './config/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Setup Swagger for User and Admin APIs
  setupSwagger(app);
  
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
