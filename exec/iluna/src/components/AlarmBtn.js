import React, {useState} from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import styled from 'styled-components/native';
// import PropTypes from 'prop-types';
import AlarmOff from '../../assets/Images/alarm_off.png';
import AlarmOn from '../../assets/Images/alarm_on.png';

const OnOff = styled.Image`
  width: 80px;
  height: 80px;
  margin: 10px;
`;

const AlarmBtn = ({icon, id, toggleAlarm}) => {
  return (
    <TouchableOpacity onPress={() => toggleAlarm(id)}>
      <View>
        <OnOff source={icon}></OnOff>
      </View>
    </TouchableOpacity>
  );
};

export default AlarmBtn;
