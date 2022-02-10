import React from 'react';
import {Text, TouchableOpacity, View, Image} from 'react-native';
import {formsStyles} from '../../../formStyles';

interface Props {
  onPress: any;
  title: string;
  type?: string;
  date: Date;
  error?: any;
  showError?: any;
  todayDate?: boolean;
  isEditable?: boolean;
}
export default ({
  onPress,
  title,
  type,
  error,
  showError,
  todayDate,
  isEditable,
}: Props) => {
  if (!todayDate) {
    return (
      <TouchableOpacity
        onPress={(e: any) => {
          e.preventDefault();
          onPress(type);
        }}
        style={[
          formsStyles.itemInputStyle,
          showError && error !== '' && formsStyles.inputError,
          {
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingHorizontal: 16,
          },
          {
            backgroundColor: !isEditable
              ? '#ffffff'
              : 'rgba(240, 244, 248, 0.87)',
          },
        ]}>
        <Text>{title}</Text>
        <Image
          style={[formsStyles.dateIcon, {position: 'absolute', right: 20}]}
          source={require('../../../../ressources/images/date.png')}
        />
      </TouchableOpacity>
    );
  }
  return (
    <View>
      <TouchableOpacity
        onPress={(e: any) => {
          e.preventDefault();
          onPress(type);
        }}
        style={[
          formsStyles.itemInputStyle,
          {
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingHorizontal: 16,
          },
          {
            backgroundColor: !isEditable
              ? '#ffffff'
              : 'rgba(240, 244, 248, 0.87)',
          },
        ]}>
        <Text>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};
