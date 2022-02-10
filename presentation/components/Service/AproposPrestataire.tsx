import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity, Image, FlatList} from 'react-native';

import {ButtonComponent} from '../Inputs/Button';
import {icons, images, toUri} from '../../resources/constants';

import {styles} from './styles';
import {DateToddmmyyyyFormat} from '../../../data/factory/dateFactory';

const Item = ({title, value}) => {
  return (
    <View style={{flex: 1, margin: 10}}>
      <Text>{title}</Text>
      <Text>{value}</Text>
    </View>
  );
};

const ItemList = ({items}) => {
  return (
    <View
      style={{justifyContent: 'space-between', flexDirection: 'row', flex: 1}}>
      {items?.map((item, key) => (
        <Item key={key} {...item} />
      ))}
    </View>
  );
};

export const AproposPrestataire = ({prestataire, prestataire_categories}) => {
  useEffect(() => {}, []);

  const categories = Array.isArray(prestataire_categories)
    ? prestataire_categories
    : [];

  const logo =
    prestataire?.logo?.length > 0
      ? {uri: prestataire?.logo}
      : toUri(images.picture);

  return (
    <View>
      <View style={styles.flex_start_row}>
        <View
          style={{
            marginRight: 10,
            justifyContent: 'flex-start',
            flexDirection: 'row',
          }}>
          <TouchableOpacity onPress={() => {}}>
            <Image
              source={logo}
              resizeMode="contain"
              style={{
                width: 70,
                height: 70,
                borderRadius: 50,
              }}
            />
          </TouchableOpacity>
          <View
            style={{
              margin: 5,
              marginLeft: 10,
              justifyContent: 'flex-start',
            }}>
            <Text>{prestataire?.nom}</Text>
            <Text>{prestataire?.citation}</Text>
            <View style={styles.flex_start_row}>
              {[1, 2, 3, 4, 5].map(key => (
                <Image
                  key={key}
                  source={toUri(icons.star)}
                  resizeMode="contain"
                  style={{
                    width: 20,
                    height: 20,
                    marginLeft: 8,
                  }}
                />
              ))}
            </View>
            <ButtonComponent title="Me contacter" onPress={() => {}} />
          </View>
        </View>
      </View>
      <View>
        <View style={{marginBottom: 20}}>
          <Text style={{fontFamily: 'Roboto', fontSize: 18, fontWeight: '600'}}>
            QUALIFIE Pro
          </Text>
        </View>
        <View style={{flex: 1}}>
          <FlatList
            horizontal={false}
            numColumns={3}
            data={categories}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <View
                style={{
                  flex: 1,
                  flexDirection: 'column',
                }}>
                <Text style={{padding: 10, fontSize: 18, height: 44}}>
                  {item.nom}
                </Text>
              </View>
            )}
          />
        </View>
        <View style={{borderWidth: 1, borderColor: '#dedede'}}>
          <ItemList
            items={[
              {title: 'De', value: prestataire?.pays_origine},
              {
                title: 'Membre depuis',
                value: DateToddmmyyyyFormat(
                  prestataire?.dateCreation
                    ? new Date(prestataire?.dateCreation)
                    : new Date(),
                ),
              },
            ]}
          />
          <ItemList
            items={[
              {title: 'Temps de réponse moyen', value: '1 heure'},
              {title: 'Dernière commande', value: '4 jours'},
            ]}
          />
          <View style={{margin: 10}}>
            <Text>{prestataire?.presentation}</Text>
            {/* <Text>Je m'appelle Anna. Je suis graphiste et calligraphe.</Text> */}
          </View>
        </View>
      </View>
    </View>
  );
};
