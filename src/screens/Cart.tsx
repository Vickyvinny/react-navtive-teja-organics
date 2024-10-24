import {NavigationProp, RouteProp} from '@react-navigation/native';
import React from 'react';
import {
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
import {SwipeListView} from 'react-native-swipe-list-view';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CommonButton from '../components/CommonButton';
import CommonText from '../components/CommonText';
import {fonts} from '../constants/fonts';
import {bsData} from '../utils/BestSellerData';
import {colors} from '../utils/Colors';

interface IProps {
  navigation: NavigationProp<any>;
  route: RouteProp<any, any>;
}

interface CartItem {
  id: number;
  image: ImageSourcePropType | undefined;
  title: string;
  price: string;
  quantity: number;
}

interface CartState {
  data: CartItem[];
}

class Cart extends React.Component<IProps, CartState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      data: bsData,
    };
  }

  handleDelete = (rowKey: number) => {
    const newData = this.state.data.filter(item => item.id !== rowKey);
    this.setState({data: newData});
  };

  renderItem = (data: {item: CartItem}) => (
    <View style={styles.itemContainer}>
      <View style={styles.imageContainer}>
        <Image
          source={data.item.image}
          resizeMode="contain"
          style={styles.image}
        />
      </View>
      <View style={styles.detailsContainer}>
        <CommonText
          text={data.item.title}
          color={colors.black}
          fontSize={responsiveFontSize(1.8)}
          align="left"
          fontFamily={fonts.medium}
        />
        <View style={styles.priceQuantityContainer}>
          <CommonText
            text={data.item.price}
            color={colors.lightGreen}
            fontSize={responsiveFontSize(1.8)}
            align="left"
            fontFamily={fonts.bold}
          />
          <Text>{data.item.quantity}</Text>
        </View>
      </View>
      <View style={styles.quantityContainer}>
        <TouchableOpacity accessibilityLabel="Decrease quantity">
          <AntDesign name="minus" color={colors.black} size={16} />
        </TouchableOpacity>

        <CommonText
          text={data.item.quantity.toString()}
          color={colors.black}
          fontSize={responsiveFontSize(1.7)}
          align="left"
          fontFamily={fonts.medium}
        />
        <TouchableOpacity accessibilityLabel="Increase quantity">
          <AntDesign name="plus" color={colors.black} size={14} />
        </TouchableOpacity>
      </View>
    </View>
  );

  renderHiddenItem = (data: {item: CartItem}) => (
    <View style={styles.hiddenContainer}>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => this.handleDelete(data.item.id)}>
        <AntDesign name="delete" color={colors.white} size={20} />
      </TouchableOpacity>
    </View>
  );

  render() {
    return (
      <View style={styles.container}>
        {this.state.data.length > 0 ? (
          <View>
            <View>
              <SwipeListView
                data={this.state.data}
                renderItem={this.renderItem}
                renderHiddenItem={this.renderHiddenItem}
                leftOpenValue={0}
                rightOpenValue={-45}
                disableLeftSwipe={false}
                disableRightSwipe={true}
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={styles.contentContainer}
              />
            </View>
            <View style={styles.couponContainer}>
              <View style={styles.footerContainer}>
                <View style={styles.couponContentContainer}>
                  <Image source={require('../assets/images/Icon.png')} />
                  <CommonText
                    text={'Apply Coupon'}
                    color={colors.black}
                    fontSize={responsiveFontSize(1.8)}
                    align="left"
                    fontFamily={fonts.medium}
                  />
                </View>
                <MaterialIcons
                  name="keyboard-arrow-right"
                  color={colors.black}
                  size={20}
                />
              </View>
            </View>
            <View style={styles.priceDetailsContainer}>
              <View>
                <View style={styles.priceDetailsContentContainer}>
                  <CommonText
                    text={'Price'}
                    color={colors.secondGrey}
                    fontSize={responsiveFontSize(1.7)}
                    align="left"
                    fontFamily={fonts.medium}
                  />
                  <CommonText
                    text={'₹370.00'}
                    color={colors.secondGrey}
                    fontSize={responsiveFontSize(1.7)}
                    align="left"
                    fontFamily={fonts.medium}
                  />
                </View>

                <View style={styles.priceDetailsContentContainer}>
                  <CommonText
                    text={'Discount'}
                    color={colors.secondGrey}
                    fontSize={responsiveFontSize(1.7)}
                    align="left"
                    fontFamily={fonts.medium}
                  />
                  <CommonText
                    text={'00.00'}
                    color={colors.secondGrey}
                    fontSize={responsiveFontSize(1.7)}
                    align="left"
                    fontFamily={fonts.medium}
                  />
                </View>
                <View style={styles.priceDetailsContentContainer}>
                  <CommonText
                    text={'Coupons for you '}
                    color={colors.secondGrey}
                    fontSize={responsiveFontSize(1.7)}
                    align="left"
                    fontFamily={fonts.medium}
                  />
                  <CommonText
                    text={'00.00'}
                    color={colors.secondGrey}
                    fontSize={responsiveFontSize(1.7)}
                    align="left"
                    fontFamily={fonts.medium}
                  />
                </View>
                <View style={styles.priceDetailsContentContainer}>
                  <CommonText
                    text={'Delivery Charges'}
                    color={colors.secondGrey}
                    fontSize={responsiveFontSize(1.7)}
                    align="left"
                    fontFamily={fonts.medium}
                  />
                  <CommonText
                    text={'Free'}
                    color={colors.secondGrey}
                    fontSize={responsiveFontSize(1.7)}
                    align="left"
                    fontFamily={fonts.medium}
                  />
                </View>
                <View
                  style={{
                    width: responsiveScreenWidth(90),
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: 20,
                    borderWidth: 1,
                    borderColor: colors.thirdGrey,
                    borderStyle: 'dashed',
                  }}
                />
                <View style={styles.priceDetailsContentContainer}>
                  <CommonText
                    text={'Total'}
                    color={colors.black}
                    fontSize={responsiveFontSize(1.8)}
                    align="left"
                    fontFamily={fonts.bold}
                  />
                  <CommonText
                    text={'₹370.00'}
                    color={colors.black}
                    fontSize={responsiveFontSize(1.8)}
                    align="left"
                    fontFamily={fonts.bold}
                  />
                </View>
              </View>

              <View style={{alignItems: 'center'}}>
                <CommonButton text={'Checkout'} bgColor={colors.lightGreen} />
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.emptyCartContainer}>
            <Image source={require('../assets/images/cartEmpty.png')} />

            <CommonText
              text={'No items are available in the cart right now'}
              color={colors.grey}
              fontSize={responsiveFontSize(1.8)}
              align="left"
              fontFamily={fonts.medium}
            />

            <CommonButton text={'Go to Shopping'} bgColor={colors.lightGreen} />
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.sinupBgColor,
  },
  contentContainer: {
    alignItems: 'center',
  },
  itemContainer: {
    backgroundColor: 'white',
    marginVertical: 5,
    height: responsiveScreenHeight(10),
    width: responsiveScreenWidth(95),
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  imageContainer: {
    width: responsiveScreenWidth(20),
    height: responsiveScreenHeight(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: responsiveScreenWidth(20),
    height: responsiveScreenHeight(20),
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  priceQuantityContainer: {
    flexDirection: 'row',
    width: responsiveScreenWidth(35),
    justifyContent: 'space-between',
  },
  quantityContainer: {
    backgroundColor: colors.thirdGrey,
    height: '90%',
    width: 30,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: 5,
  },
  hiddenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 15,
    backgroundColor: colors.lightGreen,
    marginVertical: 5,
    borderRadius: 10,
  },
  deleteButton: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    width: 50,
  },
  footerContainer: {
    height: responsiveScreenHeight(5),
    width: responsiveScreenWidth(95),
    borderWidth: 2,
    borderColor: colors.lightGreen,
    borderRadius: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingHorizontal: 10,
  },
  couponContainer: {
    alignItems: 'center',
  },
  couponContentContainer: {
    flexDirection: 'row',
    gap: 5,
  },
  priceDetailsContainer: {
    marginVertical: 20,
    justifyContent: 'space-between',
  },
  priceDetailsContentContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: responsiveScreenHeight(12),
    gap: responsiveScreenHeight(12),
  },
});

export default Cart;
