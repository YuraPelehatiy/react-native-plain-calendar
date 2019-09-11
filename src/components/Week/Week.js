import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import dateFns from 'date-fns';
import T from 'prop-types';
import { dateFormats } from '../../constants';
import s from './styles';

function Week({
  currentMonth,
  weekdayContainerStyle,
  weekdayStyle,
  weekContainerStyle,
  weekdays,
  weekStartsOn,
  WeekdaysComponent,
}) {
  if (WeekdaysComponent === null) {
    return null;
  }

  const [formatedWeekdays, setFormatedWeekdays] = useState([]);

  useEffect(() => {
    const secondPart = weekdays.slice(0, weekStartsOn);
    const firstPart = weekdays.slice(weekStartsOn);

    const whole = firstPart.concat(secondPart);
    setFormatedWeekdays(whole);
  }, [weekdays, weekStartsOn]);

  const dateFormat = dateFormats.daysFormat;

  const days = [];
  const startDate = dateFns.startOfWeek(currentMonth, {
    weekStartsOn,
  });

  function getWeekDay(index) {
    if (formatedWeekdays && formatedWeekdays.length === 7) {
      return formatedWeekdays[index];
    }

    return dateFns.format(
      dateFns.addDays(startDate, index),
      dateFormat,
    );
  }

  for (let i = 0; i < 7; i += 1) {
    days.push(
      <View style={[s.dayContainer, weekdayContainerStyle]} key={i}>
        <Text style={weekdayStyle}>{getWeekDay(i)}</Text>
      </View>,
    );
  }

  return (
    <View style={[s.weekContainer, weekContainerStyle]}>{days}</View>
  );
}

Week.propTypes = {
  currentMonth: T.instanceOf(Date).isRequired,
  weekdays: T.array,
  weekStartsOn: T.number,
  weekContainerStyle: T.any,
  weekdayContainerStyle: T.any,
  weekdayStyle: T.any,
  WeekdaysComponent: T.oneOf([null]),
};

export default React.memo(Week);
