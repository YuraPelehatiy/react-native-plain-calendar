import React from 'react';
import { TouchableOpacity } from 'react-native';
import T from 'prop-types';

function Touchable({ children, ...props }) {
  return <TouchableOpacity {...props}>{children}</TouchableOpacity>;
}

Touchable.propTypes = {
  children: T.any,
};

export default Touchable;
