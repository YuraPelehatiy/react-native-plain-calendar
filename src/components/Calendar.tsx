import * as dateFns from 'date-fns';
import * as React from 'react';
import { useEffect, useReducer, useState } from 'react';
import { View, ViewProps } from 'react-native';
import { dateFormats } from '../constants';
import { isWithinRangeWithArray } from '../utils';
import { Cells, CellsProps } from './Cells/Cells';
import { Header, HeaderProps } from './Header/Header';
import { Week, WeekProps } from './Week/Week';

export interface CalendarProps extends ViewProps, Partial<HeaderProps>, Partial<WeekProps>, Partial<CellsProps> {
  initialDate?: Date;
  weekdays?: string[];
  disabledDayPick?: boolean;
  headerDateFormat?: string;
  onDayPress?(date: Date): void;
}

export function Calendar({
  onDayPress,
  initialDate,
  selectedDate,
  startSelectedDate,
  endSelectedDate,
  minDate,
  maxDate,
  disabledDates,
  style,
  headerDateFormat = dateFormats.headerFormat,
  headerContainerStyle,
  headerTitleStyle,
  headerButtonStyle,
  HeaderComponent,
  HeaderButtonComponent,
  weekStartsOn,
  weekdays = [],
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
  disabledDayPick = true,
  ...props
}: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

  useEffect(() => {
    if (initialDate) {
      setCurrentMonth(initialDate);
    }
  }, []);

  function onDateClick(day: Date) {
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

Calendar.defaultProps = {
  weekStartsOn: 0,
  weekdays: [],
  disabledDates: [],
  headerDateFormat: dateFormats.headerFormat,
  disabledDayPick: true,
};

interface StateType {
  selectedDate: Date | null;
  startSelectedDate: Date | null;
  endSelectedDate: Date | null;
}

interface ActionType {
  type: 'SELECTED_DATE' 
  | 'START_SELECTED_DATE' 
  | 'END_SELECTED_DATE' 
  | 'START_END_SELECTED_DATE' 
  | 'START_END_RESET_SINGLE_DATE' 
  | 'SINGLE_RESET_START_END_DATE';
  payload: any,
}

const initialState: StateType = {
  selectedDate: null,
  startSelectedDate: null,
  endSelectedDate: null,
};

function reducer(state: StateType, action: ActionType) {
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

interface OnSelected {
  selected?: Date | null,
  selectedStart?: Date | null,
  selectedEnd?: Date | null,
}

export interface CalendarPickerProps extends CalendarProps {
  selectedType?: 'single' | 'range' | 'single-range';
  onSelected?(params: OnSelected): void;
};


function Picker({
  onSelected,
  selectedType,
  disabledDates,
  disabledDayPick = false,
  ...props
}: CalendarPickerProps) {
  const [
    { selectedDate, startSelectedDate, endSelectedDate },
    dispatch,
  ] = useReducer(reducer, initialState);

  function setSelectedDate(day: Date | null) {
    dispatch({ type: 'SELECTED_DATE', payload: day });
  }

  // function setStartSelectedDate(day) {
  //   dispatch({ type: 'START_SELECTED_DATE', payload: day });
  // }

  function setEndSelectedDate(day: Date | null) {
    dispatch({ type: 'END_SELECTED_DATE', payload: day });
  }

  function setStartEndSelectedDate(start: Date | null, end: Date | null) {
    dispatch({
      type: 'START_END_SELECTED_DATE',
      payload: { start, end },
    });
  }

  function setStartEndResetSingleDate(start: Date | null, end: Date | null) {
    dispatch({
      type: 'START_END_RESET_SINGLE_DATE',
      payload: { start, end },
    });
  }

  function setSingleResetStartEndDate(day: Date | null) {
    dispatch({
      type: 'SINGLE_RESET_START_END_DATE',
      payload: day,
    });
  }

  function callOnSelected({
    selected = null,
    selectedStart = null,
    selectedEnd = null,
  }: OnSelected) {
    if (onSelected) {
      onSelected({ selected, selectedStart, selectedEnd });
    }
  }

  function onRangeSelect(day: Date) {
    if (startSelectedDate && !endSelectedDate) {
      if (
        !!disabledDates && isWithinRangeWithArray(disabledDates, startSelectedDate, day)
      ) {
        return;
      }

      if (dateFns.isSameDay(day, startSelectedDate)) {
        setStartEndSelectedDate(null, null);
        callOnSelected({ selectedStart: null, selectedEnd: null })

        return;
      }

      // If the end date earlier than the start date,
      // we set the end date instead of the start date
      // and set the start date instead of selected the end date.
      if (dateFns.isBefore(day, startSelectedDate)) {
        const endDate = startSelectedDate;
        setStartEndResetSingleDate(day, endDate);
        callOnSelected({ selectedStart: day, selectedEnd: endDate })

        return;
      }
      setEndSelectedDate(day);
    } else {
      if (dateFns.isSameDay(day, endSelectedDate)) {
        setStartEndSelectedDate(startSelectedDate, null);
        callOnSelected({ selectedStart: startSelectedDate })

        return;
      }

      setStartEndSelectedDate(day, null);
      callOnSelected({ selectedStart: day })
    }
  }

  function onSingleSelect(day: Date) {
    if (dateFns.isSameDay(day, selectedDate)) {
      setSelectedDate(null);
      callOnSelected({ selected: null, });

      return;
    }

    setSelectedDate(day);
    callOnSelected({ selected: day, });
  }

  function onSingleRangeSelect(day: Date) {
    if (selectedDate) {
      if (dateFns.isBefore(day, selectedDate)) {
        const endDate = selectedDate;

        setStartEndResetSingleDate(day, endDate);
        callOnSelected({ selectedStart: day, selectedEnd: endDate });

        return;
      }

      setStartEndResetSingleDate(selectedDate, day);
      callOnSelected({ selectedStart: selectedDate, selectedEnd: day });

      return;
    }

    setSingleResetStartEndDate(day);
    callOnSelected({ selected: day });
  }

  function onDayPress(day: Date) {
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
      disabledDates={disabledDates}
      disabledDayPick={disabledDayPick}
      {...props}
    />
  );
};

Calendar.Picker = Picker;


