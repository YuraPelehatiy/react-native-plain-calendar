import React from 'react';
import { Text } from 'react-native';
import T from 'prop-types';
import Touchable from '../Touchable/Touchable';
import s from './styles';

function Day({
  onPress,
  isToday,
  isSelectedDate,
  isSingleSelectedDate,
  isStartSelectedDate,
  isEndSelectedDate,
  isIntermediateSelectedDate,
  isDisabledDate,
  isDisabledParticularDate,
  date,
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
  if (DayComponent) {
    return (
      <DayComponent
        onPress={onPress}
        isToday={isToday}
        isSelectedDate={isSelectedDate}
        isSingleSelectedDate={isSingleSelectedDate}
        isStartSelectedDate={isStartSelectedDate}
        isEndSelectedDate={isEndSelectedDate}
        isIntermediateSelectedDate={isIntermediateSelectedDate}
        isDisabledDate={isDisabledDate}
        isDisabledParticularDate={isDisabledParticularDate}
        date={date}
      />
    );
  }

  const isDisabledTouchable = isDisabledDate || disabledDayPick;

  return (
    <Touchable
      onPress={onPress}
      disabled={isDisabledTouchable}
      style={[
        s.day,
        dayStyle,
        isToday && [s.today, todayStyle],
        isSelectedDate && daySelectedStyle,
        isSingleSelectedDate && [
          s.singleSelected,
          daySingleSelectedStyle,
        ],
        isStartSelectedDate && [
          s.startSelected,
          dayStartSelectedStyle,
        ],
        isEndSelectedDate && [s.endSelected, dayEndSelectedStyle],
        isIntermediateSelectedDate && [
          s.selected,
          dayIntermediateSelectedStyle,
        ],
        isDisabledDate && dayDisabledStyle,
        isDisabledParticularDate && dayDisabledParticularStyle,
      ]}
    >
      <Text
        style={[
          s.number,
          dayTextStyle,
          isToday && todayTextStyle,
          isDisabledDate && [s.disabledNumber, dayDisabledTextStyle],
          isDisabledParticularDate && dayDisabledParticularTextStyle,
          isSelectedDate && daySelectedTextStyle,
        ]}
      >
        {date}
      </Text>
    </Touchable>
  );
}

Day.propTypes = {
  date: T.string.isRequired,
  onPress: T.func.isRequired,
  isToday: T.bool.isRequired,
  isSelectedDate: T.bool,
  isSingleSelectedDate: T.bool.isRequired,
  isStartSelectedDate: T.bool.isRequired,
  isEndSelectedDate: T.bool.isRequired,
  isIntermediateSelectedDate: T.bool,
  isDisabledDate: T.bool.isRequired,
  isDisabledParticularDate: T.bool.isRequired,
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

export default React.memo(Day);
