// HomeScreen.tsx
import {NavigationProp, RouteProp} from '@react-navigation/native';
import React from 'react';
import {Text, View} from 'react-native';

interface IProps {
  navigation: NavigationProp<any>;
  route: RouteProp<any, any>;
}

class ProfileScreen extends React.Component<IProps> {
  render() {
    return (
      <View>
        <Text>ProfileScreen Screen</Text>
      </View>
    );
  }
}

export default ProfileScreen;
