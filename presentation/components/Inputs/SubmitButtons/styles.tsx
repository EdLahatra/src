import {StyleSheet, Dimensions, Platform} from 'react-native';

const windowDim = Dimensions.get('window').width;

export default StyleSheet.create({
  displayHorizontal: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    maxWidth: windowDim * 0.2,
  },
  displayHorizontalSubmit: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: Platform.OS === 'web' ? 0 : 30,
  },
});
