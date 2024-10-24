import React, {Component} from 'react';
import {
  Image,
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputFocusEventData,
  TouchableOpacity,
  View,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CommonText from './CommonText';

import {
  responsiveHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {fonts} from '../constants/fonts';
import {colors} from '../utils/Colors';
import {translate} from '../utils/i18jsConfig';

interface Country {
  id: number;
  image: any;
  title: string;
}

interface State {
  selectedCountry: Country;
  isDropdownOpen: boolean;
}

const data: Country[] = [
  {id: 1, image: require('../assets/images/india_flag.png'), title: 'India'},
  {id: 2, image: require('../assets/images/india_flag.png'), title: 'IND'},
];
interface IProps {
  value?: string;
  onChange?: (text: string) => void;
  onBlur?: (event: NativeSyntheticEvent<TextInputFocusEventData>) => void;
}
class PhoneInputField extends Component<IProps, State> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      selectedCountry: data[0],
      isDropdownOpen: false,
    };
  }

  toggleDropdown = () => {
    this.setState(prevState => ({isDropdownOpen: !prevState.isDropdownOpen}));
  };

  selectCountry = (country: Country) => {
    this.setState({
      selectedCountry: country,
      isDropdownOpen: false,
    });
  };

  render() {
    const {selectedCountry, isDropdownOpen} = this.state;

    return (
      <View style={styles.inputFieldContainer}>
        <View style={{gap: 15}}>
          <CommonText
            text={translate('Phone')}
            color={colors.textColor}
            fontSize={16}
            align="left"
            fontFamily={fonts.light}
          />
          <View style={styles.textField}>
            <TouchableOpacity
              style={styles.countrySelector}
              onPress={this.toggleDropdown}>
              <Image source={selectedCountry.image} style={styles.flagImage} />
              <CommonText
                text={selectedCountry.title}
                color={colors.textColor}
                fontSize={16}
                align="left"
                fontFamily={fonts.light}
              />
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              placeholder={translate('mobilePlaceHolder')}
              keyboardType="phone-pad"
              placeholderTextColor={colors.grey}
              value={this.props.value}
              onChangeText={this.props.onChange}
              onBlur={this.props.onBlur}
              maxLength={10}
            />
            <FontAwesome name={'phone'} size={20} color={colors.grey} />
          </View>
        </View>
        {isDropdownOpen && (
          <View style={styles.dropdownContainer}>
            {data.map(item => (
              <TouchableOpacity
                key={item.id}
                style={styles.dropdownItem}
                onPress={() => this.selectCountry(item)}>
                <Image source={item.image} style={styles.flagImage} />
                <CommonText
                  text={item.title}
                  color={colors.textColor}
                  fontSize={16}
                  align="left"
                  fontFamily={fonts.light}
                />
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputFieldContainer: {
    flex: 1,
  },
  textField: {
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
  countrySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  flagImage: {
    width: 30,
    height: 20,
    marginRight: 5,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  dropdownContainer: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    width: responsiveScreenWidth(30),
    position: 'absolute',
    zIndex: 1,
    bottom: responsiveHeight(5),
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
});

export default PhoneInputField;
