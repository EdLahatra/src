import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {COLORS} from '../../resources/constants';

import {styles} from './styles';

export const ItemDelai = ({
  widthScreen,
  dateRealisation,
  prix_plus,
  dateRealisation1,
  setPrix_plus,
  prix_pluss,
  _id,
}) => {
  const [radio, setRadio] = useState(0);

  return (
    <View style={{width: widthScreen, alignItems: 'center'}}>
      {[dateRealisation, dateRealisation1].map((item, key) => (
        <View
          style={{justifyContent: 'flex-start', flexDirection: 'row'}}
          key={key}>
          <View style={styles.radioView}>
            <TouchableOpacity
              onPress={() => {
                setRadio(key);
                if (key === 0) {
                  setPrix_plus({...prix_pluss, [_id]: 0});
                } else {
                  setPrix_plus({...prix_pluss, [_id]: prix_plus});
                }
              }}>
              <View
                style={{
                  borderRadius: 50,
                  width: 14,
                  height: 14,
                  backgroundColor: radio === key ? COLORS.primary : 'white',
                }}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              alignSelf: 'center',
              alignItems: 'center',
              margin: 5,
            }}>
            <Text>{item} jours</Text>
          </View>
        </View>
      ))}
      <Text>{`(${prix_plus}+ $US)`}</Text>
    </View>
  );
};
