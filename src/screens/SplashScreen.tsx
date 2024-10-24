import React, {Component} from 'react';
import {Image, ImageBackground, StyleSheet, View} from 'react-native';
import {allImages} from '../assets/images';

class SplashScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={allImages.banner}
          resizeMode="cover"
          style={styles.backgroundImage}>
          <ImageBackground
            source={allImages.loginBanner}
            resizeMode="cover"
            style={styles.backgroundImage}>
            <View style={styles.innerContainer}>
              <Image source={allImages.splashLogo} />
              <Image source={allImages.splashBottomImage} />
            </View>
          </ImageBackground>
        </ImageBackground>
      </View>
    );
  }
}

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
