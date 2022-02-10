import React from 'react';
import {Animated, View} from 'react-native';

export const renderDotsView = (array, position) => {
  return (
    <View style={{flexDirection: 'row'}}>
      {array.map((_, i) => {
        let opacity = position.interpolate({
          inputRange: [i - 1, i, i + 1],
          outputRange: [0.3, 1, 0.3],
          extrapolate: 'clamp',
        });
        return (
          <Animated.View
            key={i}
            style={{
              opacity,
              height: 5,
              width: 5,
              backgroundColor: '#595959',
              margin: 2,
              borderRadius: 5,
            }}
          />
        );
      })}
    </View>
  );
};
