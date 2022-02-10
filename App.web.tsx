import React, {useEffect, useRef, useState} from 'react';
import {I18nextProvider} from 'react-i18next';
import {SafeAreaView} from 'react-native';

import {Navigation} from './presentation/navigation';
import {reduxConnect} from './controllers/tamplete';
import {Loader} from './presentation/components/Loader';

import {AppLanguage} from './presentation/resources/i18n';

export const App = props => {
  const navigationRef = useRef<any | null>(null);
  const [refreshing, setRefreshing] = useState(true);

  useEffect(() => {
    init();
  }, []);

  const init = () => {
    const {getParametres, getAllCategorie} = props;
    setRefreshing(true);
    getParametres(
      {},
      () => {
        getAllCategorie({}, () => setRefreshing(false));
      },
      '?site__url=' + window.location.hostname,
    );
  };

  if (refreshing) {
    return <Loader />;
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <I18nextProvider i18n={AppLanguage.i18n}>
        <Navigation refNavigation={navigationRef} />
      </I18nextProvider>
    </SafeAreaView>
  );
};

export default reduxConnect(App);
