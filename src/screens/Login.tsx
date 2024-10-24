import {NavigationProp} from '@react-navigation/native';
import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import CommonButton from '../components/CommonButton';
import CommonInputField from '../components/CommonInputField';
import CommonText from '../components/CommonText';
import MyCarousel from '../components/MyCarousel';
import {colors} from '../utils/Colors';

type NavigationType = {
  home: undefined;
};

interface IProps {
  navigation: NavigationProp<NavigationType>;
}

const Login = ({navigation}: IProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.carouselContainer}>
        <MyCarousel />
      </View>

      <View style={styles.bottomContainer}>
        <CommonText
          text="Login & Register"
          color={colors.textColor}
          fontSize={20}
          align='center'
        />

        <View style={styles.inputButtonContainer}>
          {/* <CommonInputField /> */}
          {/* <CommonButton  /> */}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  carouselContainer: {
    flex: 2,
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: colors.yellow,
    paddingVertical: 20,
    alignItems: 'center',
    gap: 40,
    justifyContent: 'space-between',
  },
  inputButtonContainer: {
    flex: 1,
    gap: 20,
  },
});
