import { HttpStatus } from '@nestjs/common';

import { ErrorCodeMessages } from 'errors/BaseError';
import { BaseDbError, ResponseError } from 'errors/ResponseError';
import { formatString } from 'helpers/stringHelpers';
import { ErrorCode } from 'types/ErrorCode';

export interface MySqlError extends BaseDbError {
  code: string;
  errno: number;
  parameters: Array<string | number | Date | null | boolean>;
  query: string;
  sqlMessage: string;
  sqlState: string;
}

// SQL Error codes: https://dev.mysql.com/doc/mysql-errors/8.0/en/server-error-reference.html
export const mySqlErrorHandler = (responseError: ResponseError, sqlError: MySqlError): void => {
  switch (sqlError.errno) {
    case 1062: {
      const [, name] = sqlError.message.split(`'`);

      responseError.code = ErrorCode.DUPLICATE;
      responseError.message = formatString(ErrorCodeMessages[ErrorCode.DUPLICATE], { name } || {});
      responseError.context = { name };
      responseError.status = HttpStatus.CONFLICT;
      break;
    }
    default: {
      responseError.code = ErrorCode.UNCAUGHT_SQL_ERROR;
      responseError.message = ErrorCodeMessages[ErrorCode.UNCAUGHT_SQL_ERROR];
    }
  }
};
