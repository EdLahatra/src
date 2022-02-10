import React from 'react';
import {View, Text} from 'react-native';

import {ButtonComponent} from '../Inputs/Button';
// import {styles} from './styles';

export const ComparerTotal = ({widthScreen, prix_pluss, offre}) => {
  return (
    <View
      style={{
        justifyContent: 'space-around',
        flexDirection: 'row',
        borderColor: '#dedede',
        borderWidth: 1,
        borderRadius: 10,
        marginVertical: 20,
        padding: 10,
        backgroundColor: 'rgba(237,235,235,.2)',
      }}>
      <View style={{width: widthScreen / 5}}>
        <View style={{}}>
          <Text>Total</Text>
          <Text>{'  '}</Text>
        </View>
      </View>
      {offre.map(({prix, _id}, key) => (
        <View
          key={key}
          style={{
            width: widthScreen / 4,
            borderLeftColor: 'black',
            borderLeftWidth: 1,
          }}>
          <View>
            <Text>
              {Number(prix) + (prix_pluss[_id] ? Number(prix_pluss[_id]) : 0)}{' '}
              $US
            </Text>
          </View>
          <ButtonComponent title="Sélectionner" onPress={() => {}} />
        </View>
      ))}
    </View>
  );
};
