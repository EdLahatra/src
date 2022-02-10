import {useEffect, useState} from 'react';
import {Dimensions} from 'react-native';

let w = Dimensions.get('window').width;
let h = Dimensions.get('window').height;

export const useDimensions = () => {
  const [screenWidth, updateScreenWidth] = useState(w);
  const [screenHeight, updateScreenHeight] = useState(h);
  const changeDimensions = () => {
    updateScreenWidth(Dimensions.get('window').width);
    updateScreenHeight(Dimensions.get('window').height);
  };
  useEffect(() => {
    Dimensions.addEventListener('change', changeDimensions);
    return () => {
      Dimensions.removeEventListener('change', changeDimensions);
    };
  }, []);
  return [screenWidth, screenHeight];
};
