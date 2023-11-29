import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './transform.interceptor';
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalInterceptors(new  TransformInterceptor())

  const config = new DocumentBuilder()
        .setTitle("Budget APP API")
        .setDescription("APIs of Budget App")
        .setVersion("1.0")
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(`api`, app, document);

  await app.listen(3100);
}
bootstrap();
