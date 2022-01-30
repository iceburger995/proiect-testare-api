import { ValidationPipe, Logger, LogLevel } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder, SwaggerDocumentOptions } from '@nestjs/swagger';

import { AllExceptionsFilter } from 'errors/ExceptionsFilter';
import { serverInfoLog } from 'helpers/serverInfoLog';

import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],
  });

  console.log('here');
  const logger = app.get(Logger);

  const configService = app.get(ConfigService);

  app.setGlobalPrefix('api');

  Logger.overrideLogger(
    configService.get('LOGGER_DEBUG') === 'true' && (configService.get('LOGGER_LEVEL')?.split(',') as LogLevel[])
  );

  app.useGlobalFilters(new AllExceptionsFilter(logger));

  if (configService.get('SWAGGER_ENABLED') === 'true') {
    const config = new DocumentBuilder()
      .setTitle('API Documentation')
      .setDescription('API documentation for Admin Dashboard')
      .setVersion('0.1')
      .addBearerAuth()
      .build();

    const options: SwaggerDocumentOptions = {};

    const document = SwaggerModule.createDocument(app, config, options);

    SwaggerModule.setup('spec', app, document);
  }

  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      disableErrorMessages: false,
      dismissDefaultMessages: false,
      validationError: {
        target: false,
      },
    })
  );

  await app.listen(+configService.get('PORT') || '8083', () => serverInfoLog(configService));
}
bootstrap();
