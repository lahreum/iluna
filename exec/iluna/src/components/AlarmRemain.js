import React, {useState, useEffect} from 'react';
import {View, Text, Image, useWindowDimensions, StyleSheet} from 'react-native';
import styled from 'styled-components/native';

const AlarmRemain = ({onAlarms}) => {
  return (
    <View style={{width: '100%', height: 100}}>
      <Text style={styles.nextTime1}>ILUNA</Text>
      <Text style={styles.nextTime2}>한번에 일어나자!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  nextTime1: {
    fontSize: 45,
    fontWeight: 'bold',
    letterSpacing: -3,
    color: '#333333',
  },
  nextTime2: {
    fontSize: 20,
    letterSpacing: -1,
    color: '#424242',
  },
});

export default AlarmRemain;
