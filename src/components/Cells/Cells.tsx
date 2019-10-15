import * as dateFns from 'date-fns';
import * as React from 'react';
import { useMemo } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { dateFormats } from '../../constants';
import { Cell, CellProps } from './Cell';
import { s } from './styles';

export interface CellsProps extends CellProps {
  cellsStyle?: StyleProp<ViewStyle>;
  daysRowStyle?: StyleProp<ViewStyle>;
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
  dayPropsStyle,
  disabledDayPick,
}: CellsPrivateProps) {
  const { monthStart, startDate, endDate } = useMemo(() => {
    const currentMonthStart: Date = dateFns.startOfMonth(
      currentMonth,
    );
    const currentMonthEnd: Date = dateFns.endOfMonth(
      currentMonthStart,
    );
    const currentMonthStartDate: Date = dateFns.startOfWeek(
      currentMonthStart,
      {
        weekStartsOn,
      },
    );
    const currentMonthEndDate: Date = dateFns.startOfWeek(
      currentMonthEnd,
      {
        weekStartsOn,
      },
    );

    return {
      monthStart: currentMonthStart,
      startDate: currentMonthStartDate,
      endDate: currentMonthEndDate,
    };
  }, [currentMonth, weekStartsOn]);

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

      days.push(
        <Cell
          key={key}
          day={cloneDay}
          monthStart={monthStart}
          currentMonth={currentMonth}
          formattedDate={formattedDate}
          DayComponent={DayComponent}
          onDateClick={onDateClick}
          dayPropsStyle={dayPropsStyle}
          disabledDayPick={disabledDayPick}
          selectedDate={selectedDate}
          startSelectedDate={startSelectedDate}
          endSelectedDate={endSelectedDate}
          minDate={minDate}
          maxDate={maxDate}
          disabledDates={disabledDates}
          dayContainerStyle={dayContainerStyle}
        />,
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
