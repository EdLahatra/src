import {StyleSheet} from 'react-native';
import {COLORS} from '../../resources/constants';

export const styles = ({width, height, isWeb}) =>
  StyleSheet.create({
    containers: {
      backgroundColor: COLORS.Gray6,
      width,
      height,
    },
    v1: {
      justifyContent: 'space-between',
      flexDirection: 'column',
      flex: 1,
      backgroundColor: '#ffffff',
    },
    center: {
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
    },
    centerLogin: {
      backgroundColor: '#f2f2f2',
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      height: '100%',
    },
    viewCategorieList: {
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignContent: 'center',
      alignItems: 'center',
      width: !isWeb ? width : 1140,
      // paddingTop: 80,
      // height: '100%',
    },
    containImg: {
      width: '40%',
      flex: 1,
      alignItems: 'center',
    },
    containForm: {
      // backgroundColor: 'green',
      // marginTop: 40,
      // flex: 1,
      width: '60%',
      height: '100%',
      paddingHorizontal: 60,
      // flexDirection: 'column',
      justifyContent: 'space-between',
    },
    containerModal: {
      margin: width > 767 ? 100 : 20,
      paddingHorizontal: width > 767 ? 100 : 20,
      width: width > 767 ? 'calc(100% - 100px)' : 'calc(100% - 80px)',
      paddingVertical: width > 767 ? 100 : 40,
      height: 'calc(100vh - 200px)',
      maxWidth: 500,
      flex: 1,
      justifyContent: 'flex-start',
      alignSelf: 'center',
      backgroundColor: 'white',
      borderRadius: 20,
    },
  });
