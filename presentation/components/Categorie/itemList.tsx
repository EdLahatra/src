import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import {useWidthHeight} from '../../../hooks/dimension';
import {styles} from './styles';

import {COLORS, icons, toUri} from '../../resources/constants';
import {useNavigation} from '@react-navigation/core';

export const ItemListCategorie = ({nom, description, goToServices}) => {
  const [refreshing, setRefreshing] = useState(false);
  const {width} = useWidthHeight();
  const {navigate} = useNavigation<any>();

  useEffect(() => {
    setRefreshing(false);
  }, [navigate]);

  return (
    <TouchableOpacity
      onPress={() => {
        setRefreshing(true);
        goToServices(() => setRefreshing(false));
      }}>
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          alignItems: 'flex-start',
          // backgroundColor: 'black',
        }}>
        <View
          style={[
            styles.itemList,
            {
              width: width > 1140 ? 'auto' : width - 20,
              height: width > 1140 ? 100 : width / 4,
              flexDirection: 'column',
              // alignItems: 'center',
            },
          ]}>
          <View>
            <Image
              source={{
                uri: 'https://res.cloudinary.com/dfgnibpuc/image/upload/v1638006917/profil/otyfllseqqshnwmasckp.jpg',
              }}
              style={{
                width: width > 1140 ? 238 : width / 2 - 20,
                height: width > 1140 ? 194 : width / 4,
                resizeMode: 'cover',
              }}
            />
          </View>
          <View style={{paddingTop: 10}}>
            <Text style={styles.itemListName}>{nom}</Text>
            <Text style={styles.itemListDescription}>{description}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 20,
              justifyContent: 'space-between',
            }}>
            <View style={{flexDirection: 'row', marginLeft: 14}}>
              {[1].map(key => (
                <Image
                  key={key}
                  source={toUri(icons.star)}
                  resizeMode="contain"
                  style={{
                    width: 16,
                    height: 16,
                  }}
                />
              ))}
              <Text style={styles.itemListFooterG}>(250)</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginLeft: 14,
                justifyContent: 'flex-end',
              }}>
              <Text style={styles.itemListFooter}>A partir de</Text>
              <Text style={styles.itemListFooterD}>100€</Text>
            </View>
          </View>
        </View>
        {refreshing && (
          <View
            style={{
              height: width > 1140 ? 194 : width / 4,
              width: width > 1140 ? 238 : width / 2 - 20,
              position: 'absolute',
              justifyContent: 'center',
              alignContent: 'center',
              flex: 1,
            }}>
            <ActivityIndicator size={'large'} color={COLORS.primary} />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};
