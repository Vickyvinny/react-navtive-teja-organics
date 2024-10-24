import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {fonts} from '../constants/fonts';
import ApplyCouponScreen from '../screens/ApplyCouponScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import LandingScreen from '../screens/LandingScreen';
import OtpScreen from '../screens/OtpScreen';
import SearchScreen from '../screens/SearchScreen';
import SplashScreen from '../screens/SplashScreen';
import TermsAndConditons from '../screens/TermsAndConditons';
import {colors} from '../utils/Colors';
import {translate} from '../utils/i18jsConfig';
import BottomTapNavigation from './BottomTapNavigation';

const Stack = createNativeStackNavigator();

interface State {
  isActive: boolean;
}
interface IProps {
  // navigation: any;
}

class StackNavigation extends Component<IProps, State> {
  private timerId?: NodeJS.Timeout;

  constructor(props: IProps) {
    super(props);
    this.state = {
      isActive: false,
    };
  }

  componentDidMount() {
    this.timerId = setTimeout(() => {
      this.setState({isActive: true});
    }, 1000);
  }

  componentWillUnmount() {
    if (this.timerId) {
      clearTimeout(this.timerId);
    }
  }

  render() {
    return (
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="coupon">
        {!this.state.isActive ? (
          <Stack.Screen name="splash" component={SplashScreen} />
        ) : (
          <>
            <Stack.Screen name="landing">
              {props => <LandingScreen {...props} />}
            </Stack.Screen>
            <Stack.Screen
              name="otp"
              options={({navigation}) => ({
                headerShown: true,
                title: 'OTP Verification',
                headerTitleAlign: 'center',
                headerShadowVisible: false,
                headerTitleStyle: {fontSize: 18, fontFamily: fonts.medium},
                headerStyle: {
                  backgroundColor: colors.sinupBgColor,
                },
                headerLeft: () => (
                  <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons
                      name="chevron-back-outline"
                      size={25}
                      color={colors.black}
                      style={{fontWeight: '800', paddingLeft: 15}}
                    />
                  </TouchableOpacity>
                ),
              })}>
              {props => <OtpScreen {...props} />}
            </Stack.Screen>
            <Stack.Screen
              name="terms"
              options={({navigation}) => ({
                headerShown: true,
                title: translate('termsAndCondionsText'),
                headerTitleAlign: 'center',
                headerShadowVisible: false,
                headerTitleStyle: {fontSize: 18, fontFamily: fonts.medium},
                headerStyle: {
                  backgroundColor: colors.sinupBgColor,
                },
                headerLeft: () => (
                  <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons
                      name="chevron-back-outline"
                      size={25}
                      color={colors.black}
                      style={{fontWeight: '800', paddingLeft: 15}}
                    />
                  </TouchableOpacity>
                ),
              })}>
              {props => <TermsAndConditons {...props} />}
            </Stack.Screen>
            <Stack.Screen
              name="search"
              options={({navigation}) => ({
                headerShown: true,
                title: 'Search Product',
                headerTitleAlign: 'center',
                headerShadowVisible: false,
                headerTitleStyle: {fontSize: 18, fontFamily: fonts.medium},
                headerStyle: {
                  backgroundColor: colors.sinupBgColor,
                },
                headerLeft: () => (
                  <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons
                      name="chevron-back-outline"
                      size={25}
                      color={colors.black}
                      style={{fontWeight: '800', paddingLeft: 15}}
                    />
                  </TouchableOpacity>
                ),
              })}>
              {props => <SearchScreen {...props} />}
            </Stack.Screen>
            <Stack.Screen name="home" component={BottomTapNavigation} />
            <Stack.Screen
              name="forgot"
              options={({navigation}) => ({
                headerShown: true,
                title: translate('forgotPasswordText'),
                headerTitleAlign: 'center',
                headerShadowVisible: false,
                headerTitleStyle: {fontSize: 18, fontFamily: fonts.medium},
                headerStyle: {
                  backgroundColor: colors.sinupBgColor,
                },
                headerLeft: () => (
                  <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons
                      name="chevron-back-outline"
                      size={25}
                      color={colors.black}
                      style={{fontWeight: '800', paddingLeft: 15}}
                    />
                  </TouchableOpacity>
                ),
              })}>
              {props => <ForgotPasswordScreen {...props} />}
            </Stack.Screen>
            <Stack.Screen
              name="coupon"
              options={({navigation}) => ({
                headerShown: true,
                title: 'Apply Coupon',
                headerTitleAlign: 'center',
                headerShadowVisible: false,
                headerTitleStyle: {fontSize: 18, fontFamily: fonts.medium},
                headerStyle: {
                  backgroundColor: colors.sinupBgColor,
                },
                headerLeft: () => (
                  <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons
                      name="chevron-back-outline"
                      size={25}
                      color={colors.black}
                      style={{fontWeight: '800', paddingLeft: 15}}
                    />
                  </TouchableOpacity>
                ),
              })}>
              {props => <ApplyCouponScreen {...props} />}
            </Stack.Screen>
          </>
        )}
      </Stack.Navigator>
    );
  }
}

export default StackNavigation;

const styles = StyleSheet.create({});
