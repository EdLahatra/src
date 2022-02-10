import {StyleSheet} from 'react-native';
import {COLORS} from '../../resources/constants';

export const styles = StyleSheet.create({
  containers: {},
  radioView: {
    borderRadius: 50,
    width: 22,
    height: 22,
    backgroundColor: 'white',
    borderColor: COLORS.secondary,
    borderWidth: 1,
    alignItems: 'center',
    alignSelf: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    color: 'black',
    fontWeight: 'bold',
    margin: 5,
  },
  flex_start_row: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignContent: 'center',
  },
});
