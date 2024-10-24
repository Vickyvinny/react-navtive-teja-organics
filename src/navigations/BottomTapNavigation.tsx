import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {ReactNode} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Cart from '../screens/Cart';
import Category from '../screens/Category';

import {fonts} from '../constants/fonts';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import {colors} from '../utils/Colors';

const Tab = createBottomTabNavigator();

const BottomTapNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.white,
        tabBarInactiveTintColor: '#CDCDE0',
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: colors.white,
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          height:
            Platform.OS === 'android'
              ? responsiveHeight(10)
              : responsiveHeight(12),
          paddingHorizontal: 20,
          position: 'absolute',
        },
        headerShown: false,
        
      }} initialRouteName='Cart'>
      <Tab.Screen
        name="HomeScreen"
        options={{
          tabBarIcon: ({color, focused}) => (
            <IconContainer focused={focused} color={color} name={'Home'}>
              {focused ? (
                <Entypo name="home" size={23} color={color} />
              ) : (
                <Entypo name="home" size={23} color={color} />
              )}
            </IconContainer>
          ),
        }}>
        {props => <HomeScreen {...props} />}
      </Tab.Screen>

      <Tab.Screen
        name="Cart"
        options={{
          title: 'Shopping cart',
          headerShown: true,
          headerTitleAlign: 'center',
          headerShadowVisible: false,
          headerTitleStyle: {fontSize: 18, fontFamily: fonts.medium},
          headerStyle: {
            backgroundColor: colors.sinupBgColor,
          },
          tabBarIcon: ({color, focused}) => (
            <IconContainer focused={focused} color={color} name={'Cart'}>
              <FontAwesome name="shopping-bag" size={20} color={color} />
            </IconContainer>
          ),
        }}>
        {props => <Cart {...props} />}
      </Tab.Screen>

      <Tab.Screen
        name="Category"
        options={{
          tabBarIcon: ({color, focused}) => (
            <IconContainer focused={focused} color={color} name={'Category'}>
              <AntDesign name="appstore1" size={20} color={color} />
            </IconContainer>
          ),
        }}>
        {props => <Category {...props} />}
      </Tab.Screen>

      <Tab.Screen
        name="Profile"
        options={{
          tabBarIcon: ({color, focused}) => (
            <IconContainer focused={focused} color={color} name={'Profile'}>
              <FontAwesome name="user" size={23} color={color} />
            </IconContainer>
          ),
        }}>
        {props => <ProfileScreen {...props} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

const IconContainer = ({
  focused,
  color,
  name,
  children,
}: {
  focused: boolean;
  color: string;
  name: string;
  children: ReactNode;
}) => (
  <View style={[styles.iconContainer, focused && styles.activeIconContainer]}>
    {children}
    {focused && (
      <Text style={[styles.text, styles.fontPsemibold, {color}]}>{name}</Text>
    )}
  </View>
);

export default BottomTapNavigation;

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
  },
  fontPsemibold: {
    fontWeight: '600',
  },
  activeIconContainer: {
    backgroundColor: colors.lightGreen,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 100,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
