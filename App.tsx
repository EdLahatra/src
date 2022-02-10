import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {enableScreens} from 'react-native-screens';
import SplashScreen from 'react-native-splash-screen';

import Tabs from './presentation/navigation/tabs';
import IntroScreen from './presentation/screens/IntroScreen';

import mapDispatchToProps from './services/redux/mapDispatchToProps';
import mapStateToProps from './services/redux/mapStateToProps';
import {Loader} from './presentation/components/Loader';

const Stack = createStackNavigator();

export type LoginStackParams = {
  LoginScreen: undefined;
  Register: undefined;
};

const App = props => {
  const [refreshing, setRefreshing] = useState(true);
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  useEffect(() => {
    init();
  }, []);

  const init = () => {
    const {getParametres, getAllGuide} = props;
    setRefreshing(true);
    getAllGuide();
    getParametres(
      {},
      () => {
        setRefreshing(false);
      },
      '?site__url=' + 'localhost',
    );
  };

  if (refreshing) {
    return <Loader />;
  }

  if (props?.initial?.screen) {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName={'IntroScreen'}>
          <Stack.Screen name="IntroScreen" component={IntroScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={'Home'}>
        <Stack.Screen name="Home" component={Tabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

enableScreens(false);

export default connect(mapStateToProps, mapDispatchToProps)(App);
