import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {colors} from '../utils/Colors';
import {translate} from '../utils/i18jsConfig';
import {customStyles} from '../utils/SteperStyles';
import ForgotPassOtp from './ForgotPassOtp';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';

const labels = [translate('Password'), translate('OTP'), translate('setNew')];

const renderStepIndicator = ({
  position,
  stepStatus,
}: {
  position: number;
  stepStatus: string;
}) => {
  if (stepStatus === 'finished') {
    return <MaterialIcons name="check" size={20} color="#fff" />;
  }
  return (
    <View
      style={[
        styles.commonDotStyles,
        stepStatus === 'current' ? styles.activeDot : styles.inactiveDot,
      ]}
    />
  );
};

interface State {
  currentStep: number;
}
interface IProps {
  navigation: any;
}

export default class ForgotPasswordScreen extends Component<IProps, State> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      currentStep: 0,
    };
  }
  handleNextScreen = () => {
    if (this.state.currentStep! < labels.length - 1) {
      this.setState(prev => ({
        currentStep: prev.currentStep + 1,
      }));
    }
  };
  renderStepContent = () => {
    const {currentStep} = this.state;
    switch (currentStep) {
      case 0:
        return <ForgotPassword handleNextScreen={this.handleNextScreen} />;
      case 1:
        return <ForgotPassOtp handleNextScreen={this.handleNextScreen} />;
      case 2:
        return <ResetPassword navigation={this.props.navigation} />;
      default:
        return null;
    }
  };

  render() {
    const {currentStep} = this.state;
    return (
      <View style={{flex: 1, backgroundColor: colors.sinupBgColor}}>
        <StepIndicator
          customStyles={customStyles}
          currentPosition={currentStep}
          labels={labels}
          stepCount={labels.length}
          renderStepIndicator={renderStepIndicator}
        />
        <View style={styles.content}>{this.renderStepContent()}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    margin: 20,
  },
  commonDotStyles: {width: 8, height: 8, borderRadius: 12.5},
  inactiveDot: {
    backgroundColor: colors.grey,
  },
  activeDot: {
    backgroundColor: colors.lightGreen,
  },
});
