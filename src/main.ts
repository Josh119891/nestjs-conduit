import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { INestApplication, Logger } from '@nestjs/common';
import { port,prefix, swaggerUrl } from "./settings"

export function setSwagger(app:INestApplication){
  const options = new DocumentBuilder().setTitle('conduit backend').setVersion('1.0').addBearerAuth().build();
  const document = SwaggerModule.createDocument(app, options);  
  SwaggerModule.setup(swaggerUrl, app, document);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // App Setting
  setSwagger(app);
  app.setGlobalPrefix(prefix);
  

  await app.listen(port);
  Logger.log(`Running on ${await app.getUrl()}/${swaggerUrl}`,"Swagger");
}
bootstrap();
