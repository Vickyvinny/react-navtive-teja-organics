import React, {Component} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveScreenWidth,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {allImages} from '../assets/images';
import {fonts} from '../constants/fonts';
import {colors} from '../utils/Colors';
import CommonText from './CommonText';

interface IProps {
  navigation: any;
}
export default class HeaderComponent extends Component<IProps> {
  render() {
    return (
      <View style={styles.container}>
        <Image
          source={allImages.profile}
          style={styles.image}
          resizeMode="cover"
        />
        <TouchableOpacity
          style={styles.inputContainer}
          onPress={() => this.props.navigation.navigate('search')}>
          <Ionicons name="search" size={25} />
          <CommonText
            text={'Search products'}
            color={colors.grey}
            fontSize={responsiveFontSize(1.5)}
            align="center"
            fontFamily={fonts.regular}
          />
        </TouchableOpacity>
        <View style={[styles.image, styles.iconContainer]}>
          <MaterialCommunityIcons name="bell-outline" size={25} />
          <View style={styles.activeDot} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: responsiveHeight(6),
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    gap: 5,
  },
  inputContainer: {
    height: 46,
    backgroundColor: colors.white,
    flexDirection: 'row',
    width: responsiveScreenWidth(66),
    borderRadius: 100,
    alignItems: 'center',
    paddingHorizontal: 15,
    elevation: 5,
  },
  image: {
    width: 48,
    height: 48,
  },
  iconContainer: {
    borderRadius: 100,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeDot: {
    width: 10,
    height: 10,
    borderRadius: 100,
    backgroundColor: colors.lightGreen,
    position: 'absolute',
    top: 4,
    left: responsiveWidth(9),
  },
});
