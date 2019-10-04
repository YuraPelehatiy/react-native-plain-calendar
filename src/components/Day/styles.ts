import { StyleSheet } from 'react-native';
import { colors } from '../../styles';

export const s = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  day: {
    paddingVertical: 10,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  number: {
    color: colors.day.text,
  },
  disabledNumber: {
    color: colors.day.disabledText,
  },
  today: {
    borderRadius: 20,
    borderColor: colors.day.selected,
    borderWidth: 1,
    width: 40,
    height: 40,
    alignSelf: 'center',
  },
  selected: {
    borderWidth: 0,
    borderRadius: 0,
    backgroundColor: colors.day.selected,
    height: 40,
    width: '100%',
    alignSelf: 'stretch',
  },
  singleSelected: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.day.selected,
    alignSelf: 'center',
  },
  startSelected: {
    height: 40,
    borderTopStartRadius: 20,
    borderBottomStartRadius: 20,
    backgroundColor: colors.day.selected,
  },
  endSelected: {
    height: 40,
    borderTopEndRadius: 20,
    borderBottomEndRadius: 20,
    backgroundColor: colors.day.selected,
  },
});
