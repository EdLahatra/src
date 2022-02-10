import React from 'react';
import {ScrollView, View, SafeAreaView} from 'react-native';
import {HeaderScreen} from '../../components/HeaderScreen';
import {FooterScreen} from '../../components/FooterScreen';
import {Loader} from '../../components/Loader';

import {useWidthHeight} from '../../../hooks/dimension';
import {formsStyles} from '../../formStyles';
import {styles} from './styles';

type Props = {
  children?: any;
  type?: string;
  refresh?: any;
  title?: string;
  isNotHaveHeader?: boolean;
  refreshing?: boolean;
};

export function PageContainer({
  children,
  refresh,
  title,
  isNotHaveHeader,
  refreshing,
}: Props) {
  const {width, isMobile} = useWidthHeight();

  return (
    <SafeAreaView style={styles.containers}>
      {!isNotHaveHeader && <HeaderScreen title={title} />}
      <ScrollView
        keyboardShouldPersistTaps="handled"
        style={styles.realFlex}
        refreshControl={refresh}>
        {refreshing ? (
          <Loader />
        ) : (
          <View style={[styles.webformContain]}>
            <View
              style={[
                {
                  maxWidth: width > 1140 ? 1100 : '100%',
                  // backgroundColor: 'red',
                  // paddingLeft:
                  //   widthScreen < 1141 && Platform.OS === 'web' ? 120 : 16,
                },
                formsStyles.formContain,
              ]}>
              {children}
            </View>
          </View>
        )}
        {isMobile ? <View style={{flex: 1, height: 110}} /> : <FooterScreen />}
      </ScrollView>
    </SafeAreaView>
  );
}
