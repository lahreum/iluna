import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import LottieView from 'lottie-react-native';
import {View, StyleSheet, useWindowDimensions, Text} from 'react-native';
import ReactNativeAN from 'react-native-alarm-notification';
import {useGlobal, setGlobal} from 'reactn';
export default function Success(props) {
  const [WindowWidth, setWindowWidth] = useState(useWindowDimensions().width);
  const Finish = () => {
    setGlobal({
      listenerId: -1,
    });
    props.navigation.navigate('AlarmList');
    ReactNativeAN.stopAlarmSound();
  };
  return (
    <View style={[styles.viewContainer, {height: WindowWidth}]}>
      <LottieView
        source={require('../../assets/animations/success-confetti.json')}
        autoPlay
        loop={false}
        resizeMode="cover"
        onAnimationFinish={Finish}
      />
      <Text style={styles.textContainer}>미션성공</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    // flex: 1,
    // width: '50%',
    // justifyContent: 'center',
    // position: 'absolute',
    // left: '25%',
    // top: '25%',
    // zIndex: 10,
    position: 'absolute',
    top: 130,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 20,
  },
  textContainer: {
    width: '100%',
    textAlign: 'center',
    height: 100,
    position: 'absolute',
    bottom: '0%',
    fontSize: 40,
    // fontWeight: 'bold',
    color: '#50d05c',
  },
});
