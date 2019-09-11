import React from 'react';
import { View } from 'react-native';
import dateFns from 'date-fns';
import T from 'prop-types';
import { dateFormats } from '../../constants';
import { isBetween } from '../../utils';
import s from './styles';
import Day from '../Day/Day';

function Cells({
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
}) {
  const monthStart = dateFns.startOfMonth(currentMonth);
  const monthEnd = dateFns.endOfMonth(monthStart);
  const startDate = dateFns.startOfWeek(monthStart, { weekStartsOn });
  const endDate = dateFns.startOfWeek(monthEnd, { weekStartsOn });

  const dateFormat = dateFormats.cellsFormat;

  const weeks = [];
  let days = [];
  let day = startDate;

  let formattedDate = '';

  // The loop "while" form array of the weeks of the month
  while (day <= endDate) {
    // The loop "for" form array of the days of the week
    for (let i = 0; i < 7; i += 1) {
      formattedDate = dateFns.format(day, dateFormat);
      const cloneDay = day;

      const isToday =
        !dateFns.isSameDay(day, startSelectedDate) &&
        !dateFns.isSameDay(day, endSelectedDate) &&
        dateFns.isSameDay(day, new Date());

      const isDisabledParticularDate = disabledDates.some(
        (disabled) => dateFns.isSameDay(day, disabled),  // eslint-disable-line
      );

      const isDisabledDate =
        !dateFns.isSameMonth(day, monthStart) ||
        dateFns.isBefore(day, dateFns.subDays(minDate, 1)) ||
        dateFns.isAfter(day, maxDate) ||
        isDisabledParticularDate;

      const isSingleSelectedDate = dateFns.isSameDay(
        day,
        selectedDate,
      );

      const isStartSelectedDate = dateFns.isSameDay(
        day,
        startSelectedDate,
      );

      const isEndSelectedDate = dateFns.isSameDay(
        day,
        endSelectedDate,
      );

      const isIntermediateSelectedDate =
        startSelectedDate &&
        endSelectedDate &&
        isBetween(startSelectedDate, endSelectedDate, day);

      const isSelectedDate =
        isSingleSelectedDate ||
        isStartSelectedDate ||
        isEndSelectedDate ||
        isIntermediateSelectedDate;

      days.push(
        <View style={[s.dayContainer, dayContainerStyle]} key={day}>
          <Day
            date={formattedDate}
            DayComponent={DayComponent}
            onPress={() => onDateClick(dateFns.parse(cloneDay))}
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
    }

    weeks.push(
      <View style={[s.week, daysRowStyle]} key={day}>
        {days}
      </View>,
    );
    days = [];
  }

  return <View style={cellsStyle}>{weeks}</View>;
}

Cells.propTypes = {
  currentMonth: T.instanceOf(Date).isRequired,
  selectedDate: T.oneOfType([T.string, T.instanceOf(Date)]),
  startSelectedDate: T.oneOfType([T.string, T.instanceOf(Date)]),
  endSelectedDate: T.oneOfType([T.string, T.instanceOf(Date)]),
  minDate: T.oneOfType([T.string, T.instanceOf(Date)]),
  maxDate: T.oneOfType([T.string, T.instanceOf(Date)]),
  onDateClick: T.func,
  disabledDates: T.array,
  weekStartsOn: T.number,
  cellsStyle: T.any,
  daysRowStyle: T.any,
  DayComponent: T.func,
  dayContainerStyle: T.any,
  todayStyle: T.any,
  dayStyle: T.any,
  daySelectedStyle: T.any,
  daySingleSelectedStyle: T.any,
  dayStartSelectedStyle: T.any,
  dayEndSelectedStyle: T.any,
  dayIntermediateSelectedStyle: T.any,
  dayDisabledStyle: T.any,
  dayDisabledParticularStyle: T.any,
  todayTextStyle: T.any,
  dayTextStyle: T.any,
  daySelectedTextStyle: T.any,
  dayDisabledTextStyle: T.any,
  dayDisabledParticularTextStyle: T.any,
  disabledDayPick: T.bool,
};

export default Cells;
