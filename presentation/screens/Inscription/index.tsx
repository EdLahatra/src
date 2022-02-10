import React, {useState} from 'react';
import {View, Dimensions} from 'react-native';
import {connect} from 'react-redux';

import mapDispatchToProps from '../../../services/redux/mapDispatchToProps';
import mapStateToProps from '../../../services/redux/mapStateToProps';

export const Inscription = (_props: any) => {
  const [width, setWidth] = useState(Dimensions.get('window').width);
  const screenWidth = () => {
    setWidth(Dimensions.get('window').width);
  };
  Dimensions.addEventListener('change', screenWidth);

  const [height, setHeight] = useState(Dimensions.get('window').height);
  const screenHeight = () => {
    setHeight(Dimensions.get('window').height);
  };
  Dimensions.addEventListener('change', screenHeight);

  return <View style={{maxWidth: width, height: height}} />;
};

export const InscriptionScreen: any = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Inscription);
