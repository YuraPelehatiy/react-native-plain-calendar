import dateFns from 'date-fns';

function isBetween(start, end, current) {
  return (
    dateFns.isAfter(current, start) && dateFns.isBefore(current, end)
  );
}

export default isBetween;
