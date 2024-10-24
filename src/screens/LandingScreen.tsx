import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {connect} from 'react-redux';

import {
  responsiveHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import KeyboardWrapper from '../components/KeyboardWrapper';
import {fonts} from '../constants/fonts';
import {toggleAuthScreen} from '../redux/reducer/auth';
import {AppDispatch, RootState} from '../redux/store';
import {translate} from '../utils/i18jsConfig';
import SigninScreen from './SigninScreen';
import SignupScreen from './SignupScreen';
import { colors } from '../utils/Colors';

interface State {
  isActive: boolean;
}
interface IProps {
  navigation: any;
  isSignInActive: boolean;
  toggleAuthScreen: () => void;
}

class LandingScreen extends Component<IProps, State> {
  render() {
    const {isSignInActive, toggleAuthScreen} = this.props;

    return (
      <KeyboardWrapper>
        <View style={styles.container}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[
                styles.button,
                isSignInActive ? styles.activeButton : styles.inactiveButton,
              ]}
              onPress={toggleAuthScreen}>
              <Text
                style={[
                  styles.buttonText,
                  isSignInActive
                    ? styles.activeButtonText
                    : styles.inactiveButtonText,
                ]}>
                {translate('login')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                !isSignInActive ? styles.activeButton : styles.inactiveButton,
              ]}
              onPress={toggleAuthScreen}>
              <Text
                style={[
                  styles.buttonText,
                  !isSignInActive
                    ? styles.activeButtonText
                    : styles.inactiveButtonText,
                ]}>
                {translate('signUp')}
              </Text>
            </TouchableOpacity>
          </View>
          {isSignInActive ? (
            <SigninScreen navigation={this.props.navigation} />
          ) : (
            <SignupScreen navigation={this.props.navigation} />
          )}
        </View>
      </KeyboardWrapper>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  isSignInActive: state.Auth.isSignInActive,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  toggleAuthScreen: () => dispatch(toggleAuthScreen()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LandingScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.sinupBgColor,
  },
  buttonContainer: {
    width: responsiveScreenWidth(95),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    marginTop: responsiveHeight(6),
    backgroundColor: 'black',
    height: 50,
    alignItems: 'center',
    borderRadius: 100,
    position: 'absolute',
    zIndex: 1,
  },
  button: {
    flex: 1,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    marginHorizontal: 5,
  },
  activeButton: {
    backgroundColor: '#fff',
  },
  inactiveButton: {
    backgroundColor: '#000',
  },
  buttonText: {
    color: '#000',
    fontFamily: fonts.bold,
  },
  activeButtonText: {
    color: '#000',
  },
  inactiveButtonText: {
    color: '#fff',
  },
});
