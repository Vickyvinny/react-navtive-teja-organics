import {NavigationProp} from '@react-navigation/native';
import React, {Component} from 'react';
import {
  FlatList,
  Image,
  ImageSourcePropType,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CommonText from '../components/CommonText';
import {fonts} from '../constants/fonts';
import {bsData} from '../utils/BestSellerData';
import {colors} from '../utils/Colors';

type NavigationType = {
  search: undefined;
};

interface IProps {
  navigation: NavigationProp<NavigationType>;
}

interface SearchProduct {
  id: number;
  image: ImageSourcePropType | undefined;
  title: string;
  price: string;
  quantity: number;
}

export default class SearchScreen extends Component<IProps> {
  renderItem = ({item}: {item: SearchProduct}) => {
    return (
      <View style={styles.itemContainer}>
        <Image source={item.image} style={styles.image} />
        <View style={styles.textContainer}>
          <CommonText
            text={item.title}
            color={colors.black}
            fontSize={18}
            align="left"
            fontFamily={fonts.medium}
          />
          <CommonText
            text={item.price}
            color={colors.black}
            fontSize={16}
            align="left"
            fontFamily={fonts.bold}
          />
        </View>
      </View>
    );
  };

  renderSeparator = () => <View style={styles.separator} />;
  emptyComponent = () => {
    return (
      <View style={{backgroundColor: colors.sinupBgColor}}>
        <CommonText
          text={
            'Sorry the product is not available, please enter available products'
          }
          color={colors.black}
          fontSize={16}
          align="left"
          fontFamily={fonts.medium}
        />
      </View>
    );
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Ionicons name="search" size={25} color={colors.grey} />
          <TextInput
            placeholder="Search products"
            style={styles.textInput}
            placeholderTextColor={colors.grey}
          />
        </View>
        <View style={{backgroundColor: 'white', borderRadius: 20}}>
          <FlatList
            data={bsData}
            renderItem={this.renderItem}
            ItemSeparatorComponent={this.renderSeparator}
            keyExtractor={item => item.id.toString()}
            ListEmptyComponent={this.emptyComponent}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: responsiveScreenHeight(2),
    backgroundColor: colors.sinupBgColor,
  },
  inputContainer: {
    height: 46,
    backgroundColor: colors.white,
    flexDirection: 'row',
    width: responsiveScreenWidth(95),
    borderRadius: 100,
    alignItems: 'center',
    paddingHorizontal: 15,
    elevation: 5,
    marginBottom: 20,
  },
  itemContainer: {
    marginVertical: 10,
    padding: 15,
    flexDirection: 'row',
    gap: 20,
  },
  textContainer: {
    marginTop: 10,
    gap: 5,
  },

  image: {
    width: 48,
    height: 48,
  },
  separator: {
    backgroundColor: colors.secondGrey,
    height: 0.5,
    marginHorizontal: 20,
  },
  textInput: {
    flex: 1,
    color: colors.black,
  },
});
