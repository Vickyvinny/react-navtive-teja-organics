import {Formik} from 'formik';
import React, {Component} from 'react';
import {StatusBar, StyleSheet, TouchableOpacity, View} from 'react-native';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import Toast from 'react-native-toast-message';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect} from 'react-redux';
import * as Yup from 'yup';
import CommonButton from '../components/CommonButton';
import CommonInputField from '../components/CommonInputField';
import CommonText from '../components/CommonText';
import PhoneInputField from '../components/SelectFileldComponent';
import {fonts} from '../constants/fonts';
import {LocalNotification} from '../constants/LocalNotification';
import {registerAction, sendOTP, User} from '../redux/reducer/auth';
import {AppDispatch, RootState} from '../redux/store';
import {colors} from '../utils/Colors';
import {translate} from '../utils/i18jsConfig';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, translate('nameLengthMin'))
    .max(50, translate('nameMaxLength'))
    .matches(/^[A-Za-z\s]+$/, translate('signUpNameError'))
    .required(translate('signUpRequiredError')),

  phone: Yup.string()
    .matches(/^\+?[6-9]\d{9}$/, translate('phoneNumberError'))
    .required(translate('phoneNumRequired')),

  email: Yup.string()
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, translate('emailFormat'))
    .required(translate('userNameErr')),

  password: Yup.string()
    .required(translate('passwordErr'))
    .min(6, translate('passwordLenthError'))
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
      'Enter Valid Password',
    ),

  passwordConfirm: Yup.string()
    .oneOf([Yup.ref('password'), ''], translate('conformPasswordMatchError'))
    .required(translate('conformPasswordRequired')),

  referralCode: Yup.string()
    .matches(/^[A-Za-z0-9]{5,10}$/, translate('referralCodeError'))
    .required(translate('referralCodeRequired')),

  terms: Yup.boolean()
    .required(translate('termsError'))
    .test(
      'is-accepted',
      'You must accept the terms and conditions',
      value => value === true,
    ),
});

const generateOtp = (): string => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};

interface IProps {
  navigation: any;
  signupUser: (data: User) => void;
  sendOtp: (username: string) => void;
  loading: boolean;
}

interface Values {
  name: string;
  phone: string;
  email: string;
  password: string;
  passwordConfirm: string;
  referralCode: string;
  terms: boolean;
}
interface IState {
  terms: boolean;
}

class SignupScreen extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      terms: true,
    };
  }
  handleFormSubmit = async (values: Values) => {
    const {signupUser} = this.props;

    if (!values.terms) {
      Toast.show({
        type: 'error',
        text1: translate('toastErrorText'),
        text2: translate('termsError'),
      });
    }

    const otp = generateOtp();
    const data = {
      email: values.email,
      username: values.name,
      password: values.password,
      phone: values.phone,
      password_confirmation: values.passwordConfirm,
      role: 'customer',
      referral_code: '',
    };

    try {
      const res = await signupUser(data);

      if (
        //@ts-ignore
        res.payload &&
        //@ts-ignore
        res.payload.response &&
        //@ts-ignore
        !res.payload.response.errors?.email
      ) {
        await LocalNotification(otp);
        this.props.navigation.navigate('otp', {phone: values.phone, otp});
      } else {
        const errorMessage =
          //@ts-ignore
          res.payload?.response?.errors?.email[0] ||
          translate('signupErrorGeneric');
        Toast.show({
          type: 'error',
          text1: translate('toastErrorText'),
          text2: errorMessage,
        });
      }
    } catch (error) {
      console.error('Signup error:', error);
      Toast.show({
        type: 'error',
        text1: translate('toastErrorText'),
        text2: translate('signupErrorGeneric'),
      });
    }
  };

  render() {
    
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor={'rgba(0,0,0,0)'}
          translucent={true}
          barStyle={'light-content'}
        />
        <View style={styles.marginVertical} />
        <Formik
          initialValues={{
            name: '',
            phone: '',
            email: '',
            password: '',
            passwordConfirm: '',
            referralCode: '',
            terms: false,
          }}
          validationSchema={validationSchema}
          onSubmit={this.handleFormSubmit}>
          {({
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            setFieldValue,
          }) => (
            <View style={styles.formContainer}>
              <View>
                <View style={styles.inputFieldContainer}>
                  <CommonText
                    text={translate('name')}
                    color={colors.textColor}
                    fontSize={16}
                    align="left"
                    fontFamily={fonts.light}
                  />
                  <CommonInputField
                    placeholder={translate('namePlaceholder')}
                    icon="user"
                    value={values.name}
                    onChange={text => setFieldValue('name', text)}
                    onBlur={handleBlur('name')}
                  />
                </View>
                {errors.name && touched.name && (
                  <CommonText
                    text={errors.name}
                    color={colors.red}
                    fontSize={14}
                    align="left"
                    fontFamily={fonts.light}
                  />
                )}
              </View>
              <View>
                <PhoneInputField
                  value={values.phone}
                  onChange={text => setFieldValue('phone', text)}
                  onBlur={handleBlur('phone')}
                />
                {errors.phone && touched.phone && (
                  <CommonText
                    text={errors.phone}
                    color={colors.red}
                    fontSize={14}
                    align="left"
                    fontFamily={fonts.extraLight}
                  />
                )}
              </View>
              <View>
                <View style={styles.inputFieldContainer}>
                  <CommonText
                    text={translate('Email')}
                    color={colors.textColor}
                    fontSize={16}
                    align="left"
                    fontFamily={fonts.light}
                  />
                  <CommonInputField
                    placeholder={translate('emailPlaceholder')}
                    icon="envelope"
                    value={values.email}
                    onChange={text => setFieldValue('email', text)}
                    onBlur={handleBlur('email')}
                  />
                </View>
                {errors.email && touched.email && (
                  <CommonText
                    text={errors.email}
                    color={colors.red}
                    fontSize={14}
                    align="left"
                    fontFamily={fonts.extraLight}
                  />
                )}
              </View>
              <View>
                <View style={styles.inputFieldContainer}>
                  <CommonText
                    text={translate('Password')}
                    color={colors.textColor}
                    fontSize={16}
                    align="left"
                    fontFamily={fonts.light}
                  />
                  <CommonInputField
                    placeholder={translate('passwordPlaceholder')}
                    icon="lock"
                    secureTextEntry={true}
                    value={values.password}
                    onChange={text => setFieldValue('password', text)}
                    onBlur={handleBlur('password')}
                    type={true}
                  />
                </View>
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
              <View>
                <View style={styles.inputFieldContainer}>
                  <CommonText
                    text={translate('passwordConfirmText')}
                    color={colors.textColor}
                    fontSize={16}
                    align="left"
                    fontFamily={fonts.light}
                  />
                  <CommonInputField
                    placeholder={translate('cnfrmPasswordPlaceholder')}
                    icon="lock"
                    secureTextEntry={true}
                    value={values.passwordConfirm}
                    onChange={text => setFieldValue('passwordConfirm', text)}
                    onBlur={handleBlur('passwordConfirm')}
                    type={true}
                  />
                </View>
                {errors.passwordConfirm && touched.passwordConfirm && (
                  <CommonText
                    text={errors.passwordConfirm}
                    color={colors.red}
                    fontSize={14}
                    align="left"
                    fontFamily={fonts.extraLight}
                  />
                )}
              </View>
              <View>
                <View style={styles.inputFieldContainer}>
                  <CommonText
                    text={translate('referral')}
                    color={colors.textColor}
                    fontSize={16}
                    align="left"
                    fontFamily={fonts.light}
                  />
                  <CommonInputField
                    placeholder={translate('referralPlaceholder')}
                    icon="tag"
                    value={values.referralCode}
                    onChange={text => setFieldValue('referralCode', text)}
                    onBlur={handleBlur('referralCode')}
                    type={false}
                  />
                </View>
                {errors.referralCode && touched.referralCode && (
                  <CommonText
                    text={errors.referralCode}
                    color={colors.red}
                    fontSize={14}
                    align="left"
                    fontFamily={fonts.extraLight}
                  />
                )}
              </View>

              <View>
                <View style={styles.termsContainer}>
                  <MaterialCommunityIcons
                    name={
                      values.terms
                        ? 'checkbox-outline'
                        : 'checkbox-blank-outline'
                    }
                    size={25}
                    onPress={() => {
                      setFieldValue('terms', !values.terms);
                    }}
                    color={colors.grey}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      const newTermsValue = !values.terms;
                      if (newTermsValue) {
                        this.props.navigation.navigate('terms');
                      }
                    }}>
                    <CommonText
                      text={translate('termsAndConditions')}
                      color={colors.textColor}
                      fontSize={16}
                      align="center"
                      fontFamily={fonts.medium}
                    />
                  </TouchableOpacity>
                </View>
                {errors.terms && touched.terms && (
                  <CommonText
                    text={errors.terms}
                    color={colors.red}
                    fontSize={14}
                    align="left"
                    fontFamily={fonts.light}
                  />
                )}
              </View>
              <CommonButton
                text={translate('signUp')}
                bgColor={colors.green}
                onPress={handleSubmit}
                loading={this.props.loading}
              />
            </View>
          )}
        </Formik>
        <View style={styles.toast}>
          <Toast />
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  signUpData: state.Auth,
  loading: state.Auth.loadingLogin,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  signupUser: async (data: User) => {
    return await dispatch(registerAction(data));
  },
  sendOtp: (username: string) => dispatch(sendOTP(username)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.sinupBgColor,
  },
  marginVertical: {
    marginVertical: responsiveHeight(6),
  },
  formContainer: {
    gap: 20,
  },
  inputFieldContainer: {
    gap: 15,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
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
