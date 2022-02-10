import React, {useEffect} from 'react';
import {View, Text} from 'react-native';

import {styles} from './styles';

export const ComparerTitle = ({widthScreen, offre}) => {
  useEffect(() => {}, []);
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
          <Text>Offre</Text>
          <Text>{'  '}</Text>
        </View>
      </View>
      {offre.map(({type, description, prix, autre_description}, key) => (
        <View
          key={key}
          style={{
            width: widthScreen / 4,
            borderLeftColor: 'black',
            borderLeftWidth: 1,
          }}>
          <View style={{marginBottom: 10}}>
            <Text>{prix} $US</Text>
            <Text style={styles.title}>{type}</Text>
            <Text>{autre_description}</Text>
            <Text>{description}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};
