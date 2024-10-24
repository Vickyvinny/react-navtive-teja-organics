import React, { Component, ReactNode } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import { responsiveHeight } from 'react-native-responsive-dimensions';

interface IProps {
  children: ReactNode;
}

class KeyboardWrapper extends Component<IProps, {}> {
  render() {
    return (
      <KeyboardAvoidingView
        // behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            {this.props.children}
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    justifyContent: 'space-between',
    minHeight: '100%',
  },
});

export default KeyboardWrapper;
