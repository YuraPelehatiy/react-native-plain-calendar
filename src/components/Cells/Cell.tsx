import * as dateFns from 'date-fns';
import * as React from 'react';
import { useMemo } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { WeekDayNumber } from '../../types';
import { isBetween } from '../../utils';
import { Day, DayComponentProps, DayStyleProps } from '../Day/Day';
import { s } from './styles';

export interface CellProps {
  selectedDate?: Date;
  startSelectedDate?: Date;
  endSelectedDate?: Date;
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: Date[];
  weekStartsOn?: WeekDayNumber;
  dayContainerStyle?: StyleProp<ViewStyle>;
  DayComponent?: React.FunctionComponent<DayComponentProps>;
  disabledDayPick: boolean;
  dayPropsStyle?: DayStyleProps;
}

interface CellPrivateProps extends CellProps {
  currentMonth: Date;
  formattedDate: string;
  day: Date;
  monthStart: Date;
  onDateClick(date: Date): void;
}

export function Cell({
  selectedDate,
  onDateClick,
  startSelectedDate,
  endSelectedDate,
  minDate,
  maxDate,
  disabledDates,
  dayContainerStyle,
  DayComponent,
  dayPropsStyle,
  disabledDayPick,
  day,
  formattedDate,
  monthStart,
}: CellPrivateProps) {
  const isToday = useMemo<boolean>(() => {
    if (startSelectedDate && endSelectedDate) {
      return (
        !dateFns.isSameDay(day, startSelectedDate) &&
        !dateFns.isSameDay(day, endSelectedDate) &&
        dateFns.isSameDay(day, new Date())
      );
    } else {
      return dateFns.isSameDay(day, new Date());
    }
  }, [day, startSelectedDate, endSelectedDate]);

  const isDisabledParticularDate = useMemo<boolean>(() => {
    if (!!disabledDates) {
      return disabledDates.some((disabled: number | Date) =>
        dateFns.isSameDay(day, disabled),
      );
    } else {
      return false;
    }
  }, [disabledDates, day]);

  const isDisabledDate = useMemo<boolean>(() => {
    const isSameMonth = dateFns.isSameMonth(day, monthStart);

    let isBeforeDay = false;
    if (minDate) {
      isBeforeDay = dateFns.isBefore(
        day,
        dateFns.subDays(minDate, 1),
      );
    }

    let isAfterDay = false;
    if (maxDate) {
      isAfterDay = dateFns.isAfter(day, maxDate);
    }

    return (
      !isSameMonth ||
      isBeforeDay ||
      isAfterDay ||
      isDisabledParticularDate
    );
  }, [day, monthStart, minDate, maxDate]);

  const isSingleSelectedDate = useMemo<boolean>(() => {
    if (selectedDate) {
      return dateFns.isSameDay(day, selectedDate);
    } else {
      return false;
    }
  }, [selectedDate, day]);

  const isStartSelectedDate = useMemo<boolean>(() => {
    if (startSelectedDate) {
      return dateFns.isSameDay(day, startSelectedDate);
    } else {
      return false;
    }
  }, [day, startSelectedDate]);

  const isEndSelectedDate = useMemo<boolean>(() => {
    if (endSelectedDate) {
      return dateFns.isSameDay(day, endSelectedDate);
    } else {
      return false;
    }
  }, [day, endSelectedDate]);

  const isIntermediateSelectedDate = useMemo<boolean>(
    () =>
      !!(
        startSelectedDate &&
        endSelectedDate &&
        isBetween(startSelectedDate, endSelectedDate, day)
      ),
    [startSelectedDate, endSelectedDate, day],
  );

  const isSelectedDate: boolean =
    isSingleSelectedDate ||
    isStartSelectedDate ||
    isEndSelectedDate ||
    isIntermediateSelectedDate;

  return (
    <View style={[s.dayContainer, dayContainerStyle]}>
      <Day
        date={formattedDate}
        DayComponent={DayComponent}
        onPress={() => onDateClick(new Date(day))}
        isToday={isToday}
        isDisabledDate={isDisabledDate}
        isDisabledParticularDate={isDisabledParticularDate}
        isSelectedDate={isSelectedDate}
        isSingleSelectedDate={isSingleSelectedDate}
        isStartSelectedDate={isStartSelectedDate}
        isEndSelectedDate={isEndSelectedDate}
        isIntermediateSelectedDate={isIntermediateSelectedDate}
        disabledDayPick={disabledDayPick}
        {...dayPropsStyle}
      />
    </View>
  );
}
