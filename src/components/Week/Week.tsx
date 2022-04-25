import * as dateFns from 'date-fns';
import * as React from 'react';
import { useMemo } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { dateFormats } from '../../constants';
import { WeekDayNumber } from '../../types';
import { s } from './styles';
import { Weekday, WeekdayProps } from './Weekday';

export interface WeekProps extends WeekdayProps {
  weekContainerStyle?: StyleProp<ViewStyle>
  weekdays: string[],
  weekStartsOn?: WeekDayNumber,
  WeekdaysComponent?: React.FunctionComponent,
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
  if (WeekdaysComponent) {
    return <WeekdaysComponent />;
  }

  const formatedWeekdays = useMemo<string[]>(() => {
    const secondPart = weekdays.slice(0, weekStartsOn);
    const firstPart = weekdays.slice(weekStartsOn);

    const whole = firstPart.concat(secondPart);
    return whole;
  }, [weekdays, weekStartsOn])

  const dateFormat = dateFormats.daysFormat;

  const days = [];
  const startDate = useMemo<Date>(() => dateFns.startOfWeek(currentMonth, {
    weekStartsOn,
  }), [currentMonth, weekStartsOn])

  for (let i = 0; i < 7; i += 1) {
    days.push(
      <Weekday 
        key={i}
        index={i}
        dateFormat={dateFormat}
        formatedWeekdays={formatedWeekdays}
        startDate={startDate}
        currentMonth={currentMonth}
        weekdayContainerStyle={weekdayContainerStyle}
        weekdayStyle={weekdayStyle}
      />
    );
  }

  return (
    <View style={[s.weekContainer, weekContainerStyle]}>{days}</View>
  );
}

const WeekMemo = React.memo(Week);

export { WeekMemo as Week };
