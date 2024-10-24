import React, {Component} from 'react';
import {
  FlatList,
  Image,
  ImageSourcePropType,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CommonText from '../components/CommonText';
import {fonts} from '../constants/fonts';
import {bsData} from '../utils/BestSellerData';
import {colors} from '../utils/Colors';

interface ApplyCoupon {
  id: number;
  image: ImageSourcePropType | undefined;
  title: string;
  price: string;
  quantity: number;
}

interface IProps {}

interface IState {
  selectedId: number | null;
}

class ApplyCouponScreen extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      selectedId: null,
    };
  }

  handleActiveCouponCart = (id: number) => {
    this.setState(prevState => ({
      selectedId: prevState.selectedId === id ? null : id,
    }));
  };

  renderItem = ({item}: {item: ApplyCoupon}) => {
    const isSelected = this.state.selectedId === item.id;

    return (
      <TouchableOpacity
        style={[styles.itemContainer, isSelected && styles.isActiveStyles]}
        onPress={() => this.handleActiveCouponCart(item.id)}>
        {isSelected && (
          <View
            style={{
              position: 'absolute',
              width: 40,
              height: 40,
              backgroundColor: colors.white,
              right: -10,
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
              top: -15,
            }}>
            <AntDesign name="check" size={20} color={colors.black} />
          </View>
        )}
        <View style={styles.imageContainer}>
          <Image source={item.image} style={styles.image} />
        </View>
        <View style={styles.textContainer}>
          <CommonText
            text={'Get 25% off your entire purchase of $99 or more'}
            color={colors.black}
            fontSize={12}
            align="left"
            fontFamily={fonts.medium}
          />
          <View>
            <CommonText
              text={'expires :'}
              color={colors.black}
              fontSize={11}
              align="left"
              fontFamily={fonts.bold}
            />
            <View style={{flexDirection: 'row', gap: 40}}>
              <CommonText
                text={'10 July 2023'}
                color={colors.lightGreen}
                fontSize={12}
                align="left"
                fontFamily={fonts.bold}
              />
              <CommonText
                text={'CODE: TJO156'}
                color={colors.black}
                fontSize={16}
                align="left"
                fontFamily={fonts.bold}
              />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  emptyComponent = () => (
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

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Search Coupon"
            style={styles.textInput}
            placeholderTextColor={colors.grey}
          />
          <TouchableOpacity style={styles.checkButtonContainer}>
            <AntDesign name="check" size={20} color={colors.white} />
          </TouchableOpacity>
        </View>
        <FlatList
          data={bsData}
          renderItem={this.renderItem}
          keyExtractor={item => item.id.toString()}
          ListEmptyComponent={this.emptyComponent}
        />
      </View>
    );
  }
}

export default ApplyCouponScreen;

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
  textInput: {
    flex: 1,
    color: colors.black,
  },
  checkButtonContainer: {
    backgroundColor: colors.green,
    height: '100%',
    width: '15%',
    position: 'absolute',
    right: 0,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainer: {
    marginTop: 20,
    padding: 15,
    flexDirection: 'row',
    gap: 20,
    backgroundColor: colors.white,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  isActiveStyles: {
    borderWidth: 3,
    borderColor: colors.green,
    elevation: 5,
  },
  textContainer: {
    marginTop: 10,
    gap: 5,
    width: responsiveScreenWidth(60),
  },
  image: {
    width: responsiveScreenWidth(15),
    height: responsiveScreenHeight(6),
  },
  imageContainer: {
    width: responsiveScreenWidth(20),
    height: responsiveScreenHeight(10),
    backgroundColor: colors.sinupBgColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
});
