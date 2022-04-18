import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as compression from 'compression';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { AppConfig, appConfig } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get<AppConfig>(appConfig.KEY);

  app.enableCors();
  app.enableShutdownHooks();

  app.use(helmet());
  app.use(compression());

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      disableErrorMessages:
        process.env.NODE_ENV === 'development' ? false : true,
    }),
  );

  const swaggerDocOptions = new DocumentBuilder()
    .setTitle('Post API')
    .setDescription('API documentation for Post')
    .setVersion('0.0.1')
    .addServer(`${config.domain}`, 'Development API')
    .addBearerAuth()
    .build();
  const swaggerDoc = SwaggerModule.createDocument(app, swaggerDocOptions);
  SwaggerModule.setup(`${globalPrefix}/docs`, app, swaggerDoc, {
    swaggerOptions: {
      docExpansion: 'none',
      filter: true,
      showRequestDuration: true,
    },
  });

  await app.listen(config.port, () => {
    Logger.log(
      `Listening at ${config.domain}/${globalPrefix}`,
      'NestApplication',
    );
    Logger.log(
      `Swagger Docs enabled: ${config.domain}/${globalPrefix}/docs`,
      'NestApplication',
    );
  });
}
bootstrap();
