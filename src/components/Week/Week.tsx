import * as dateFns from 'date-fns';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { StyleProp, Text, TextStyle, View, ViewStyle } from 'react-native';
import { dateFormats } from '../../constants';
import { WeekDayNumber } from '../../types';
import { s } from './styles';

export interface WeekProps {
  weekdayContainerStyle?: StyleProp<ViewStyle>
  weekdayStyle?: StyleProp<TextStyle>
  weekContainerStyle?: StyleProp<ViewStyle>
  weekdays: string[],
  weekStartsOn?: WeekDayNumber,
  WeekdaysComponent?: null,
}

interface WeekPrivateProps extends WeekProps {
  currentMonth: Date,
}

function Week({
  currentMonth,
  weekdayContainerStyle,
  weekdayStyle,
  weekContainerStyle,
  weekdays,
  weekStartsOn,
  WeekdaysComponent,
}: WeekPrivateProps) {
  if (WeekdaysComponent === null) {
    return null;
  }

  const [formatedWeekdays, setFormatedWeekdays] = useState<string []>([]);

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

  function getWeekDay(index: number) {
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

const WeekMemo = React.memo(Week);

export { WeekMemo as Week };
