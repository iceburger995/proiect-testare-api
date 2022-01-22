export enum ErrorCode {
  // COMMON
  NOT_FOUND = 100,
  DUPLICATE = 200,

  // Database
  UNCAUGHT_SQL_ERROR = 900,

  // User
  USER_DUPLICATE_EMAIL = 600,
}
