import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {responsiveScreenHeight} from 'react-native-responsive-dimensions';
import Toast from 'react-native-toast-message';
import {connect} from 'react-redux';
import CommonButton from '../components/CommonButton';
import CommonInputField from '../components/CommonInputField';
import CommonText from '../components/CommonText';
import {fonts} from '../constants/fonts';
import {LocalNotification} from '../constants/LocalNotification';
import {getOtp, getPhoneOrEmail} from '../redux/reducer/auth';
import {AppDispatch, RootState} from '../redux/store';
import {colors} from '../utils/Colors';
import { translate } from '../utils/i18jsConfig';
export const generateOtp = (): string => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};
interface State {
  input: string;
  error: string;
}
interface IProps {
  handleNextScreen: () => void;
  setOtp: (otp: string) => void;
  getPhoneOrEmail: (input: string) => void;
}
class ForgotPassword extends Component<IProps, State> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      input: '',
      error: '',
    };
  }

  handleInputChange = (input: string) => {
    this.setState({input, error: ''});
  };

  validateInput = () => {
    const {input} = this.state;
    if (!input) {
      this.setState({
        error: translate('phonenumberOrEmailError'),
      });
      return false;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^\d{10}$/;
    if (!emailPattern.test(input) && !phonePattern.test(input)) {
      this.setState({
        error: translate('phonenumberOrEmailValid'),
      });
      return false;
    }
    this.props.handleNextScreen();
    return true;
  };

  handleSubmit = async () => {
    const {input} = this.state;
    if (this.validateInput()) {
      const otp = generateOtp();
      this.props.setOtp(otp);
      await LocalNotification(otp);
      this.props.getPhoneOrEmail(input);

      Toast.show({
        type: 'success',
        text1: translate('toastSuccessText'),
        text2: translate('otpSent'),
      });
    }
  };

  render() {
    const {input, error} = this.state;

    return (
      <View style={styles.container}>
        <Toast />
        <View>
          <CommonText
            text={translate('forgotPasswordText')}
            color={colors.black}
            fontSize={22}
            align="left"
            fontFamily={fonts.medium}
          />
          <View style={styles.inputFieldContainer}>
            <CommonText
              text={translate('phonenumberOrEmailText')}
              color={colors.textColor}
              fontSize={18}
              align="left"
              fontFamily={fonts.light}
            />
            <CommonInputField
              placeholder={translate('phonenumberOrEmailText')}
              icon=""
              value={input}
              onChange={this.handleInputChange}
            />
            {error ? (
              <CommonText
                text={error}
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
            text={translate('getOtpText')}
            bgColor={colors.green}
            onPress={this.handleSubmit}
          />
        </View>
      </View>
    );
  }
}
const mapStateToProps = (state: RootState) => ({
  signUpData: state.Auth,
});
const mapDispatchToProps = (dispatch: AppDispatch) => ({
  getPhoneOrEmail: (input: string) => dispatch(getPhoneOrEmail(input)),
  setOtp: (otp: string) => {
    dispatch(getOtp(otp));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    height: responsiveScreenHeight(60),
  },
  inputFieldContainer: {
    gap: 15,
    marginTop: responsiveScreenHeight(2),
  },
});
