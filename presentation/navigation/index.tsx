import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
// import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Platform} from 'react-native';
import {Loader} from '../components/Loader';

import {HomeScreen, InscriptionScreen, LoginScreen} from '../screens';
import './GestureHandler';

const title = (text: string) => Platform.select({web: text, default: text});

export type StackParams = {
  HomeScreen: undefined;
  LoginScreen: undefined;
  MotdepasseOublieScreen: undefined;
  InscriptionScreen: {id: string} | undefined;
  Profil: undefined;
};

const config = {
  screens: {
    HomeScreen: {
      path: '/accueil',
    },
    LoginScreen: {
      path: '/connexion',
    },
    MotdepasseOublieScreen: {
      path: '/forget_password',
    },
    InscriptionScreen: {
      path: '/inscription',
    },
    Profil: {
      path: '/profil',
    },
  },
};

const linking = {
  prefixes: ['fullstack://app'],
  config,
};

// const Stack = createStackNavigator<StackParams>();

const Drawer = createDrawerNavigator();

export function Navigation(props: any) {
  const {refNavigation} = props;
  return (
    <NavigationContainer
      ref={refNavigation}
      linking={linking}
      fallback={<Loader />}>
      <Drawer.Navigator
        // initialRouteName={user ? LoginScreen : HomeScreen}
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
        }}
        drawerStyle={{width: 310}}>
        <Drawer.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{title: title('Accueil')}}
        />
        <Drawer.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{title: title('Connexion')}}
        />
        {/* <Drawer.Screen
          name="MotdepasseOublieScreen"
          component={MotdepasseOublieScreen}
          options={{ title: title('Mot de passe oublié') }}
        /> */}
        <Drawer.Screen
          name="InscriptionScreen"
          component={InscriptionScreen}
          options={{title: title('Inscription')}}
        />
        {/* <Drawer.Screen
          name="Profil"
          component={ProfilScreen}
          options={{ title: title('Profil') }}
        /> */}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
