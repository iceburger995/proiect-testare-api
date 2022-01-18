import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export const serverInfoLog = (configService: ConfigService): void => {
  console.log(configService.get('NODE_ENV'));
  if (configService.get('NODE_ENV') === 'development') {
    Logger.log('-----------------------------------------------------', 'Info');
    Logger.log(
      `${configService.get('APP_NAME')} started on: \x1b[37mhttp://${configService.get('APP_HOST')}:${configService.get(
        'APP_PORT'
      )}\x1b[0m`,
      `Info`
    );
    if (configService.get('SWAGGER_ENABLED') === 'true') {
      Logger.log(
        `swagger started on: \x1b[37mhttp://${configService.get('APP_HOST')}:${configService.get(
          'APP_PORT'
        )}/spec\x1b[0m`,
        `Info`
      );
    }
    Logger.log('-----------------------------------------------------', 'Info');
  }
};
