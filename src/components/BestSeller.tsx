import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {Component} from 'react';
import {Image, ImageSourcePropType, StyleSheet, View} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveScreenWidth,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {connect} from 'react-redux';
import {fonts} from '../constants/fonts';
import {bestSellerAction} from '../redux/reducer/auth';
import {AppDispatch, RootState} from '../redux/store';
import {bsData} from '../utils/BestSellerData';
import {colors} from '../utils/Colors';
import CommonText from './CommonText';

const eachCarouselItem = ({item}: {item: CarouselItemData}) => {
  return (
    <View style={styles.carouselItemContainer}>
      {bsData.map(each => (
        <View key={each.id} style={styles.item}>
          <View style={styles.freeShippingContainer}>
            <CommonText
              text={'Free Shipping'}
              color={colors.black}
              fontSize={responsiveFontSize(1)}
              align="center"
              fontFamily={fonts.medium}
            />
          </View>
          <Image source={each.image} style={styles.itemImage} />
          <CommonText
            text={each.title}
            color={colors.black}
            fontSize={responsiveFontSize(1.4)}
            align="left"
            fontFamily={fonts.medium}
          />
          <CommonText
            text={each.price}
            color={colors.black}
            fontSize={responsiveFontSize(1.4)}
            align="left"
            fontFamily={fonts.black}
          />
        </View>
      ))}
    </View>
  );
};

interface CarouselItemData {
  id: number;
  image: ImageSourcePropType | undefined;
  title: string;
  price: string;
}

interface IProps {
  bestSellerAction: () => void;
}

class BestSeller extends Component<IProps> {
  state = {
    activeIndex: 0,
  };

  componentDidMount() {
    const res = this.props.bestSellerAction();
    console.log(res, '======>res best local');
  }

  render() {
    return (
      <View style={styles.container}>
        <CommonText
          text={'Our Best Sellers'}
          color={colors.black}
          fontSize={18}
          align="left"
          fontFamily={fonts.bold}
        />
        <Carousel
          data={Array(5).fill(0)}
          //@ts-ignore
          renderItem={eachCarouselItem}
          sliderWidth={responsiveScreenWidth(100)}
          itemWidth={responsiveScreenWidth(100)}
          layout={'default'}
          onSnapToItem={index => this.setState({activeIndex: index})}
        />
        <Pagination
          dotsLength={5}
          activeDotIndex={this.state.activeIndex}
          inactiveDotElement={<View style={styles.inactiveDot} />}
          dotElement={<View style={styles.activeDot} />}
          containerStyle={styles.paginationContainer}
        />
      </View>
    );
  }
}

const mapStateToProps = (state: RootState) => ({});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  bestSellerAction: async () => {
    return await dispatch(bestSellerAction());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(BestSeller);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    marginTop: responsiveHeight(4),
  },
  carouselItemContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    columnGap: responsiveFontSize(1),
    marginTop: 10,
  },
  item: {
    width: responsiveWidth(35),
    position: 'relative',
    height: responsiveHeight(22),
    padding: responsiveFontSize(1),
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: colors.thirdGrey,
    borderRadius: 10,
  },
  freeShippingContainer: {
    borderRadius: 20,
    alignSelf: 'flex-start',
    padding: 3,
    backgroundColor: 'white',
    width: responsiveWidth(20),
  },
  itemImage: {
    alignSelf: 'center',
    width: responsiveWidth(15),
    height: responsiveHeight(13),
  },
  inactiveDot: {
    width: 5,
    borderRadius: 30,
    backgroundColor: '#CFCFCF',
    height: 5,
  },
  activeDot: {
    width: 20,
    borderRadius: 30,
    backgroundColor: '#A0E045',
    height: 5,
  },
  paginationContainer: {
    paddingVertical: 0,
    paddingHorizontal: 0,
    justifyContent: 'space-around',
    width: 85,
    position: 'absolute',
    gap: 0,
    top: 10,
    right: 0,
    alignSelf: 'center',
  },
});
