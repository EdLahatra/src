import React, {useState} from 'react';
import {ScrollView, View, Dimensions} from 'react-native';
import {formsStyles} from '../../formStyles';

type Props = {
  children?: any;
  type?: string;
};

export function PageContainerWithoutSidebar({children}: Props) {
  let windowDim = Dimensions.get('window').width;

  const [widthScreen, setWidthScreen] = useState(windowDim);
  const changeWidth = () => {
    setWidthScreen(Dimensions.get('window').width);
  };
  Dimensions.addEventListener('change', changeWidth);

  return (
    <View style={{backgroundColor: '#fff'}}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        style={[formsStyles.realFlex]}>
        <View style={formsStyles.webformContain}>
          <View
            style={[
              {maxWidth: widthScreen > 991 ? 991 : '100%'},
              formsStyles.formContainWithoutSidebar,
            ]}>
            {children}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
