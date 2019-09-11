function withArray(dates, callback) {
  if (Array.isArray(dates)) {
    return dates.some(callback);
  }

  return callback(dates);
}

export default withArray;
