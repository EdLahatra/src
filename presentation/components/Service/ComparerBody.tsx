import React from 'react';
import {View, Text, Image} from 'react-native';
import {icons, toUri} from '../../resources/constants';

export const ComparerBody = ({widthScreen, title, offre, _id}) => {
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

      {offre.map(({items}, key) => {
        const isOk = items.find(item => item?._id === _id);
        return (
          <View
            key={key}
            style={{width: widthScreen / 4, alignItems: 'center'}}>
            {isOk ? (
              <Image
                source={toUri(icons.ok)}
                resizeMode="contain"
                style={{
                  width: 40,
                  height: 40,
                }}
              />
            ) : (
              <View />
            )}
          </View>
        );
      })}
    </View>
  );
};
