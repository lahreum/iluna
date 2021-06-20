import React, {useState} from 'react';
import styled from 'styled-components/native';
// import PropTypes from 'prop-types';
import AlarmBtn from './AlarmBtn.js';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import AlarmOff from '../../assets/Images/alarm_off.png';
import AlarmOn from '../../assets/Images/alarm_on.png';
import Delete from '../../assets/Images/icons/delete.png';
import MyCrudModule from '../MyCrudModule';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import ReactNativeAN from 'react-native-alarm-notification';

const Container = styled.View`
  /* flex: 1; */
  /* width: ${({width}) => width - 40}px; */
  width: ${({width}) => width}px;
  height: ${({height}) => (height * 0.75) / 4.5}px;
  /* height: 125px; */
  flex-direction: row;
  /* align-items: center; */
  background-color: #ffffff;
  /* background-color: ${({theme}) => theme.itemBackground}; */
  border-bottom-width: 2px;
  border-bottom-color: #e0e0e0;
  padding: 5px 5px 8px 5px;
  /* margin: 3px 0; // 상 우 하 좌 */
`;

const LeftField = styled.View`
  width: ${({width}) => width * 0.7}px;
  padding: 0 25px 0 10px;
  /* background-color: #689fff; */
`;

const RightField = styled.View`
  width: ${({width}) => width * 0.3}px;
  padding: 0 10px 0 0;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* background-color: #586; */
`;

const SingleAlarm = ({item, toggleAlarm, selectAlarm, getList}) => {
  const width = useWindowDimensions().width;
  const height = useWindowDimensions().height;

  let days = ['일', '월', '화', '수', '목', '금', '토'];

  // 시간 분할하기
  let convertedTime = {ap: '', hour: '', min: ''};
  let substr1 = item.alarm_time.substring(0, 2);
  let substr2 = item.alarm_time.substring(3, 5);

  if (substr1 * 1 < 12) {
    convertedTime.ap = '오전';
    if (substr1 * 1 < 10) {
      convertedTime.hour = substr1.substring(1, 2);
    } else {
      convertedTime.hour = substr1;
    }
    if (convertedTime.hour * 1 == 0) {
      convertedTime.hour = '12';
    }
  } else {
    convertedTime.ap = '오후';
    convertedTime.hour = substr1 * 1 - 12 + '';
    if (convertedTime.hour * 1 == 0) {
      convertedTime.hour = '12';
    }
  }
  convertedTime.min = substr2;

  // 알람 Swipe 삭제
  const renderRightActions = () => {
    // ReactNativeAN.deleteAlarm(item.alarm_id * 1);

    const pressDelete = () => {
      MyCrudModule.deleteAlarm(
        item.alarm_id * 1,
        success => {
          console.log(success);
        },
        fail => {
          console.log(fail);
        },
      );
      ReactNativeAN.deleteAlarm(item.alarm_id * 1);
      getList();
    };

    return (
      <View
        style={{
          width: '30%',
          backgroundColor: '#EFAFAF',
          alignItems: 'center',
          justifyContent: 'center',
          borderBottomColor: '#e0e0e0',
          borderBottomWidth: 2,
        }}>
        <TouchableOpacity onPress={() => pressDelete()}>
          <Image
            source={Delete}
            style={{
              width: 35,
              height: 35,
              margin: 30,
            }}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <Swipeable
      friction={2}
      rightThreshold={20}
      overshootRight={false}
      renderRightActions={renderRightActions}>
      <Container width={width} height={height}>
        <TouchableOpacity
          style={{width: '100%', flex: 1}}
          onPress={() => selectAlarm(item)}>
          <LeftField width={width}>
            <View style={styles.time}>
              <Text
                style={[
                  styles.time1,
                  {
                    color:
                      item.alarm_is_active == 'true' ? '#333333' : '#e0e0e0',
                  },
                ]}>
                {convertedTime.ap}
              </Text>
              <Text
                style={[
                  styles.time2,
                  {
                    color:
                      item.alarm_is_active == 'true' ? '#333333' : '#e0e0e0',
                  },
                ]}>
                {convertedTime.hour} : {convertedTime.min}
              </Text>
            </View>
            {/* 입력이 글자수 제한 걸려서 들어왔기 때문에 그대로 받아도 된다. */}
            <Text
              style={[
                styles.label,
                {color: item.alarm_is_active == 'true' ? '#333333' : '#e0e0e0'},
              ]}>
              {item.alarm_name}
            </Text>
          </LeftField>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => selectAlarm(item)}>
          <RightField width={width}>
            <AlarmBtn
              icon={item.alarm_is_active == 'true' ? AlarmOn : AlarmOff}
              id={item.alarm_id}
              toggleAlarm={toggleAlarm}
            />
            <View style={{flexDirection: 'row'}}>
              {item.alarm_interval == '0' ? (
                <Text
                  style={[
                    styles.days,
                    {
                      color:
                        item.alarm_is_active == 'true' ? '#A1887F' : '#e0e0e0',
                    },
                  ]}>
                  한 번만
                </Text>
              ) : (
                <></>
              )}
              {item.alarm_interval == '1' ? (
                <Text
                  style={[
                    styles.days,
                    {
                      color:
                        item.alarm_is_active == 'true' ? '#A1887F' : '#e0e0e0',
                    },
                  ]}>
                  매일 반복
                </Text>
              ) : (
                <></>
              )}
              {item.alarm_interval == '2' ? (
                <Text
                  style={[
                    styles.days,
                    {
                      color:
                        item.alarm_is_active == 'true' ? '#A1887F' : '#e0e0e0',
                    },
                  ]}>
                  {days[item.alarm_day]}요일마다
                </Text>
              ) : (
                <></>
              )}
            </View>
          </RightField>
        </TouchableOpacity>
      </Container>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  time: {
    alignItems: 'center',
    flexDirection: 'row',
    height: '60%',
  },
  time1: {
    fontSize: 25,
    // backgroundColor: '#ffff22',
    alignItems: 'flex-end',
    letterSpacing: -1,
    marginRight: 10,
    paddingTop: 8,
  },
  time2: {
    fontSize: 40,
    // backgroundColor: '#ffffff',
    justifyContent: 'center',
    letterSpacing: -1,
  },
  label: {
    height: '40%',
    // alignItems: 'flex-end',
    textAlignVertical: 'center',
    marginTop: -8,
    letterSpacing: -1,
    // backgroundColor: '#f50',
  },
  days: {
    // backgroundColor: '#65a602',
    marginTop: -5,
    // marginRight: 5,
    fontSize: 13,
  },
});

export default SingleAlarm;
