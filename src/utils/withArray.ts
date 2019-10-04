import { DateFns } from '../types';

type Dates = DateFns | DateFns[];
type Callback = (date: DateFns) => boolean;

export function withArray(dates: Dates, callback: Callback): boolean {
  if (Array.isArray(dates)) {
    return dates.some(callback);
  }

  return callback(dates);
}
