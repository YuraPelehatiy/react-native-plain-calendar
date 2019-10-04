import * as React from 'react';
import { StyleProp, Text, TextStyle, ViewStyle } from 'react-native';
import { Touchable } from '../Touchable/Touchable';
import { s } from './styles';

export interface DayStyleProps {
  todayStyle?: StyleProp<ViewStyle>,
  dayStyle?: StyleProp<ViewStyle>,
  daySelectedStyle?: StyleProp<ViewStyle>,
  daySingleSelectedStyle?: StyleProp<ViewStyle>,
  dayStartSelectedStyle?: StyleProp<ViewStyle>,
  dayEndSelectedStyle?: StyleProp<ViewStyle>,
  dayIntermediateSelectedStyle?: StyleProp<ViewStyle>,
  dayDisabledStyle?: StyleProp<ViewStyle>,
  dayDisabledParticularStyle?: StyleProp<ViewStyle>,
  todayTextStyle?: StyleProp<TextStyle>,
  dayTextStyle?: StyleProp<TextStyle>,
  daySelectedTextStyle?: StyleProp<TextStyle>,
  dayDisabledTextStyle?: StyleProp<TextStyle>,
  dayDisabledParticularTextStyle?: StyleProp<TextStyle>,
}

export interface DayComponentProps {
  isToday: boolean,
  isSelectedDate: boolean,
  isSingleSelectedDate: boolean,
  isStartSelectedDate: boolean,
  isEndSelectedDate: boolean,
  isIntermediateSelectedDate: boolean,
  isDisabledDate: boolean,
  isDisabledParticularDate: boolean,
  date: string,
  onPress(): void,
}

export interface DayProps extends DayComponentProps, DayStyleProps {
  DayComponent?: React.FunctionComponent<DayComponentProps>
  disabledDayPick: boolean,
}

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
}: DayProps) {
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

const DayMemo = React.memo(Day);

export { DayMemo as Day };
