import React from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';

import {FONTS, toUri, COLORS, icons} from '../../resources/constants';

export const Item = ({title}) => {
  return (
    <View style={{padding: 10, paddingTop: 15, backgroundColor: COLORS.Gray6}}>
      <Text style={{...FONTS.h2}}>{title}</Text>
    </View>
  );
};

export const ItemList = ({title, icon, onPress = () => {}}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          borderTopWidth: 1,
          borderBottomWidth: 1,
          borderColor: COLORS.Gray6,
          padding: 10,
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}>
        <View
          style={{
            borderColor: COLORS.Gray6,
            justifyContent: 'flex-start',
            flexDirection: 'row',
          }}>
          <Image
            source={icon}
            resizeMode="contain"
            style={{
              width: 20,
              height: 20,
              marginRight: 10,
            }}
          />
          <Text style={{...FONTS.h4}}>{title}</Text>
        </View>
        <View
          style={{
            justifyContent: 'flex-start',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Image
            source={toUri(icons.stroke1)}
            style={{
              width: 1,
              height: 14,
              transform: [{rotate: '90deg'}],
              borderWidth: 1.5,
              borderColor: COLORS.Gray6,
              opacity: 0.4,
              tintColor: 'black',
            }}
          />
          <Image
            source={toUri(icons.stroke3)}
            style={{width: 6, height: 12, tintColor: 'black'}}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};
