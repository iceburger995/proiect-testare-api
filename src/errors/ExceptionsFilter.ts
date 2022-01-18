import { ExceptionFilter, Catch, ArgumentsHost, HttpException, Logger, HttpStatus } from '@nestjs/common';
import { Response, Request } from 'express';
import { QueryFailedError } from 'typeorm';

import { dateNowToString } from '../helpers/dateHelpers';
import { BaseError } from './BaseError';
import { baseErrorHandler } from './handlers/baseErrorHandler';
import { httpErrorHandler } from './handlers/httpErrorHandler';
import { MySqlError, mySqlErrorHandler } from './handlers/mySqlErrorHandler';
import { ResponseError } from './ResponseError';

const handleError = (responseError: ResponseError, exception: Error): void => {
  switch (true) {
    case exception instanceof BaseError:
      baseErrorHandler(responseError, exception as BaseError);
      break;
    case exception instanceof HttpException:
      httpErrorHandler(responseError, exception as HttpException);
      break;
    case exception instanceof QueryFailedError:
      mySqlErrorHandler(responseError, exception as MySqlError);
      break;
  }
};

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly logger: Logger) {}

  catch(exception: Error, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const responseError: ResponseError = {
      timestamp: dateNowToString(),
      message: 'Internal Server Error',
      status: HttpStatus.INTERNAL_SERVER_ERROR,
    };

    const stack = exception.stack;

    handleError(responseError, exception);

    this.logger.error([responseError.details, request.url], stack, 'AllExceptionsFilter');
    response.status(responseError.status).json(responseError);
  }
}
