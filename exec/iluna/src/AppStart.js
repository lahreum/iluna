/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {
  View,
  Image,
} from 'react-native';
import Start from '../assets/Images/start.png';

class AppStart extends Component {
  render() {
    return (
      <View>
        <Image source={Start} style={{ flex: 1, width:'100%'}}/>
      </View>
    );
  }
}

export default AppStart;
