import React from 'react';
import { View, Text } from 'react-native';
import T from 'prop-types';
import Touchable from '../Touchable/Touchable';
import s from './styles';

function HeaderButton({
  type,
  onPress,
  children,
  headerButtonStyle,
  HeaderButtonComponent,
}) {
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

HeaderButton.propTypes = {
  type: T.oneOf(['prev', 'next']).isRequired,
  onPress: T.func.isRequired,
  children: T.any,
  headerButtonStyle: T.any,
  HeaderButtonComponent: T.func,
};

export default HeaderButton;
