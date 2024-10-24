import {Formik} from 'formik';
import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  responsiveHeight,
  responsiveScreenHeight,
} from 'react-native-responsive-dimensions';
import Toast from 'react-native-toast-message';
import {connect} from 'react-redux';
import * as Yup from 'yup';
import CommonButton from '../components/CommonButton';
import CommonInputField from '../components/CommonInputField';
import CommonText from '../components/CommonText';
import {fonts} from '../constants/fonts';
import {forgotPasswordAction, User} from '../redux/reducer/auth';
import {AppDispatch, RootState} from '../redux/store';
import {colors} from '../utils/Colors';
import { translate } from '../utils/i18jsConfig';
interface FormValues {
  newPassword: string;
  confirmPassword: string;
}
interface IState {}
interface IProps {
  forgotPassword: (data: {
    password: string;
    confirm_password: string;
    username: string;
  }) => void;
  email: string;
  navigation: any;
}
const validationSchema = Yup.object().shape({
  newPassword: Yup.string()
    .required(translate('newPasswordRequired'))
    .min(6, translate('newPasswordLength')),
  confirmPassword: Yup.string()
    .required(translate('confirmPasswordRequired'))
    .oneOf([Yup.ref('newPassword'), ''], translate('confirmPasswordMatch')),
});

class ResetPassword extends Component<IProps, IState> {
  handleSubmit = async (values: FormValues) => {
    const {forgotPassword, email} = this.props;
    const data = {
      password: values.newPassword,
      confirm_password: values.confirmPassword,
      username: email,
    };

    try {
      const res = await forgotPassword(data);
      //@ts-ignore
      if (res?.payload.response.message) {
        Toast.show({
          type: 'success',
          text1: translate('toastSuccessText'),
          text2:
            //@ts-ignore
            translate('passwordUpdatedText'),
        });
      } else {
        Toast.show({
          type: 'error',
          text1: translate('toastErrorText'),
          text2: translate('somethingWentWrongText'),
        });
      }

      this.props.navigation.goBack();
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: translate('toastErrorText'),
        text2: translate('somethingWentWrongText'),
      });
    }
  };

  render() {
    return (
      <Formik
        initialValues={{newPassword: '', confirmPassword: ''}}
        validationSchema={validationSchema}
        onSubmit={this.handleSubmit}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View style={styles.container}>
            <View>
              <CommonText
                text={translate('createPassword')}
                color={colors.black}
                fontSize={22}
                align="left"
                fontFamily={fonts.medium}
              />
              <View>
                <View style={styles.inputFieldContainer}>
                  <CommonText
                    text={translate('newPasswordText')}
                    color={colors.textColor}
                    fontSize={18}
                    align="left"
                    fontFamily={fonts.light}
                  />
                  <CommonInputField
                    placeholder={translate('newPasswordPlaceholder')}
                    icon="eye"
                    value={values.newPassword}
                    onChange={handleChange('newPassword')}
                    onBlur={handleBlur('newPassword')}
                    newIcon={true}
                    secureTextEntry={true}
                  />
                </View>
                {touched.newPassword && errors.newPassword ? (
                  <CommonText
                    text={errors.newPassword}
                    color={colors.red}
                    fontSize={14}
                    align="left"
                    fontFamily={fonts.light}
                  />
                ) : null}
              </View>
              <View>
                <View style={styles.inputFieldContainer}>
                  <CommonText
                    text={translate('confirmPasswordText')}
                    color={colors.textColor}
                    fontSize={18}
                    align="left"
                    fontFamily={fonts.light}
                  />
                  <CommonInputField
                    placeholder={translate('confrmPassword')}
                    icon="eye"
                    value={values.confirmPassword}
                    onChange={handleChange('confirmPassword')}
                    onBlur={handleBlur('confirmPassword')}
                    newIcon={true}
                    secureTextEntry={true}
                  />
                </View>
                {touched.confirmPassword && errors.confirmPassword ? (
                  <CommonText
                    text={errors.confirmPassword}
                    color={colors.red}
                    fontSize={14}
                    align="left"
                    fontFamily={fonts.light}
                  />
                ) : null}
              </View>
            </View>
            <View>
              <CommonButton
                text={translate('resetPassword')}
                bgColor={colors.green}
                onPress={handleSubmit}
              />
            </View>
          </View>
        )}
      </Formik>
    );
  }
}
const mapStateProps = (state: RootState) => ({
  email: state.Auth.phoneOrEmail,
});
const mapDispatchProp = (dispatch: AppDispatch) => ({
  forgotPassword: async (data: {
    password: string;
    confirm_password: string;
    username: string;
  }) => {
    return await dispatch(forgotPasswordAction(data));
  },
});
const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    height: responsiveScreenHeight(60),
  },
  inputFieldContainer: {
    gap: 15,
    marginTop: responsiveHeight(2),
  },
});

export default connect(mapStateProps, mapDispatchProp)(ResetPassword);
