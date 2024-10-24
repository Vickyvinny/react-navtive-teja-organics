import React, {Component} from 'react';
import {FlatList, TouchableOpacity, View} from 'react-native';

import {
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {fonts} from '../constants/fonts';
import {colors} from '../utils/Colors';
import {listData} from '../utils/LIstItems';
import CommonText from './CommonText';
interface ItemData {
  id: number;
  title: string;
}
export default class HomeFlatlistItem extends Component {
  renderItem = ({item}: {item: ItemData}) => {
    return (
      <TouchableOpacity
        style={{
          backgroundColor: 'white',
          height: responsiveScreenHeight(5),
          width: responsiveScreenWidth(35),
          borderRadius: 100,
          justifyContent: 'center',
          marginHorizontal: 5,
        }}>
        <CommonText
          text={item.title}
          color={colors.black}
          fontSize={responsiveFontSize(1.5)}
          align="center"
          fontFamily={fonts.bold}
        />
      </TouchableOpacity>
    );
  };
  render() {
    return (
      <View style={{marginTop: responsiveScreenHeight(2)}}>
        <FlatList
          data={listData}
          renderItem={this.renderItem}
          keyExtractor={item => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    );
  }
}
