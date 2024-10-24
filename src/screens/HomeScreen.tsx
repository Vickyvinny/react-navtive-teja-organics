import {NavigationProp, RouteProp} from '@react-navigation/native';
import React, {Component} from 'react';
import {FlatList, StatusBar, View} from 'react-native';
import {responsiveScreenHeight} from 'react-native-responsive-dimensions';
import {connect} from 'react-redux';
import BestSeller from '../components/BestSeller';
import HeaderComponent from '../components/HeaderComponent';
import HomeCarousal from '../components/HomeCarousal';
import HomeFlatlistItem from '../components/HomeFlatlistItem';
import HomeScreenProducts from '../components/HomeScreenProducts';
import {bestSellerAction} from '../redux/reducer/auth';
import {AppDispatch, RootState} from '../redux/store';
import {colors} from '../utils/Colors';

interface IProps {
  navigation: NavigationProp<any>;
  route: RouteProp<any, any>;
  bestSellerAction: () => void;
}
const data = [
  {key: '1', type: 'header'},
  {key: '2', type: 'carousel'},
  {key: '3', type: 'bestseller'},
  {key: '4', type: 'flatlistItem'},
  {key: '5', type: 'products'},
];
class HomeScreen extends Component<IProps> {
  componentDidMount() {
    this.props.bestSellerAction();
  }

  renderItem = ({item}: {item: {type: string}}) => {
    switch (item.type) {
      case 'header':
        return <HeaderComponent navigation={this.props.navigation} />;
      case 'carousel':
        return <HomeCarousal />;
      case 'bestseller':
        return <BestSeller />;
      case 'flatlistItem':
        return <HomeFlatlistItem />;
      case 'products':
        return <HomeScreenProducts />;
      default:
        return null;
    }
  };

  render() {
    return (
      <View>
        <StatusBar
          backgroundColor={'rgba(0,0,0,0)'}
          translucent={true}
          barStyle={'light-content'}
        />
        <FlatList
          data={data}
          renderItem={this.renderItem}
          keyExtractor={item => item.key}
          contentContainerStyle={{
            backgroundColor: colors.sinupBgColor,
            minHeight: responsiveScreenHeight(100),
          }}
          showsVerticalScrollIndicator={false}
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
