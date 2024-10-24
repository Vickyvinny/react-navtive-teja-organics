import React, {Component} from 'react';
import {
  Image,
  ImageBackground,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  responsiveHeight,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {fonts} from '../constants/fonts';
import {colors} from '../utils/Colors';

interface CarouselItemData {
  id: number;
  image: ImageSourcePropType | undefined;
  title: string;
  price: string;
}

const data: CarouselItemData[] = [
  {
    id: 1,
    image: require('../assets/imageOne.png'),
    title: 'Hibiscus Tea 50gm',
    price: '₹340.00',
  },
  {
    id: 2,
    image: require('../assets/imageTwo.png'),
    title: 'Antibiotic free',
    price: '₹340.00',
  },
  {
    id: 3,
    image: require('../assets/imageThree.png'),
    title: 'Halal certified',
    price: '₹340.00',
  },
];

export default class HomeCarousel extends Component {
  state = {
    activeIndex: 0,
  };

  renderItem = ({item}: {item: CarouselItemData}) => {
    return (
      <ImageBackground
        source={require('../assets/images/carousalBanner.png')}
        resizeMode="cover"
        style={styles.carouselItem}>
        <View>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.price}>{item.price}</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Add to cart</Text>
          </TouchableOpacity>
        </View>
        <Image source={item.image} style={styles.image} />
      </ImageBackground>
    );
  };

  render() {
    return (
      <View>
        <Carousel
          data={data}
          //@ts-ignore
          renderItem={this.renderItem}
          sliderWidth={responsiveScreenWidth(100)}
          itemWidth={responsiveScreenWidth(95)}
          layout={'default'}
          onSnapToItem={index => this.setState({activeIndex: index})}
        />
        <Pagination
          dotsLength={3}
          activeDotIndex={this.state.activeIndex % 3}
          dotStyle={styles.activeDot}
          inactiveDotStyle={styles.inactiveDot}
          containerStyle={styles.paginationContainer}
        />

        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  carouselItem: {
    width: responsiveScreenWidth(95),
    padding: 10,
    marginTop: responsiveScreenHeight(2),
    height: responsiveScreenHeight(18),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    color: colors.black,
    fontSize: 28,
    fontFamily: fonts.extraBold,
    width: responsiveScreenWidth(40),
  },
  price: {
    color: colors.black,
    fontSize: 16,
    fontFamily: fonts.medium,
  },
  button: {
    width: 110,
    backgroundColor: colors.white,
    height: 30,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: responsiveHeight(1),
  },
  buttonText: {
    color: colors.black,
    fontSize: 14,
    fontFamily: fonts.medium,
  },
  image: {
    width: responsiveScreenWidth(30),
    height: responsiveScreenHeight(15),
  },
  paginationContainer: {
    position: 'absolute',
    top: responsiveHeight(15),
    alignSelf: 'center',
  },
  activeDot: {
    backgroundColor: colors.white,
    width: 20,
    height: 4,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  inactiveDot: {
    backgroundColor: colors.white,
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
});
