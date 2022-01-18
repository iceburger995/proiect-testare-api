import { HttpStatus } from '@nestjs/common';

import { ErrorCode } from '../types/ErrorCode';

export interface ResponseError {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  details?: any;
  message: string;
  code?: ErrorCode;
  context?: Record<string, string>;
  status: number;
  timestamp: string;
}

export interface HttpErrorObject {
  statusCode: HttpStatus;
  message: string;
  error: string;
}

export interface BaseDbError {
  code: number | string;
  message: string;
  stack: string;
  name: string;
}
