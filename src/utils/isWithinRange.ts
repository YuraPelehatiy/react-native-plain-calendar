import * as dateFns from 'date-fns';
import { DateFns } from '../types';
import { isBetween } from './isBetween';
import { withArray } from './withArray';

export function isWithinRange(
  date: DateFns,
  startDate: DateFns,
  endDate: DateFns,
): boolean {
  let start = startDate;
  let end = endDate;

  if (dateFns.isAfter(start, end)) {
    [start, end] = [end, start];
  }

  return isBetween(start, end, date);
}

export function isWithinRangeWithArray(
  dates: DateFns | DateFns[],
  startDate: DateFns,
  endDate: DateFns,
): boolean {
  return withArray(dates, (date) =>
    isWithinRange(date, startDate, endDate),
  );
}
