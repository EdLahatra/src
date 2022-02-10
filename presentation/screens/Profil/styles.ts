import {StyleSheet} from 'react-native';
import {COLORS} from '../../resources/constants';

export const styles = StyleSheet.create({
  containers: {
    height: '100%',
    width: '100%',
  },
  containt: {
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: COLORS.secondary,
  },
  isMobile: {
    backgroundColor: COLORS.Gray6,
    padding: 20,
    borderRadius: 8,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.6,
    shadowRadius: 8,
  },
});
