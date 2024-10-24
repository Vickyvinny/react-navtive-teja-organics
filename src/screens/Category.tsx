// HomeScreen.tsx
import React from 'react';
import { View, Text } from 'react-native';
import { NavigationProp, RouteProp } from '@react-navigation/native';


interface IProps{
  navigation: NavigationProp<any>;
  route: RouteProp<any, any>;
};

class CartScreen extends React.Component<IProps> {
  render() {
    return (
      <View>
        <Text>CartScreen Screen</Text>
      </View>
    );
  }
}

export default CartScreen;
