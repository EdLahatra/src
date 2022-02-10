import React from 'react';
import {View, Image, Text} from 'react-native';

import {detectUrl} from '../../../services/technique/utils';
import {useWidthHeight} from '../../../hooks/dimension';
import {images, toUri, COLORS} from '../../resources/constants';
import {styles} from './styles';

export const ItemCategorie = ({id, nom, imageUrl, selected}) => {
  const {width} = useWidthHeight();
  const image =
    imageUrl && imageUrl.length > 10 ? detectUrl(imageUrl) : toUri(images.hero);
  const dWidth = width > 1140 ? 1000 : width;
  return (
    <View
      key={id}
      style={[
        styles.containers,
        {
          backgroundColor: selected?.id === id ? COLORS.primary : COLORS.Gray6,
        },
      ]}>
      <View style={{margin: width > 1140 ? 0 : 10}}>
        <Image
          source={image}
          style={{
            width: dWidth / 6,
            height: dWidth / 7,
            borderRadius: 10,
          }}
        />
      </View>
      <View
        style={[
          styles.itemView,
          {
            width: dWidth / 6,
            height: width > 1140 ? 60 : 40,
          },
        ]}>
        <Text style={styles.itemNom} numberOfLines={2}>
          {nom}
        </Text>
      </View>
    </View>
  );
};
