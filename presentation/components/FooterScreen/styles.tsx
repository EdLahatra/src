import {StyleSheet} from 'react-native';
import {COLORS, FONTS} from '../../resources/constants';

export const styles = StyleSheet.create({
  containers: {
    width: '100%',
    backgroundColor: COLORS.secondary,
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
    paddingBottom: 10,
  },
  v2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
    padding: 20,
  },
  v1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  item: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  tFooter: {
    color: COLORS.white,
    ...FONTS.h4,
  },
  tFooterContact: {
    color: COLORS.white,
    ...FONTS.body5,
  },
  tFooterLogo: {
    marginBottom: 14,
    color: COLORS.white,
    ...FONTS.h3,
  },
});
