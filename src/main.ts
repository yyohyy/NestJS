import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { TransformInterceptor } from './common/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor)
  const document = SwaggerModule.createDocument(app, new DocumentBuilder()
    .setTitle('Nest JS API')
    .setDescription('Backend for...')
    .setVersion('1.0')
    .addBearerAuth({
      type:'http',
      scheme: 'bearer',
      in: 'bearer'
    })
    .build());

  SwaggerModule.setup('', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
