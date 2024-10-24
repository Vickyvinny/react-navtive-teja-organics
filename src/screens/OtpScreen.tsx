import React, {Component} from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';
import {OtpInput} from 'react-native-otp-entry';
import {
  responsiveHeight,
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
import {getVerification, toggleAuthScreen} from '../redux/reducer/auth';
import {AppDispatch, RootState} from '../redux/store';
import {colors} from '../utils/Colors';
import {translate} from '../utils/i18jsConfig';
import {generateOtp} from './ForgotPassword';
interface IProps {
  navigation: any;
  route: any;
  isOtpVerify: (data: {otp: boolean; verify: boolean}) => void;
  toggleAuthScreen: () => void;
}

interface IState {
  otp: string;
  isLoading: boolean;
  timer: number;
  otpSent: string;
}

class OtpScreen extends Component<IProps, IState> {
  private intervalId: NodeJS.Timeout | null = null;

  constructor(props: IProps) {
    super(props);
    const {route} = props;
    const {otp} = route.params || {otp: ''};

    this.state = {
      otp: '',
      isLoading: false,
      timer: 30,
      otpSent: otp,
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
    this.setState({otp: text});
  };

  handleVerify = () => {
    const {otp, otpSent} = this.state;
    const {navigation, isOtpVerify, toggleAuthScreen} = this.props;

    if (otp.length === 4) {
      this.setState({isLoading: true});

      if (otp === otpSent) {
        Toast.show({
          type: 'success',
          text1: translate('otpResentText'),
          text2: translate('otpResentTextError'),
        });
        const data = {
          otp: true,
          verify: false,
        };
        isOtpVerify(data);
        toggleAuthScreen();
        navigation.navigate('landing');
      } else {
        Toast.show({
          type: 'error',
          text1: translate('toastErrorText'),
          text2: translate('invalidOtpError'),
        });
      }

      this.setState({isLoading: false});
    } else {
      Toast.show({
        type: 'error',
        text1: translate('invalidInputError'),
        text2: translate('validOtpText'),
      });
    }
  };

  handleResendOtp = async () => {
    const otp = generateOtp();
    await LocalNotification(otp);
    this.setState({otpSent: otp});
    this.setState({timer: 30});
    this.tick();
    Toast.show({
      type: 'success',
      text1: translate('otpResentText'),
      text2: translate('otpResentTextError'),
    });
  };

  render() {
    const {timer, isLoading} = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <CommonText
            text={`${translate('verificationNumberText')}`}
            color={colors.textColor}
            fontSize={16}
            align="center"
            fontFamily={fonts.medium}
          />
          <OtpInput
            numberOfDigits={4}
            focusColor={colors.lightGreen}
            onTextChange={this.handleOtpChange}
            textInputProps={{
              accessibilityLabel: 'One-Time Password',
            }}
            theme={{
              containerStyle: styles.otpContainer,
              pinCodeContainerStyle: styles.pinCodeContainer,
              pinCodeTextStyle: styles.pinCodeText,
              focusStickStyle: styles.focusStick,
              focusedPinCodeContainerStyle: styles.activePinCodeContainer,
            }}
          />
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
            {timer === 0 && (
              <CommonButton
                text={translate('resendOtpText')}
                bgColor={colors.green}
                onPress={this.handleResendOtp}
              />
            )}
          </View>
          <View style={styles.buttonContainer}>
            <CommonButton
              text={translate('verify')}
              bgColor={colors.green}
              onPress={this.handleVerify}
              loading={isLoading}
            />
          </View>
        </View>
        <Toast />
      </View>
    );
  }
}
const mapStateProps = (state: RootState) => ({});
const mapDispatchProp = (dispatch: AppDispatch) => ({
  isOtpVerify: (data: {otp: boolean; verify: boolean}) => {
    dispatch(getVerification({data}));
  },
  toggleAuthScreen: () => dispatch(toggleAuthScreen()),
});
export default connect(mapStateProps, mapDispatchProp)(OtpScreen);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.sinupBgColor,
    alignItems: 'center',
  },
  innerContainer: {
    padding: 20,
    width: responsiveScreenWidth(90),
    alignItems: 'center',
    marginTop: responsiveHeight(4),
    gap: responsiveHeight(4),
  },
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
  buttonContainer: {
    marginTop: responsiveHeight(3),
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
});
