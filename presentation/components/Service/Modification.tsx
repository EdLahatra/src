import React from 'react';
import {View, Text} from 'react-native';

export const Modification = ({widthScreen, offre, title, attribut}) => {
  return (
    <View
      style={{
        justifyContent: 'space-around',
        flexDirection: 'row',
      }}>
      <View
        style={{
          width: widthScreen / 5,
          alignItems: 'center',
          // flex: 1,
          alignSelf: 'center',
        }}>
        <Text>{title}</Text>
      </View>

      {offre.map(item => (
        <View
          key={item?._id}
          style={{width: widthScreen / 4, alignItems: 'center'}}>
          <Text>{item[attribut]}</Text>
        </View>
      ))}
    </View>
  );
};
