/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, {Component} from 'react';
import {
  Image,
  View,
  Button,
  Text,
  StyleSheet,
  TextInput,
  ImageBackground,
  Vibration,
  StatusBar,
} from 'react-native';

const Header = props => {
  return (
    <View style={styles.v}>
      <StatusBar
          animated={true}
          backgroundColor="#ffffff"
          barStyle="dark-content"
      />
      <Text style={styles.missionName}>{props.children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  v: {
    alignItems: 'center',
    width: '100%',
    backgroundColor:'white'
  },
  missionName: {
    alignItems: 'center',
    color: '#333333',
    height: 50,
    fontSize: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
});
export default Header;
