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
  flex_start_row: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignContent: 'center',
  },
  title: {
    fontSize: 24,
    color: COLORS.primary,
    fontWeight: 'bold',
    marginHorizontal: 5,
    marginVertical: 10,
    fontFamily: 'Roboto',
  },
});
