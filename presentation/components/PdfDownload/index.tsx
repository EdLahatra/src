import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';

interface Props {
  primaryTitle?: string;
  actionPrimaryTitle?: any;
}

export const PdfDownload = ({primaryTitle, actionPrimaryTitle}: Props) => {
  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <TouchableOpacity
        style={{
          borderRadius: 8,
          backgroundColor: '#338554',
          marginTop: 16,
          marginBottom: 30,
          paddingHorizontal: 30,
          paddingVertical: 10,
          flexDirection: 'row',
          height: 56,
          shadowOffset: {width: 2, height: 6},
          shadowColor: '#338554',
          shadowOpacity: 0.3,
          shadowRadius: 16,
          elevation: 4,
        }}
        onPress={actionPrimaryTitle}>
        <Image
          source={require('../../../ressources/images/icon-pdf.png')}
          style={{width: 24, height: 24, marginTop: 4}}
        />
        <Text
          style={{
            fontSize: 16,
            lineHeight: 32,
            color: '#FFFFFF',
            fontFamily: 'Arial',
            paddingLeft: 14,
          }}>
          {primaryTitle}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
