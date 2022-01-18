import { BaseError } from 'errors/BaseError';
import { ResponseError } from 'errors/ResponseError';

export const baseErrorHandler = (responseError: ResponseError, exception: BaseError): void => {
  responseError.code = exception.code;
  responseError.context = exception.context;
  responseError.message = exception.message;
  responseError.details = exception.details;
};
