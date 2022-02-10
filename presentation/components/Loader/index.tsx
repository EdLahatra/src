import React from 'react';
import {View, ActivityIndicator, Platform, Dimensions} from 'react-native';
import {COLORS} from '../../resources/constants';

export function Loader() {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignContent: 'center',
        alignSelf: 'center',
        backgroundColor: COLORS.secondary,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
      }}>
      <ActivityIndicator
        size="large"
        color={COLORS.primary}
        style={{padding: Platform.OS === 'web' ? 32 : 10, flex: 1, flexGrow: 1}}
      />
    </View>
  );
}
