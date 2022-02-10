import {
  Dimensions,
  ScaledSize,
  // useWindowDimensions,
  Platform,
} from 'react-native';

// export const responsiveObserver = (props: any) => {
//   const dim = useWindowDimensions()

//   const getDim = () => dim
//   return getDim()
// }

export const getColNumbers = (windowDim: ScaledSize) => {
  // console.log('WINDOW',windowDim )
  if (windowDim.width <= 380) {
    return 2;
  }
  if (windowDim.width <= 576) {
    return 2;
  }
  if (
    windowDim.width > 576 &&
    windowDim.width <= 768 &&
    Platform.OS === 'web'
  ) {
    return 3;
  }
  if (
    windowDim.width > 768 &&
    windowDim.width <= 1024 &&
    Platform.OS === 'web'
  ) {
    return 4;
  }
  if (windowDim.width > 1024 && Platform.OS === 'web') {
    return 4;
  }
  return 2;
};
export const getMinHeightImage = () => {
  // let windowDim = responsiveObserver() ;
  let windowDim = Dimensions.get('window');
  if (windowDim.width <= 576) {
    return 160;
  }
  if (windowDim.width > 576 && windowDim.width <= 768) {
    return 240;
  }
  if (windowDim.width > 768 && windowDim.width <= 1024) {
    return 320;
  }
  if (windowDim.width > 1024) {
    return 400;
  }
  return 160;
};
