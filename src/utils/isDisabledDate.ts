import * as dateFns from 'date-fns';
import { DateFns } from '../types';

export function isDisabledDate(
  day: DateFns,
  monthStart: DateFns,
  minDate: DateFns,
  maxDate: DateFns,
): boolean {
  return (
    !dateFns.isSameMonth(day, monthStart) ||
    dateFns.isBefore(day, dateFns.subDays(minDate, 1)) ||
    dateFns.isAfter(day, maxDate)
  );
}
