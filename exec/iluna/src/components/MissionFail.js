import React, {useState} from 'react';
import LottieView from 'lottie-react-native';
import {View, StyleSheet, useWindowDimensions, Text} from 'react-native';

export default function MissionFail({props}) {
    const [WindowWidth, setWindowWidth] = useState(
        useWindowDimensions().width
    );
  return (
    <View style={[styles.viewContainer, {height: WindowWidth}]}>
      <LottieView
        source={require('../../assets/animations/unapproved-cross.json')}
        autoPlay
        loop={false}
        resizeMode="cover"
        width={170}
        height={170}
      />
      <Text style={styles.textContainer}>일치하지 않습니다</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    // flex: 1,
    // width: '100%',
    // justifyContent: 'center',
    // position: 'absolute',
    // left: '30%',
    // top: '30%',
    // zIndex: 10,
      
    position: 'absolute',
    top: 250,
    left: '30%',
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
      
      
  },
  textContainer: {
    // width: '100%',
    // textAlign: 'center',
    // height: 100,
    // position: 'absolute',
    bottom: '-2%',
    right:'17%',
    fontSize: 35,
    // fontWeight: 'bold',
    color: '#cd5050',
  },
});
