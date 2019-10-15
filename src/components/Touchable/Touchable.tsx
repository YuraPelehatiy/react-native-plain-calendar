import * as React from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

export interface TouchableProps extends TouchableOpacityProps {
  children: React.ReactChildren | React.ReactElement;
}

export function Touchable({ children, ...props }: TouchableProps) {
  return <TouchableOpacity {...props}>{children}</TouchableOpacity>;
}
