import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {
  createBottomTabNavigator,
  BottomTabBar,
} from '@react-navigation/bottom-tabs';
import Svg, {Path} from 'react-native-svg';

import {
  HomeScreen,
  LoginScreen,
  RegisterScreen,
  ProfilScreen,
  CategorieScreen,
  ServiceScreen,
} from '../screens';

import {COLORS, icons, images} from '../resources/constants';
import {createStackNavigator} from '@react-navigation/stack';

const Tab = createBottomTabNavigator();

export type LoginStackParams = {
  LoginScreen: undefined;
  RegisterScreen: undefined;
};

const LoginStack = createStackNavigator<LoginStackParams>();

const LoginStackScreen = () => {
  return (
    <LoginStack.Navigator>
      <LoginStack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{header: () => <View />}}
      />
      <LoginStack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{header: () => <View />}}
      />
    </LoginStack.Navigator>
  );
};

export type CategorieStackParams = {
  CategorieScreen: undefined;
  ServiceScreen: undefined;
};

const CategorieStack = createStackNavigator<CategorieStackParams>();

const CategorieStackScreen = () => {
  return (
    <CategorieStack.Navigator>
      <CategorieStack.Screen
        name="CategorieScreen"
        component={CategorieScreen}
        options={{header: () => <View />}}
      />
      <CategorieStack.Screen
        name="ServiceScreen"
        component={ServiceScreen}
        options={{header: () => <View />}}
      />
    </CategorieStack.Navigator>
  );
};

export type ServiceStackParams = {
  ServiceScreen: {id: string} | undefined;
};

const ServiceStack = createStackNavigator<ServiceStackParams>();

const ServiceStackScreen = () => {
  return (
    <ServiceStack.Navigator>
      <ServiceStack.Screen
        name="ServiceScreen"
        component={ServiceScreen}
        options={{header: () => <View />}}
      />
      {/* <LoginStack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{header: () => <View />}}
      /> */}
    </ServiceStack.Navigator>
  );
};

export type HomeStackParams = {
  HomeScreen: undefined;
  LoginScreen: undefined;
  RegisterScreen: undefined;
  Profil: undefined;
  CategorieScreen: undefined;
  ServiceStackScreen: undefined;
};

const HomeStack = createStackNavigator<HomeStackParams>();

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{header: () => <View />}}
      />
      <HomeStack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{header: () => <View />}}
      />
      <HomeStack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{header: () => <View />}}
      />
      <HomeStack.Screen
        name="Profil"
        component={ProfilScreen}
        options={{header: () => <View />}}
      />
      <HomeStack.Screen
        name="ServiceStackScreen"
        component={ServiceStackScreen}
        options={{header: () => <View />}}
      />
      {/* <HomeStack.Screen
        name="Maps"
        component={HomeScreen}
        options={{header: () => <View />}}
      /> */}
    </HomeStack.Navigator>
  );
};

const TabBarCustomButton = ({accessibilityState, children, onPress}) => {
  var isSelected = accessibilityState.selected;

  if (isSelected) {
    return (
      <View style={{flex: 1, alignItems: 'center'}}>
        <View style={{flexDirection: 'row', position: 'absolute', top: 0}}>
          <View style={{flex: 1, backgroundColor: COLORS.white}} />
          <Svg width={75} height={61} viewBox="0 0 75 61">
            <Path
              d="M75.2 0v61H0V0c4.1 0 7.4 3.1 7.9 7.1C10 21.7 22.5 33 37.7 33c15.2 0 27.7-11.3 29.7-25.9.5-4 3.9-7.1 7.9-7.1h-.1z"
              fill={COLORS.white}
            />
          </Svg>
          <View style={{flex: 1, backgroundColor: COLORS.white}} />
        </View>

        <TouchableOpacity
          style={{
            top: -22.5,
            justifyContent: 'center',
            alignItems: 'center',
            width: 50,
            height: 50,
            borderRadius: 25,
            backgroundColor: COLORS.white,
          }}
          onPress={onPress}>
          {children}
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <TouchableOpacity
        style={{
          flex: 1,
          height: 60,
          backgroundColor: COLORS.white,
        }}
        activeOpacity={1}
        onPress={onPress}>
        {children}
      </TouchableOpacity>
    );
  }
};

const CustomTabBar = props => {
  //if (isIphoneX()) {
  return (
    <View>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 30,
          //backgroundColor: COLORS.white
        }}
      />
      <BottomTabBar {...props.props} />
    </View>
  );
  //} else {
  //  <BottomTabBar {...props.props} />
  //}
};

const Tabs = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        style: {
          borderTopWidth: 0,
          backgroundColor: 'transparent',
          elevation: 0,
        },
      }}
      tabBar={props => <CustomTabBar props={props} />}>
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={icons.home}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? COLORS.primary : COLORS.secondary,
              }}
            />
          ),
          tabBarButton: (props: any) => <TabBarCustomButton {...props} />,
        }}
      />
      <Tab.Screen
        name="Search"
        component={CategorieStackScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={icons.search}
              resizeMode="contain"
              style={{
                width: 20,
                height: 20,
                tintColor: focused ? COLORS.primary : COLORS.secondary,
              }}
            />
          ),
          tabBarButton: (props: any) => <TabBarCustomButton {...props} />,
        }}
      />
      <Tab.Screen
        name="Like"
        component={HomeStackScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={icons.like}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? COLORS.primary : COLORS.secondary,
              }}
            />
          ),
          tabBarButton: (props: any) => <TabBarCustomButton {...props} />,
        }}
      />
      <Tab.Screen
        name="Message"
        component={LoginStackScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={images.message}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? COLORS.primary : COLORS.secondary,
              }}
            />
          ),
          tabBarButton: (props: any) => <TabBarCustomButton {...props} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
