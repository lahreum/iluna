import React, {useEffect, useState} from 'react';
import LottieView from 'lottie-react-native';
import {View, StyleSheet, useWindowDimensions, Text} from 'react-native';

const Timer3Sec = props => {
  const [WindowWidth, setWindowWidth] = useState(
    useWindowDimensions().width * 0.5,
  );
  const onAnimationFinish = () => {
    setWindowWidth(0);
  };

  return (
    <LottieView
      style={[styles.viewContainer, {height: WindowWidth}]}
      source={require('../../assets/animations/timerWhite.json')}
      autoPlay
      loop={false}
      resizeMode="cover"
      onAnimationFinish={onAnimationFinish, props.onAnimationFinish}
    />
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    width: '50%',
    justifyContent: 'center',
    position: 'absolute',
    left: '25%',
    top: '25%',
    zIndex: 10,
    // backgroundColor:'red',
  },
});

export default Timer3Sec;
