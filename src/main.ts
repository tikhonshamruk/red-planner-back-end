import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api')
  app.enableCors({
    origin: ['https://ankiweb.net'],
    credentials: true, 
    exposedHeaders: 'set-cookie'
  })

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
