import * as dateFns from 'date-fns';
import * as React from 'react';
import { useMemo } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { dateFormats } from '../../constants';
import { WeekDayNumber } from '../../types';
import { isBetween } from '../../utils';
import { Day, DayComponentProps, DayStyleProps } from '../Day/Day';
import { s } from './styles';

export interface CellsProps extends DayStyleProps {
  selectedDate?: Date;
  startSelectedDate?: Date;
  endSelectedDate?: Date;
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: Date[];
  weekStartsOn?: WeekDayNumber;
  cellsStyle?: StyleProp<ViewStyle>;
  daysRowStyle?: StyleProp<ViewStyle>;
  dayContainerStyle?: StyleProp<ViewStyle>;
  DayComponent?: React.FunctionComponent<DayComponentProps>;
  disabledDayPick: boolean;
}

interface CellsPrivateProps extends CellsProps {
  currentMonth: Date;
  onDateClick(date: Date): void;
}

export function Cells({
  currentMonth,
  selectedDate,
  onDateClick,
  startSelectedDate,
  endSelectedDate,
  minDate,
  maxDate,
  disabledDates,
  weekStartsOn,
  cellsStyle,
  daysRowStyle,
  dayContainerStyle,
  DayComponent,
  todayStyle,
  dayStyle,
  daySelectedStyle,
  daySingleSelectedStyle,
  dayStartSelectedStyle,
  dayEndSelectedStyle,
  dayIntermediateSelectedStyle,
  dayDisabledStyle,
  dayDisabledParticularStyle,
  todayTextStyle,
  dayTextStyle,
  daySelectedTextStyle,
  dayDisabledTextStyle,
  dayDisabledParticularTextStyle,
  disabledDayPick,
}: CellsPrivateProps) {
  const monthStart: Date = dateFns.startOfMonth(currentMonth);
  const monthEnd: Date = dateFns.endOfMonth(monthStart);
  const startDate: Date = dateFns.startOfWeek(monthStart, {
    weekStartsOn,
  });
  const endDate: Date = dateFns.startOfWeek(monthEnd, {
    weekStartsOn,
  });

  const dateFormat: string = dateFormats.cellsFormat;

  const weeks: React.ReactElement[] = [];
  let days: React.ReactElement[] = [];
  let day: Date = startDate;
  let key: string = day.toString();

  let formattedDate = '';

  // The loop "while" form array of the weeks of the month
  while (day <= endDate) {
    // The loop "for" form array of the days of the week
    for (let i = 0; i < 7; i += 1) {
      formattedDate = dateFns.format(day, dateFormat);
      const cloneDay = day;

      const isToday: boolean = useMemo(() => {
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

      const isDisabledParticularDate: boolean = useMemo(() => {
        if (!!disabledDates) {
          return disabledDates.some((disabled: number | Date) =>
            dateFns.isSameDay(day, disabled),
          );
        } else {
          return false;
        }
      }, [disabledDates, day]);

      const isDisabledDate: boolean = useMemo(() => {
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

      const isSingleSelectedDate: boolean = useMemo(() => {
        if (selectedDate) {
          return dateFns.isSameDay(day, selectedDate);
        } else {
          return false;
        }
      }, [selectedDate, day]);

      const isStartSelectedDate: boolean = useMemo(() => {
        if (startSelectedDate) {
          return dateFns.isSameDay(day, startSelectedDate);
        } else {
          return false;
        }
      }, [day, startSelectedDate]);

      const isEndSelectedDate: boolean = useMemo(() => {
        if (endSelectedDate) {
          return dateFns.isSameDay(day, endSelectedDate);
        } else {
          return false;
        }
      }, [day, endSelectedDate]);

      const isIntermediateSelectedDate: boolean = useMemo(
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

      days.push(
        <View style={[s.dayContainer, dayContainerStyle]} key={key}>
          <Day
            date={formattedDate}
            DayComponent={DayComponent}
            onPress={() => onDateClick(new Date(cloneDay))}
            isToday={isToday}
            isDisabledDate={isDisabledDate}
            isDisabledParticularDate={isDisabledParticularDate}
            isSelectedDate={isSelectedDate}
            isSingleSelectedDate={isSingleSelectedDate}
            isStartSelectedDate={isStartSelectedDate}
            isEndSelectedDate={isEndSelectedDate}
            isIntermediateSelectedDate={isIntermediateSelectedDate}
            todayStyle={todayStyle}
            dayStyle={dayStyle}
            daySelectedStyle={daySelectedStyle}
            daySingleSelectedStyle={daySingleSelectedStyle}
            dayStartSelectedStyle={dayStartSelectedStyle}
            dayEndSelectedStyle={dayEndSelectedStyle}
            dayIntermediateSelectedStyle={
              dayIntermediateSelectedStyle
            }
            dayDisabledStyle={dayDisabledStyle}
            dayDisabledParticularStyle={dayDisabledParticularStyle}
            todayTextStyle={todayTextStyle}
            dayTextStyle={dayTextStyle}
            daySelectedTextStyle={daySelectedTextStyle}
            dayDisabledTextStyle={dayDisabledTextStyle}
            dayDisabledParticularTextStyle={
              dayDisabledParticularTextStyle
            }
            disabledDayPick={disabledDayPick}
          />
        </View>,
      );

      day = dateFns.addDays(day, 1);
      key = dateFns.format(day, dateFormats.cellsFormatKey);
    }

    weeks.push(
      <View style={[s.week, daysRowStyle]} key={key}>
        {days}
      </View>,
    );
    days = [];
  }

  return <View style={cellsStyle}>{weeks}</View>;
}
