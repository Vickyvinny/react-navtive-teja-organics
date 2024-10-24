import {Formik} from 'formik';
import React, {Component} from 'react';
import {
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import {connect} from 'react-redux';
import * as Yup from 'yup';
import {allImages} from '../assets/images';
import CommonButton from '../components/CommonButton';
import CommonInputField from '../components/CommonInputField';
import CommonText from '../components/CommonText';
import {fonts} from '../constants/fonts';

import Toast from 'react-native-toast-message';
import {loginAction} from '../redux/reducer/auth';
import {AppDispatch, RootState} from '../redux/store';
import {colors} from '../utils/Colors';
import {translate} from '../utils/i18jsConfig';
const validationSchema = Yup.object().shape({
  username: Yup.string()
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, translate('emailFormat'))
    .required(translate('userNameErr')),
  password: Yup.string()
    .required(translate('passwordErr'))
    .min(6, translate('passwordLenthError'))
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
      translate('passwordFormat'),
    ),
});

interface Login {
  login: string;
  password: string;
  fcm_token: string;
}

interface IProps {
  navigation: any;
  signinUser: (data: Login) => void;
  error: string;
  isSuccess: boolean;
  loading: boolean;
}

interface Values {
  username: string;
  password: string;
}

class SigninScreen extends Component<IProps> {
  handleFormSubmit = async (values: Values) => {
    const {signinUser, navigation} = this.props;
    const data = {
      login: values.username,
      password: values.password,
      fcm_token: '',
    };
    const res = await signinUser(data);
    console.log(res,'=======>local login')
    //@ts-ignore
    if (!res.payload.response.message) {
      Toast.show({
        type: 'success',
        text1: translate('toastSuccessText'),
        text2: translate('successLogin'),
      });
      navigation.navigate('home');
    } else {
      Toast.show({
        type: 'error',
        text1: translate('toastErrorText'),
        //@ts-ignore
        text2: translate(`${res.payload.response.message}`),
      });
    }
  };

  render() {
    return (
      <ImageBackground
        source={allImages.banner}
        resizeMode="cover"
        style={styles.backgroundImage}>
        <StatusBar
          backgroundColor={'rgba(0,0,0,0)'}
          translucent={true}
          barStyle={'light-content'}
        />

        <ImageBackground
          source={allImages.loginBanner}
          resizeMode="cover"
          style={styles.backgroundImage}>
          <View style={{marginVertical: responsiveHeight(5)}} />

          <View style={styles.container}>
            <View style={styles.logoImage}>
              <Image source={allImages.logo} />
            </View>
            <Formik
              initialValues={{username: '', password: ''}}
              validationSchema={validationSchema}
              onSubmit={this.handleFormSubmit}>
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
              }) => (
                <View style={styles.inputContainer}>
                  <CommonText
                    text={translate('signInTitle')}
                    color={colors.white}
                    fontSize={22}
                    align="center"
                    fontFamily={fonts.bold}
                  />
                  <View>
                    <CommonInputField
                      placeholder={translate('Username')}
                      icon="user"
                      secureTextEntry={false}
                      onChange={handleChange('username')}
                      onBlur={handleBlur('username')}
                      value={values.username}
                    />
                    {errors.username && touched.username && (
                      <CommonText
                        text={errors.username}
                        color={colors.red}
                        fontSize={14}
                        align="left"
                        fontFamily={fonts.extraLight}
                      />
                    )}
                  </View>
                  <View>
                    <CommonInputField
                      placeholder={translate('Password')}
                      icon="lock"
                      secureTextEntry={true}
                      onChange={handleChange('password')}
                      onBlur={handleBlur('password')}
                      value={values.password}
                      type={true}
                    />
                    {errors.password && touched.password && (
                      <CommonText
                        text={errors.password}
                        color={colors.red}
                        fontSize={14}
                        align="left"
                        fontFamily={fonts.extraLight}
                      />
                    )}
                  </View>
                  <CommonButton
                    text={translate('login')}
                    bgColor={colors.green}
                    onPress={handleSubmit}
                    loading={this.props.loading}
                  />
                  <CommonButton
                    text={translate('forgotPassword')}
                    bgColor={'transparent'}
                    onPress={() => this.props.navigation.navigate('forgot')}
                  />
                </View>
              )}
            </Formik>
            <View style={styles.bottomImage}>
              <Image source={allImages.loginBottom} />
            </View>
          </View>
        </ImageBackground>
        <View style={styles.toast}>
          <Toast />
        </View>
      </ImageBackground>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  error: state.Auth.errorMassage,
  isSuccess: state.Auth.isLoginSuccess,
  loading: state.Auth.loadingLogin,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  signinUser: (data: Login) => dispatch(loginAction(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SigninScreen);

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputContainer: {
    flex: 1.3,
    justifyContent: 'center',
    gap: 20,
    paddingHorizontal: 20,
  },
  logoImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomImage: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  toast: {
    position: 'absolute',
    top: 100,
    left: 0,
    right: 0,
    zIndex: 1000,
    alignItems: 'center',
  },
});
