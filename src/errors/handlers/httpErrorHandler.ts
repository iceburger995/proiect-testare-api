import { HttpException } from '@nestjs/common';

import { HttpErrorObject, ResponseError } from 'errors/ResponseError';

const getErrorDetails = (message: string | HttpErrorObject): string | HttpErrorObject =>
  typeof message === 'string' ? message : (message as HttpErrorObject).message;

export const httpErrorHandler = (responseError: ResponseError, exception: HttpException): void => {
  responseError.details = getErrorDetails(exception.getResponse() as string | HttpErrorObject);
  responseError.status = exception.getStatus();
  responseError.message = exception.message;
};
