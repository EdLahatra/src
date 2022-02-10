import React from 'react';
import {View} from 'react-native';
import {formsStyles} from '../../formStyles';
import {HeaderScreen} from '../../components/HeaderScreen';

type Props = {
  children?: any;
  type?: string;
};

export function PageFullContainer({children}: Props) {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'visible',
      }}>
      <HeaderScreen />
      {/* <ScrollView keyboardShouldPersistTaps='handled' > */}
      <View style={formsStyles.webformContainFull}>
        <View style={[formsStyles.formContainFull]}>{children}</View>
      </View>
      {/* </ScrollView> */}
    </View>
  );
}
