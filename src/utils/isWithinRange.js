import dateFns from 'date-fns';
import withArray from './withArray';

function isWithinRange(date, startDate, endDate) {
  let start = startDate;
  let end = endDate;

  if (dateFns.isAfter(start, end)) {
    const _start = start;
    start = end;
    end = _start;
  }

  return dateFns.isWithinRange(date, start, end);
}

function isWithinRangeWithArray(dates, startDate, endDate) {
  return withArray(dates, (date) =>
    isWithinRange(date, startDate, endDate),
  );
}

export { isWithinRange, isWithinRangeWithArray };
