import { format, isValid, parse } from 'date-fns';

import { BaseFormatType } from 'types/BaseFormatType';
import { DB_DATE_FORMAT } from 'types/DateFormatType';

export const parseDate = (date: string, dateFormat: BaseFormatType = DB_DATE_FORMAT): Date => {
  return parse(date, dateFormat.format, dateNow());
};

export const formatDateToString = (date: Date | string, dateFormat: BaseFormatType = DB_DATE_FORMAT): string => {
  return typeof date === 'string' ? format(new Date(date), dateFormat.format) : format(date, dateFormat.format);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isValidDate = (date: any, dateFormat: string = DB_DATE_FORMAT.format): boolean => {
  if (typeof date === 'string') {
    const parsedDate = parse(date, dateFormat, new Date());

    return isValid(parsedDate);
  }
  if (date instanceof Date) {
    return isValid(date);
  }

  return false;
};

export const dateNowToString = (): string => format(new Date(), DB_DATE_FORMAT.format);

export const stringToDate = (date: string): Date => new Date(date);

export const dateNow = (): Date => new Date();

export const dayInterval = (date: Date): { start: Date; end: Date } => {
  const start = removeTime(date);
  const end = new Date(start);

  end.setHours(24);

  return { start, end };
};

export const removeTimeToString = (date: Date, dateFormat: BaseFormatType = DB_DATE_FORMAT): string =>
  format(removeTime(date), dateFormat.format);

export const removeTime = (date: Date): Date => {
  date = new Date(date);
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);

  return date;
};
