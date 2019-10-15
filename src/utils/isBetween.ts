import * as dateFns from 'date-fns';
import { DateFns } from '../types';

export function isBetween(
  start: DateFns,
  end: DateFns,
  current: DateFns,
) {
  return (
    dateFns.isAfter(current, start) && dateFns.isBefore(current, end)
  );
}
