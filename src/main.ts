require('dotenv').config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.setGlobalPrefix('v1');

  const swaggerOptions = new DocumentBuilder();
  swaggerOptions.setTitle('Coffe in Cloud Service');
  swaggerOptions.setDescription('Coffe in Cloude Service');
  swaggerOptions.setVersion('v1');
  swaggerOptions.addBearerAuth();
  const documentSwagger = SwaggerModule.createDocument(
    app,
    swaggerOptions.build(),
  );

  SwaggerModule.setup('api', app, documentSwagger);

  await app.listen(3000);
}

bootstrap();
