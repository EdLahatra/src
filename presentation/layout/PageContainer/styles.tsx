import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  containers: {
    backgroundColor: '#fff',
    width: '100%',
  },
  realFlex: {
    // flex: Platform.OS === 'web' ? 1 : 0,
  },
  webformContain: {
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
    // marginBottom: Platform.OS === 'web' ? 0 : '25%',
    flex: 1,
  },
  v2: {
    width: '100%',
  },
});
