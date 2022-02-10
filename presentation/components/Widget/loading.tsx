import React from 'react';
import {View, ActivityIndicator} from 'react-native';

export default (props: any) => {
  const {size} = props;
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <ActivityIndicator size={size || 'large'} color={'red'} />
    </View>
  );
};
