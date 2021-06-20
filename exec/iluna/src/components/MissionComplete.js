import React, {useState} from 'react';
import LottieView from 'lottie-react-native';
import {View, StyleSheet, useWindowDimensions, Text} from 'react-native';

const MissionComplete = props => {
  const [WindowWidth, setWindowWidth] = useState(
    useWindowDimensions().width * 0.5,
  );
  return (
    <View style={[styles.viewContainer, {height: WindowWidth}]}>
      <LottieView
        source={require('../../assets/animations/check.json')}
        autoPlay
        loop={false}
        resizeMode="cover"
      />
      <Text style={styles.textContainer}>미 션 성 공 !</Text>
    </View>
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
    zIndex: 15,

  },
  textContainer: {
    width: '100%',
    textAlign: 'center',
    height: 100,
    position: 'absolute',
    bottom: '-50%',
    fontSize: 35,
    fontWeight: 'bold',
    color: 'blue',
  },
});

export default MissionComplete;
