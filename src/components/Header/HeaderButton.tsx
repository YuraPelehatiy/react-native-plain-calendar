import * as React from 'react';
import { StyleProp, Text, View, ViewStyle } from 'react-native';
import { Touchable } from '../Touchable/Touchable';
import { s } from './styles';

export interface HeaderButtonComponentProps {
  type: 'prev' | 'next';
  onPress(): void;
}

export interface HeaderButtonProps
  extends HeaderButtonComponentProps {
  children:
    | React.ReactElement
    | React.ReactElement[]
    | React.ReactChildren
    | React.ReactChildren[]
    | string
    | string[];
  headerButtonStyle: StyleProp<ViewStyle>;
  HeaderButtonComponent?: React.FunctionComponent<HeaderButtonComponentProps> | null;
}

export function HeaderButton({
  type,
  onPress,
  children,
  headerButtonStyle,
  HeaderButtonComponent,
}: HeaderButtonProps) {
  if (HeaderButtonComponent) {
    return <HeaderButtonComponent onPress={onPress} type={type} />;
  }

  const isNext = type === 'next';

  return (
    <View
      style={[
        s.headerContainers,
        isNext ? s.headerNextButton : s.headerPrevButton,
      ]}
    >
      <Touchable onPress={onPress} style={headerButtonStyle}>
        <Text>{children}</Text>
      </Touchable>
    </View>
  );
}
