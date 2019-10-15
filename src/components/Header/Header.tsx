import * as dateFns from 'date-fns';
import * as React from 'react';
import {
  StyleProp,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {
  HeaderButton,
  HeaderButtonComponentProps,
} from './HeaderButton';
import { s } from './styles';

export interface HeaderComponentProps {
  currentMonth: string;
  onPrevMonth(): void;
  onNextMonth(): void;
}

export interface HeaderProps {
  headerDateFormat: string;
  headerContainerStyle?: StyleProp<ViewStyle>;
  headerTitleStyle?: StyleProp<TextStyle>;
  headerButtonStyle?: StyleProp<ViewStyle>;
  HeaderComponent?: React.FunctionComponent<HeaderComponentProps> | null;
  HeaderButtonComponent?: React.FunctionComponent<HeaderButtonComponentProps> | null;

}

interface HeaderPrivateProps extends HeaderProps {
  currentMonth: Date;
  onPrevMonth(): void;
  onNextMonth(): void;
}

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
}: HeaderPrivateProps) {
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
        <Text style={[s.headerTitle, headerTitleStyle]}>{month}</Text>
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

const HeaderMemo = React.memo(Header);

export { HeaderMemo as Header };
