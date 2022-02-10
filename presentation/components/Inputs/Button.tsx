import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import {FONTS, COLORS} from '../../resources/constants';

interface Props {
  onPress: any;
  title: string;
  type?: string;
  styleBtnTxt?: any;
  styleBtnOuter?: any;
  loading?: boolean;
}

const styles = StyleSheet.create({
  textBtnSearch: {
    ...FONTS.body3,
    color: COLORS.white,
    fontSize: 18,
    lineHeight: 14,
  },
  vInputbtn: {
    backgroundColor: COLORS.primary,
    margin: 8,
    borderRadius: 8,
    // shadowOffset: {
    //   width: 4,
    //   height: 4,
    // },
    // shadowOpacity: 0.2,
    // shadowRadius: 8,
    // elevation: 6,
    alignItems: 'center',
    maxWidth: 230,
  },
});

export const ButtonComponent = ({onPress, title, loading}: Props) => (
  <View style={styles.vInputbtn}>
    {loading ? (
      <ActivityIndicator
        color={'red'}
        size={'large'}
        style={{flex: 1, padding: 10}}
      />
    ) : (
      <TouchableOpacity
        onPress={onPress}
        style={{flex: 1, padding: 16, maxHeight: 50}}>
        <Text style={styles.textBtnSearch}>{title}</Text>
      </TouchableOpacity>
    )}
  </View>
);
