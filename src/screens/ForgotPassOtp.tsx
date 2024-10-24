import React, {Component} from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';
import {OtpInput} from 'react-native-otp-entry';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import Toast from 'react-native-toast-message';
import {connect} from 'react-redux';
import {allImages} from '../assets/images';
import CommonButton from '../components/CommonButton';
import CommonText from '../components/CommonText';
import {fonts} from '../constants/fonts';
import {LocalNotification} from '../constants/LocalNotification';
import {RootState} from '../redux/store';
import {colors} from '../utils/Colors';
import {translate} from '../utils/i18jsConfig';
import {generateOtp} from './ForgotPassword';
interface IProps {
  phoneNumber: string;
  handleNextScreen: () => void;
  correctOtp: string;
}
interface IState {
  otp: string;
  otpError: boolean;
  timer: number;
  correctOtp: string;
}

class ForgotPassOtp extends Component<IProps, IState> {
  private intervalId: NodeJS.Timeout | null = null;
  constructor(props: IProps) {
    super(props);
    this.state = {
      otp: '',
      otpError: false,
      timer: 30,
      correctOtp: this.props.correctOtp,
    };
  }
  componentDidMount() {
    this.intervalId = setInterval(this.tick, 1000);
  }

  componentWillUnmount() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  tick = () => {
    this.setState(prevState => {
      if (prevState.timer > 0) {
        return {timer: prevState.timer - 1};
      } else {
        clearInterval(this.intervalId!);
        Toast.show({
          type: 'error',
          text1: translate('otpExpiredText'),
          text2: translate('otpExpiredTextError'),
        });
        return {timer: 0};
      }
    });
  };
  handleOtpChange = (text: string) => {
    this.setState({otp: text, otpError: false});
    console.log(text);
  };

  handleOtpFilled = (text: string) => {
    console.log(`OTP is ${text}`);

    this.setState({otp: text});
  };

  handleSubmit = () => {
    const {otp, timer, correctOtp} = this.state;

    if (otp === correctOtp) {
      Toast.show({
        type: 'success',
        text1: translate('otpResentText'),
        text2: translate('otpResentTextError'),
      });

      this.props.handleNextScreen();
    } else {
      this.setState({otpError: true});

      Toast.show({
        type: 'error',
        text1: translate('toastErrorText'),
        text2: translate('invalidOtpError'),
      });
    }
  };
  handleResendOtp = async () => {
    const otp = generateOtp();
    await LocalNotification(otp);
    this.setState({correctOtp: otp});
    this.setState({timer: 30});
    this.tick();
    Toast.show({
      type: 'info',
      text1: translate('otpResentText'),
      text2: translate('otpResentTextError'),
    });
  };
  render() {
    const {otpError, timer} = this.state;
    const {phoneNumber} = this.props;
    return (
      <View>
        <View style={{gap: 5}}>
          <CommonText
            text={translate('otpTitle')}
            color={colors.black}
            fontSize={22}
            align="left"
            fontFamily={fonts.medium}
          />
          <View style={{width: responsiveScreenWidth(80)}}>
            <CommonText
              text={`${translate('verificationNumberText')} ${phoneNumber}`}
              color={colors.grey}
              fontSize={16}
              align="left"
              fontFamily={fonts.medium}
            />
          </View>
          <OtpInput
            numberOfDigits={4}
            focusColor={colors.lightGreen}
            focusStickBlinkingDuration={500}
            onTextChange={this.handleOtpChange}
            onFilled={this.handleOtpFilled}
            textInputProps={{
              accessibilityLabel: 'One-Time Password',
              style: otpError ? styles.errorInput : null,
            }}
            theme={{
              containerStyle: styles.otpContainer,
              pinCodeContainerStyle: styles.pinCodeContainer,
              pinCodeTextStyle: styles.pinCodeText,
              focusStickStyle: styles.focusStick,
              focusedPinCodeContainerStyle: styles.activePinCodeContainer,
            }}
          />
          {otpError && (
            <CommonText
              text={translate('OtpError')}
              color={colors.red}
              fontSize={14}
              align="center"
              fontFamily={fonts.medium}
            />
          )}
          <View style={styles.durationMainContainer}>
            <ImageBackground
              source={allImages.durationBg}
              style={styles.durationContainer}
              resizeMode="cover">
              <CommonText
                text={`${timer}`}
                color={colors.white}
                fontSize={20}
                align="center"
                fontFamily={fonts.bold}
              />
              <CommonText
                text={translate('secText')}
                color={colors.white}
                fontSize={14}
                align="center"
                fontFamily={fonts.medium}
              />
            </ImageBackground>
            <CommonText
              text={translate('statusOtp')}
              color={colors.grey}
              fontSize={16}
              align="center"
              fontFamily={fonts.medium}
            />
          </View>
          {timer === 0 && (
            <CommonButton
              text={translate('resendOtpText')}
              bgColor={colors.green}
              onPress={this.handleResendOtp}
            />
          )}
          <View style={styles.buttonContainer}>
            <CommonButton
              text={translate('verify')}
              bgColor={colors.green}
              onPress={this.handleSubmit}
            />
          </View>
        </View>
        <Toast />
      </View>
    );
  }
}
const mapStateToProps = (state: RootState) => ({
  phoneNumber: state.Auth.phoneOrEmail,
  correctOtp: state.Auth.otp,
});

export default connect(mapStateToProps)(ForgotPassOtp);
const styles = StyleSheet.create({
  otpContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  pinCodeContainer: {
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: 8,
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  pinCodeText: {
    fontSize: 24,
    color: colors.textColor,
    fontFamily: fonts.medium,
  },
  focusStick: {
    backgroundColor: colors.lightGreen,
    width: 3,
    height: 25,
    borderRadius: 1.5,
  },
  activePinCodeContainer: {
    borderColor: colors.lightGreen,
    borderWidth: 2,
  },
  durationMainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: responsiveScreenHeight(2),
  },
  durationContainer: {
    width: 82,
    height: 82,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: responsiveScreenHeight(5),
  },
  buttonContainer: {
    marginTop: responsiveScreenHeight(6),
  },
  errorText: {
    marginTop: 5,
  },
  errorInput: {
    borderColor: colors.red,
  },
});
