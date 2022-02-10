import {StyleSheet} from 'react-native';
import {COLORS} from '../../resources/constants';

export const styles = StyleSheet.create({
  containers: {
    height: '100%',
    width: '100%',
  },
  containt: {
    flex: 1,
    justifyContent: 'space-around',
    flexDirection: 'row',
    backgroundColor: COLORS.secondary,
  },
  searcInput: {
    flex: 1,
    color: COLORS.white,
    fontSize: 16,
  },
  flex_start_row: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignContent: 'center',
  },
  services_list: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 10,
    zIndex: -56,
  },
  viewInputAutocompletion: {
    // backgroundColor: COLORS.Gray6,
    backgroundColor: 'transparent',
    justifyContent: 'space-around',
    flexDirection: 'row',
    borderColor: '#DEDEDE',
    borderWidth: 1,
    paddingBottom: 10,
    borderRadius: 10,
  },
});
