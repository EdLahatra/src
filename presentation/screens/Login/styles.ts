import {StyleSheet} from 'react-native';
import {COLORS} from '../../resources/constants';

export const styles = ({width, height}) =>
  StyleSheet.create({
    containers: {
      backgroundColor: COLORS.Gray6,
      width,
      height,
    },
  });
