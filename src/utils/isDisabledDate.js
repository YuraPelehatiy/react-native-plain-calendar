import dateFns from 'date-fns';

function isDisabledDate(day, monthStart, minDate, maxDate) {
  return (
    !dateFns.isSameMonth(day, monthStart) ||
    dateFns.isBefore(day, dateFns.subDays(minDate, 1)) ||
    dateFns.isAfter(day, maxDate)
  );
}

export default isDisabledDate;
