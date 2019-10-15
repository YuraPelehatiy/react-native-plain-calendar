import * as dateFns from 'date-fns';
import * as React from 'react';
import { useMemo } from 'react';
import { StyleProp, Text, TextStyle, View, ViewStyle } from 'react-native';
import { s } from './styles';

export interface WeekdayProps {
  weekdayStyle?: StyleProp<TextStyle>
  weekdayContainerStyle?: StyleProp<ViewStyle>
}

interface WeekdayPrivateProps extends WeekdayProps {
  currentMonth: Date,
  formatedWeekdays: string[],
  index: number,
  dateFormat: string,
  startDate: Date,
}

function Weekday({
  index,
  formatedWeekdays,
  weekdayContainerStyle,
  weekdayStyle,
  startDate,
  dateFormat,
}: WeekdayPrivateProps) {

  const weekDay = useMemo<string>(() => {
    if (formatedWeekdays && formatedWeekdays.length === 7) {
      return formatedWeekdays[index];
    }

    return dateFns.format(
      dateFns.addDays(startDate, index),
      dateFormat,
    );
  }, [index, formatedWeekdays, startDate])

  return (
    <View style={[s.dayContainer, weekdayContainerStyle]}>
      <Text style={weekdayStyle}>{weekDay}</Text>
    </View>
  );
}

const WeekdayMemo = React.memo(Weekday);

export { WeekdayMemo as Weekday };
