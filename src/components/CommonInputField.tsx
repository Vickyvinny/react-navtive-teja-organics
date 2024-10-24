import React, {Component} from 'react';
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputChangeEventData,
  TextInputFocusEventData,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import {responsiveScreenWidth} from 'react-native-responsive-dimensions';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {colors} from '../utils/Colors';

interface IProps {
  placeholder: string;
  icon: string;
  secureTextEntry?: boolean;
  value?: string;
  onChange?: (text: string) => void;
  onBlur?: (event: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  type?: boolean;
  newIcon?: boolean;
}

interface IState {
  text: string;
  secureTextEntry: boolean;
}

class CommonInputField extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      text: props.value || '',
      secureTextEntry: props.secureTextEntry || false,
    };
  }

  handleChange = (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
    const text = event.nativeEvent.text;
    this.setState({text});

    if (this.props.onChange) {
      this.props.onChange(text);
    }
  };
  handleToggleSecureTextEntry = () => {
    this.setState(prev => ({...prev, secureTextEntry: !prev.secureTextEntry}));
  };
  render() {
    const {placeholder, icon, onBlur, type, newIcon} = this.props;
    const {text, secureTextEntry} = this.state;

    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={colors.grey}
          secureTextEntry={secureTextEntry}
          value={text}
          onChange={this.handleChange}
          onBlur={onBlur}
          keyboardType="name-phone-pad"
        />
        {newIcon ? (
          <TouchableWithoutFeedback onPress={this.handleToggleSecureTextEntry}>
            <Feather
              name={secureTextEntry ? 'eye' : 'eye-off'}
              size={20}
              style={styles.icon}
              color={colors.grey}
            />
          </TouchableWithoutFeedback>
        ) : type ? (
          <TouchableWithoutFeedback onPress={this.handleToggleSecureTextEntry}>
            <FontAwesome
              name={secureTextEntry ? 'lock' : 'unlock'}
              size={20}
              style={styles.icon}
              color={colors.grey}
            />
          </TouchableWithoutFeedback>
        ) : (
          <FontAwesome
            name={icon}
            size={20}
            style={styles.icon}
            color={colors.grey}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 55,
    backgroundColor: colors.white,
    flexDirection: 'row',
    width: responsiveScreenWidth(90),
    borderRadius: 10,
    alignItems: 'center',
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: colors.border,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: '100%',
    color: '#000',
  },
});

export default CommonInputField;
