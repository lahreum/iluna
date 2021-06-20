import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import styled from 'styled-components/native';
import Circle from '../../assets/Images/icons/circle.png';

const AlarmRepeat = ({day, repeatDays, updateDays}) => {
  // const flag = true;
  var tmpFlag = true;
  var idx = 0;

  if (day == '일') {
    tmpFlag = repeatDays[0];
    idx = 0;
  } else if (day == '월') {
    tmpFlag = repeatDays[1];
    idx = 1;
  } else if (day == '화') {
    tmpFlag = repeatDays[2];
    idx = 2;
  } else if (day == '수') {
    tmpFlag = repeatDays[3];
    idx = 3;
  } else if (day == '목') {
    tmpFlag = repeatDays[4];
    idx = 4;
  } else if (day == '금') {
    tmpFlag = repeatDays[5];
    idx = 5;
  } else if (day == '토') {
    tmpFlag = repeatDays[6];
    idx = 6;
  }

  const [flag, setFlag] = useState(tmpFlag);

  return (
    <TouchableOpacity
      onPress={() => {
        updateDays(flag, idx);
        setFlag(!flag);
      }}>
      <ImageBackground
        source={Circle}
        style={styles.circle}
        imageStyle={{tintColor: flag ? '#a1887f' : '#fff'}}>
        <Text style={{color: flag ? '#fff' : '#333', fontSize: 15}}>{day}</Text>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  circle: {
    width: 30,
    height: 30,
    marginLeft: 5,
    marginRight: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AlarmRepeat;
