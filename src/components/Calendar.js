import React, { useState, useReducer, useEffect } from 'react';
import { View } from 'react-native';
import dateFns from 'date-fns';
import T from 'prop-types';
import Header from './Header/Header';
import Week from './Week/Week';
import Cells from './Cells/Cells';
import { dateFormats } from '../constants';
import { isWithinRangeWithArray } from '../utils';

function Calendar({
  onDayPress,
  initialDate,
  selectedDate,
  startSelectedDate,
  endSelectedDate,
  minDate,
  maxDate,
  disabledDates,
  style,
  headerDateFormat,
  headerContainerStyle,
  headerTitleStyle,
  headerButtonStyle,
  HeaderComponent,
  HeaderButtonComponent,
  weekStartsOn,
  weekdays,
  weekContainerStyle,
  weekdayContainerStyle,
  weekdayStyle,
  WeekdaysComponent,
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
  ...props
}) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  useEffect(() => {
    if (initialDate) {
      setCurrentMonth(initialDate);
    }
  }, []);

  function onDateClick(day) {
    const monthDifferent = dateFns.differenceInCalendarMonths(
      day,
      currentMonth,
    );

    if (monthDifferent === 1) {
      onNextMonth();
    } else if (monthDifferent === -1) {
      onPrevMonth();
    }

    if (onDayPress) {
      onDayPress(day);
    }
  }

  function onNextMonth() {
    setCurrentMonth(dateFns.addMonths(currentMonth, 1));
  }

  function onPrevMonth() {
    setCurrentMonth(dateFns.subMonths(currentMonth, 1));
  }

  return (
    <View style={style} {...props}>
      <Header
        onPrevMonth={onPrevMonth}
        currentMonth={currentMonth}
        onNextMonth={onNextMonth}
        headerDateFormat={headerDateFormat}
        headerContainerStyle={headerContainerStyle}
        headerTitleStyle={headerTitleStyle}
        headerButtonStyle={headerButtonStyle}
        HeaderComponent={HeaderComponent}
        HeaderButtonComponent={HeaderButtonComponent}
      />
      <Week
        currentMonth={currentMonth}
        weekStartsOn={weekStartsOn}
        weekdays={weekdays}
        weekContainerStyle={weekContainerStyle}
        weekdayContainerStyle={weekdayContainerStyle}
        weekdayStyle={weekdayStyle}
        WeekdaysComponent={WeekdaysComponent}
      />
      <Cells
        selectedDate={selectedDate}
        currentMonth={currentMonth}
        onDateClick={onDateClick}
        startSelectedDate={startSelectedDate}
        endSelectedDate={endSelectedDate}
        minDate={minDate}
        maxDate={maxDate}
        weekStartsOn={weekStartsOn}
        disabledDates={disabledDates}
        dayContainerStyle={dayContainerStyle}
        cellsStyle={cellsStyle}
        daysRowStyle={daysRowStyle}
        DayComponent={DayComponent}
        todayStyle={todayStyle}
        dayStyle={dayStyle}
        daySelectedStyle={daySelectedStyle}
        daySingleSelectedStyle={daySingleSelectedStyle}
        dayStartSelectedStyle={dayStartSelectedStyle}
        dayEndSelectedStyle={dayEndSelectedStyle}
        dayIntermediateSelectedStyle={dayIntermediateSelectedStyle}
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
    </View>
  );
}

Calendar.propTypes = {
  onDayPress: T.func,
  selectedDate: T.oneOfType([T.string, T.instanceOf(Date)]),
  initialDate: T.oneOfType([T.string, T.instanceOf(Date)]),
  startSelectedDate: T.oneOfType([T.string, T.instanceOf(Date)]),
  endSelectedDate: T.oneOfType([T.string, T.instanceOf(Date)]),
  minDate: T.oneOfType([T.string, T.instanceOf(Date)]),
  maxDate: T.oneOfType([T.string, T.instanceOf(Date)]),
  style: T.any,
  HeaderComponent: T.func,
  HeaderButtonComponent: T.func,
  headerDateFormat: T.string,
  headerContainerStyle: T.any,
  headerTitleStyle: T.any,
  headerButtonStyle: T.any,
  weekStartsOn: T.number,
  weekdays: T.arrayOf(T.string),
  weekContainerStyle: T.any,
  weekdayContainerStyle: T.any,
  weekdayStyle: T.any,
  WeekdaysComponent: T.oneOf([null]),
  disabledDates: T.array,
  cellsStyle: T.any,
  daysRowStyle: T.any,
  dayContainerStyle: T.any,
  DayComponent: T.func,
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

Calendar.defaultProps = {
  weekStartsOn: 0,
  weekdays: [],
  disabledDates: [],
  headerDateFormat: dateFormats.headerFormat,
  disabledDayPick: true,
};

const initialState = {
  selectedDate: null,
  startSelectedDate: null,
  endSelectedDate: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'SELECTED_DATE':
      return {
        ...state,
        selectedDate: action.payload,
      };
    case 'START_SELECTED_DATE':
      return {
        ...state,
        startSelectedDate: action.payload,
      };
    case 'END_SELECTED_DATE':
      return {
        ...state,
        endSelectedDate: action.payload,
      };
    case 'START_END_SELECTED_DATE':
      return {
        ...state,
        startSelectedDate: action.payload.start,
        endSelectedDate: action.payload.end,
      };
    case 'START_END_RESET_SINGLE_DATE':
      return {
        ...state,
        startSelectedDate: action.payload.start,
        endSelectedDate: action.payload.end,
        selectedDate: null,
      };
    case 'SINGLE_RESET_START_END_DATE':
      return {
        ...state,
        startSelectedDate: null,
        endSelectedDate: null,
        selectedDate: action.payload,
      };

    default:
      return state;
  }
}

Calendar.Picker = function Picker({
  onSelected,
  selectedType,
  disabledDates,
  disabledDayPick,
  ...props
}) {
  const [
    { selectedDate, startSelectedDate, endSelectedDate },
    dispatch,
  ] = useReducer(reducer, initialState);

  function setSelectedDate(day) {
    dispatch({ type: 'SELECTED_DATE', payload: day });
  }

  // function setStartSelectedDate(day) {
  //   dispatch({ type: 'START_SELECTED_DATE', payload: day });
  // }

  function setEndSelectedDate(day) {
    dispatch({ type: 'END_SELECTED_DATE', payload: day });
  }

  function setStartEndSelectedDate(start, end) {
    dispatch({
      type: 'START_END_SELECTED_DATE',
      payload: { start, end },
    });
  }

  function setStartEndResetSingleDate(start, end) {
    dispatch({
      type: 'START_END_RESET_SINGLE_DATE',
      payload: { start, end },
    });
  }

  function setSingleResetStartEndDate(day) {
    dispatch({
      type: 'SINGLE_RESET_START_END_DATE',
      payload: day,
    });
  }

  function callOnSelected() {
    if (onSelected) {
      onSelected();
    }
  }

  function onRangeSelect(day) {
    if (startSelectedDate && !endSelectedDate) {
      if (
        isWithinRangeWithArray(disabledDates, startSelectedDate, day)
      ) {
        return;
      }

      if (dateFns.isSameDay(day, startSelectedDate)) {
        setStartEndSelectedDate(null, null);

        return;
      }

      // If the end date earlier than the start date,
      // we set the end date instead of the start date
      // and set the start date instead of selected the end date.
      if (dateFns.isBefore(day, startSelectedDate)) {
        const endDate = startSelectedDate;
        setStartEndResetSingleDate(day, endDate);

        return;
      }
      setEndSelectedDate(day);
    } else {
      if (dateFns.isSameDay(day, endSelectedDate)) {
        setStartEndSelectedDate(startSelectedDate, null);

        return;
      }

      setStartEndSelectedDate(day, null);
    }
  }

  function onSingleSelect(day) {
    if (dateFns.isSameDay(day, selectedDate)) {
      setSelectedDate(null);

      return;
    }

    setSelectedDate(day);
    callOnSelected();
  }

  function onSingleRangeSelect(day) {
    if (selectedDate) {
      if (dateFns.isBefore(day, selectedDate)) {
        const endDate = selectedDate;

        setStartEndResetSingleDate(day, endDate);
        callOnSelected();

        return;
      }

      setStartEndResetSingleDate(selectedDate, day);
      callOnSelected();

      return;
    }

    setSingleResetStartEndDate(day);
    callOnSelected();
  }

  function onDayPress(day) {
    if (selectedType === 'range') {
      onRangeSelect(day);
    } else if (selectedType === 'single-range') {
      onSingleRangeSelect(day);
    } else {
      onSingleSelect(day);
    }
  }

  return (
    <Calendar
      selectedDate={selectedDate}
      onDayPress={onDayPress}
      startSelectedDate={startSelectedDate}
      endSelectedDate={endSelectedDate}
      minDate={new Date()}
      disabledDates={disabledDates}
      disabledDayPick={disabledDayPick}
      {...props}
    />
  );
};

Calendar.Picker.defaultProps = {
  selectedType: 'single',
  disabledDayPick: false,
};

Calendar.Picker.propTypes = {
  onSelected: T.func,
  selectedType: T.oneOf(['single', 'range', 'single-range']),
  disabledDates: T.array,
  disabledDayPick: T.bool,
};

export default Calendar;
