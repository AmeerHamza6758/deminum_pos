import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import { AppModule } from 'src/app.module';

export function setupSwagger(app: INestApplication): void {
  // Common Swagger Configuration for all APIs
  const commonConfig = new DocumentBuilder()
    .addBearerAuth()
    .setVersion('1.0')
    .setDescription('Deminum POS API Documentation')
    .build();

  // User API Swagger Configuration
  const userConfig = new DocumentBuilder()
    .setTitle('Deminum POS - User API')
    .addTag('User')
    .build();

  // Admin API Swagger Configuration
  const adminConfig = new DocumentBuilder()
    .setTitle('Deminum POS - Admin API')
    .addTag('Admin') 
    .build();

  // Generate User API Documentation
  const userDocument = SwaggerModule.createDocument(app, userConfig, {
    include: [AppModule],
  });

  // Generate Admin API Documentation
  const adminDocument = SwaggerModule.createDocument(app, adminConfig, {
    include: [AppModule],
  });

  // Set up Swagger UI routes
  SwaggerModule.setup('api/docs/user', app, userDocument); 
  SwaggerModule.setup('api/docs/admin', app, adminDocument);
}