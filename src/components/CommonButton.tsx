import React, {Component} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {responsiveScreenWidth} from 'react-native-responsive-dimensions';
import {fonts} from '../constants/fonts';
import {colors} from '../utils/Colors';
import CommonText from './CommonText';
type NavigationType = {
  home: undefined;
};
interface IProps {
  text: string;
  bgColor: string;
  onPress?: () => void;
  loading?: boolean;
}

class CommonButton extends Component<IProps, {}> {
  render() {
    return (
      <View style={styles.buttonCOntainer}>
        <TouchableOpacity
          style={[styles.button, {backgroundColor: this.props.bgColor}]}
          onPress={this.props.onPress}>
          <CommonText
            text={this.props.text}
            color={colors.white}
            fontSize={16}
            align="center"
            fontFamily={fonts.medium}
          />
          {this.props.loading && (
            <ActivityIndicator color={colors.lightGreen} size={30} />
          )}
        </TouchableOpacity>
      </View>
    );
  }
}

export default CommonButton;

const styles = StyleSheet.create({
  buttonCOntainer: {
    flex: 1,
  },
  button: {
    width: responsiveScreenWidth(90),
    height: 50,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {
    fontSize: 20,
    lineHeight: 25,
    fontWeight: '600',
    textAlign: 'center',
    color: colors.white,
  },
});
