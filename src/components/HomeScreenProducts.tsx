import React, {Component} from 'react';
import {
  FlatList,
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {fonts} from '../constants/fonts';
import {bsData} from '../utils/BestSellerData';
import {colors} from '../utils/Colors';
import CommonText from './CommonText';

interface Product {
  id: number;
  image: ImageSourcePropType | undefined;
  title: string;
  price: string;
  quantity: number;
}

interface State {
  products: Product[];
}

export default class HomeScreenProducts extends Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      products: bsData,
    };
  }

  handleAddToCart = (id: number) => {
    this.setState(prevState => {
      const products = this.state.products.map(product => {
        if (product.id === id) {
          return {...product, quantity: product.quantity + 1};
        }
        return product;
      });
      return {products};
    });
  };

  handleDecreaseQuantity = (id: number) => {
    this.setState(prevState => {
      const products = this.state.products.map(product => {
        if (product.id === id && product.quantity > 0) {
          return {...product, quantity: product.quantity - 1};
        }
        return product;
      });
      return {products};
    });
  };

  renderItem = ({item}: {item: Product}) => {
    return (
      <View style={styles.productContainer}>
        <Image source={item.image} style={styles.productImage} />
        <TouchableOpacity style={styles.heartButton}>
          <AntDesign name="hearto" color={colors.lightGreen} size={20} />
        </TouchableOpacity>
        <View style={styles.textContainer}>
          <CommonText
            text={item.title}
            color={colors.black}
            fontSize={responsiveFontSize(1.8)}
            align="center"
            fontFamily={fonts.medium}
            noOfLines={1}
          />
          <CommonText
            text={item.price}
            color={colors.black}
            fontSize={responsiveFontSize(2)}
            align="center"
            fontFamily={fonts.bold}
          />
        </View>
        {item.quantity > 0 ? (
          <View
            style={[
              styles.addToCartButton,
              {flexDirection: 'row', justifyContent: 'space-around'},
            ]}>
            <TouchableOpacity
              onPress={() => this.handleDecreaseQuantity(item.id)}>
              <AntDesign name="minus" color={colors.white} size={20} />
            </TouchableOpacity>

            <CommonText
              text={item.quantity.toString()}
              color={colors.white}
              fontSize={responsiveFontSize(1.8)}
              align="center"
              fontFamily={fonts.medium}
            />
            <TouchableOpacity onPress={() => this.handleAddToCart(item.id)}>
              <AntDesign name="plus" color={colors.white} size={20} />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.addToCartButton}
            onPress={() => this.handleAddToCart(item.id)}>
            <Text style={styles.buttonText}>Add to Cart</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  render() {
    const {products} = this.state;
    return (
      <View style={styles.container}>
        <FlatList
          data={products}
          numColumns={2}
          renderItem={this.renderItem}
          keyExtractor={item => item.id.toString()}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  productContainer: {
    backgroundColor: colors.white,
    width: responsiveScreenWidth(45),
    height: responsiveScreenHeight(26),
    margin: 10,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10,
  },
  productImage: {
    width: '100%',
    height: '60%',
    resizeMode: 'contain',
    marginTop: -10,
  },
  textContainer: {
    alignItems: 'center',
  },
  addToCartButton: {
    backgroundColor: colors.lightGreen,
    borderRadius: 100,
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginTop: 10,
    width: responsiveScreenWidth(35),
    height: responsiveScreenHeight(4.5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: colors.white,
  },
  heartButton: {
    position: 'absolute',
    right: 0,
    padding: 10,
  },
});
