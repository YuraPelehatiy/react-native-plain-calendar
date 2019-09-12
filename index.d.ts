declare module 'react-native-plain-calendar' {
  import * as React from 'react';
  import { StyleProp, ViewProps, ViewStyle, TextStyle } from 'react-native';

  export interface HeaderButtonComponent {
    type: 'prev' | 'next';
    onPress(): void;
  }

  export interface HeaderComponent {
    currentMonth: string;
    onPrevMonth(): void;
    onNextMonth(): void;
  }

  export interface DayComponent {
    onPress(): void
    isToday: boolean
    isSelectedDate: boolean
    isSingleSelectedDate: boolean
    isStartSelectedDate: boolean
    isEndSelectedDate: boolean
    isIntermediateSelectedDate: boolean
    isDisabledDate: boolean
    isDisabledParticularDate: boolean
    date: string
  }

  export interface CalendarProps extends ViewProps {
    /**
     * Callback which called when day press
     */
    onDayPress?(day: string): void
    
    /**
     * The date that the calendar opens to when it will be mounted.
     */
    initialDate?: string,

    /**
     * The date which will be marked as selected single date
     */
    selectedDate?: string

    /**
     * The date which will be marked as begin date of the range
     */
    startSelectedDate?: string

    /**
     * The date which will be marked as end date of the range
     */
    endSelectedDate?: string

    /**
     * Minimum date that can be selected
     */
    minDate?: string

    /**
     * Maximum date that can be selected
     */
    maxDate?: string
    
    /**
     * Array of disabled days
     */
    disabledDates?: string[]
    
    // -------------- HEADER -------------- //
  
    /**
     * The format of the date in the header.
     * react-native-simple-calendar is using the library 'date-fns'. 
     * More information about supported dates formats you can find here:
     * https://date-fns.org/v1.30.1/docs/format
     */
    headerDateFormat?: string

    /**
     * The style of the header container(View).
     */
    headerContainerStyle?: StyleProp<ViewStyle>

    /**
     * The style of the header title(Text).
     */
    headerTitleStyle?: StyleProp<TextStyle>

    /**
     * The style of the header button container(View).
     */
    headerButtonStyle?: StyleProp<ViewStyle>

    /**
       * Takes a component and renders it instead of default header button component. 
       * Typical usage:
       * ```
       * <Calendar
       *  HeaderButtonComponent={({ type, onPress }) => (
       *    <TouchableOpacity onPress={onPress}>
       *      <Icon name={type}/>    
       *    </TouchableOpacity>
       *  )}
       * />
       * ```
       */
    HeaderButtonComponent?({ type, onPress }: HeaderButtonComponent): React.ComponentType<any> | React.ReactElement | null
    
    /**
       * Takes a component and renders it instead of default header component. 
       * Typical usage:
       * ```
       * <Calendar
       *  HeaderComponent={({ month, onPrevMonth, onNextMonth }) => (
       *    <View>
       *      <Icon name="left" onPress={onPrevMonth} />
       *      <Text>{month}</Text>
       *      <Icon name="right" onPress={onNextMonth} />
       *    </View>
       *  )}
       * />
       * ```
       */
    HeaderComponent?({ currentMonth, onPrevMonth, onNextMonth }: HeaderComponent): React.ComponentType<any> | React.ReactElement | null

    // -------------- WEEK -------------- //

    /**
     * The index of the first day of the week (0 - Sunday, 1 - Monday, 2 - Tuesday, etc )
     * Default is 0
     */
    weekStartsOn?: number

    /**
     * List of days of the week. In the list  Must be 7 days and begin from Sunday
     * Example: 
     * ```
     * ["Sunday", "Monday", ...]
     * ```
     */
    weekdays?: string[]

    /**
     * The style of the week container(View).
     */
    weekContainerStyle:  StyleProp<ViewStyle>

    /**
     * The style of the day container of the week(View).
     */
    weekdayContainerStyle:  StyleProp<ViewStyle>

    /**
     * The style of the day of the week(Text).
     */
    weekdayStyle:  StyleProp<TextStyle>

    // -------------- DAY -------------- //

    /**
     * The style of the cells component(View).
     */
    cellsStyle: StyleProp<ViewProps>

    /**
     * The style of the rows that contains days of the week in cells (View).
     */
    daysRowStyle: StyleProp<ViewProps>
    
    /**
     * The style of the day wrapper(container) component(View).
     */
    dayContainerStyle?: StyleProp<ViewProps>

    DayComponent?({  
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
    }: DayComponent): React.ComponentType<any> | React.ReactElement

    /**
     * The style of the today(View).
     */
    todayStyle?: StyleProp<ViewStyle>

    /**
     * The style of the day(View).
     */
    dayStyle?: StyleProp<ViewStyle>

    /**
     * The style of the selected day(View).
     */
    daySelectedStyle?: StyleProp<ViewStyle>

    /**
     * The style of the single selected day(View).
     */
    daySingleSelectedStyle?: StyleProp<ViewStyle>

    /**
     * The style of the start selected day (day at the begin of the range)(View).
     */
    dayStartSelectedStyle?: StyleProp<ViewStyle>

    /**
     * The style of the end selected day (day at the end of the range)(View).
     */
    dayEndSelectedStyle?: StyleProp<ViewStyle>

    /**
     * The style of the intermediate selected day (day within start and end selected days)(View).
     */
    dayIntermediateSelectedStyle?: StyleProp<ViewStyle>

    /**
     * The style of the disabled day(View).
     */
    dayDisabledStyle?: StyleProp<ViewStyle>

    /**
     * The style of the disabled particular day (days that passed in disabledDates props)(View).
     */
    dayDisabledParticularStyle?: StyleProp<ViewStyle>

    /**
     * The style of the today text(Text).
     */
    todayTextStyle?: StyleProp<TextStyle>

    /**
     * The style of the day text(Text).
     */
    dayTextStyle?: StyleProp<TextStyle>
    
    /**
     * The style of the selected day text(Text).
     */
    daySelectedTextStyle?: StyleProp<TextStyle>
    
    /**
     * The style of the disabled day text(Text).
     */
    dayDisabledTextStyle?: StyleProp<TextStyle>
    
    /**
     * The style of the disabled particular day text(Text).
     */
    dayDisabledParticularTextStyle?: StyleProp<TextStyle>
    
  }

  declare const Calendar: React.FunctionComponent<CalendarProps>

  export default Calendar
}