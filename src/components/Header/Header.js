import React from 'react';
import { View, Text } from 'react-native';
import dateFns from 'date-fns';
import T from 'prop-types';
import HeaderButton from './HeaderButton';
import s from './styles';

function Header({
  onPrevMonth,
  currentMonth,
  onNextMonth,
  headerDateFormat,
  headerContainerStyle,
  headerTitleStyle,
  headerButtonStyle,
  HeaderComponent,
  HeaderButtonComponent,
}) {
  const month = dateFns.format(currentMonth, headerDateFormat);

  if (HeaderComponent) {
    return (
      <HeaderComponent
        onPrevMonth={onPrevMonth}
        currentMonth={month}
        onNextMonth={onNextMonth}
      />
    );
  }

  return (
    <View style={[s.header, headerContainerStyle]}>
      <HeaderButton
        type="prev"
        onPress={onPrevMonth}
        headerButtonStyle={headerButtonStyle}
        HeaderButtonComponent={HeaderButtonComponent}
      >
        Previous
      </HeaderButton>
      <View style={[s.headerContainers, s.headerTitleContainer]}>
        <Text style={headerTitleStyle}>{month}</Text>
      </View>
      <HeaderButton
        type="next"
        onPress={onNextMonth}
        headerButtonStyle={headerButtonStyle}
        HeaderButtonComponent={HeaderButtonComponent}
      >
        Next
      </HeaderButton>
    </View>
  );
}

Header.propTypes = {
  onPrevMonth: T.func.isRequired,
  currentMonth: T.instanceOf(Date).isRequired,
  onNextMonth: T.func.isRequired,
  HeaderComponent: T.func,
  HeaderButtonComponent: T.func,
  headerDateFormat: T.string.isRequired,
  headerContainerStyle: T.any,
  headerTitleStyle: T.any,
  headerButtonStyle: T.any,
};

export default React.memo(Header);
