import { BadRequestException } from '@nestjs/common';

import { formatString } from '../helpers/stringHelpers';
import { ErrorCode } from '../types/ErrorCode';

export const ErrorCodeMessages: Record<ErrorCode, string> = {
  [ErrorCode.NOT_FOUND]: 'Not found: {name}',
  [ErrorCode.DUPLICATE]: 'Duplicate: {name}',

  [ErrorCode.UNCAUGHT_SQL_ERROR]: 'Failed to execute. Please contact your administrator.',

  [ErrorCode.USER_DUPLICATE_EMAIL]: 'Duplicate User email: {email}.',
};

export class BaseError extends BadRequestException {
  /**
   * See error ErrorCode for codes
   */
  /**
   * @param code Error code
   * @param values Error summary/description
   * @param origin Origin error object
   */
  public code: ErrorCode;

  public context: Record<string, string>;

  public origin?: Error;

  public details?: string[];

  constructor(code: ErrorCode, values: Record<string, string> = {}, origin?: Error, details?: string[]) {
    const message: string = formatString(ErrorCodeMessages[code], values);

    super(message);
    this.code = code;
    this.origin = origin;
    this.context = values;
    this.details = details;
  }
}
