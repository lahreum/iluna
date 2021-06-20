import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  Switch,
  TouchableOpacity,
  StatusBar,
  Image,
  ImageBackground,
  NativeEventEmitter,
  NativeModules,
} from 'react-native';
import styled from 'styled-components/native';
import Arrow from '../../assets/Images/icons/arrow.png';
import Circle from '../../assets/Images/icons/circle.png';
import AlarmRepeat from '../components/AlarmRepeat.js';
import TimeWheel from '../components/TimeWheel.js';
import MyCrudModule from '../MyCrudModule';
import ReactNativeAN from 'react-native-alarm-notification';
import {useGlobal, setGlobal} from 'reactn';

const {RNAlarmNotification} = NativeModules;
// const RNEmitter = new NativeEventEmitter(RNAlarmNotification);
const RNAlarmEmitter = new NativeEventEmitter(RNAlarmNotification);

const StyledHeader = styled.View`
  height: 60px;
  width: ${({width}) => width}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #e0e0e0;
  padding-left: 25px;
  padding-right: 25px;
`;

const ClockField = styled.View`
  height: ${({height}) => (height - 60) * 0.4}px;
  /* background-color: #e8a9b3; */
  align-items: center;
  justify-content: center;
`;

const Details = styled.View`
  width: 100%;
  height: ${({height}) => ((height - 60) * 0.6) / 4}px;
  border-top-width: 2px;
  border-top-color: #e0e0e0;
  padding: 20px;
  flex-direction: row;
  align-items: center;
  /* background-color: #9a02f2; */
`;

const ArrowIcon = styled.Image`
  width: 30px;
  height: 30px;
  tint-color: #a1887f;
`;

const InputName = styled.TextInput`
  /* background-color: #fba; */
  align-items: center;
  flex-direction: row;
  justify-content: flex-end;
  width: 100%;
  border-radius: 10px;
  border: solid 1px #e0e0e0;
  font-size: 17px;
  letter-spacing: -1px;
  text-align: right;
  color: #333333;
`;

const AlarmDetail = ({navigation, route}) => {
  const dismissSubscription = RNAlarmEmitter.addListener(
    'OnNotificationDismissed',
    data => {
      console.log(data);
    },
  );

  const openedSubscription = RNAlarmEmitter.addListener(
    'OnNotificationOpened',
    data => {
      navigation.navigate('AlarmActivate');
    },
  );

  const width = useWindowDimensions().width;
  const height = useWindowDimensions().height;

  // 벨소리 데이터들
  const dataBells = [
    {id: 1, name: 'Adventure', src: 'adventure'},
    {id: 2, name: 'Art of Silence', src: 'art_of_silence'},
    {id: 3, name: 'Cherry Metal', src: 'cherry_metal'},
    {id: 4, name: 'Superepic', src: 'superepic'},
    {id: 5, name: 'Sweet Dreams', src: 'sweet_dreams'},
    {id: 6, name: 'Bicycle', src: 'bicycle'},
    {id: 7, name: 'Bliss', src: 'bliss'},
    {id: 8, name: 'Cheer Up', src: 'cheer_up'},
    {id: 9, name: 'Digital World', src: 'digital_world'},
    {id: 10, name: 'Forever Hi', src: 'forever_hi'},
    {id: 11, name: 'Herbal Tea', src: 'herbal_tea'},
    {id: 12, name: 'Heroism', src: 'heroism'},
    {id: 13, name: 'Inspiring Corporate', src: 'inspiring_corporate'},
    {id: 14, name: 'The Inspiration', src: 'the_inspiration'},
    {id: 15, name: 'Warm Memories', src: 'warm_memories'},
  ];

  const convertedBellName = value => {
    let myBellIndex = dataBells.map(item => item.src).indexOf(value);
    let myBellName = dataBells[myBellIndex].name;
    return myBellName;
  };

  // 반복 요일 계산하는 함수 (Bit -> Boolean)
  const BitToBoolean = num => {
    let tmpArr = [false, false, false, false, false, false, false];
    let repeatNum = num * 1;
    for (let i = 0; i < 7; i++) {
      if (repeatNum % 2 == 0) {
        tmpArr[6 - i] = false;
      } else tmpArr[6 - i] = true;
      repeatNum = parseInt(repeatNum / 2);
    }
    return tmpArr;
  };

  // 반복 요일 계산하는 함수 (Boolean -> Bit)
  const BooleanToBit = arr => {
    let tmpNum = 0;
    for (let i = 6; i >= 0; i--) {
      if (arr[i]) {
        tmpNum += Math.pow(2, 6 - i);
      }
    }
    return tmpNum + '';
  };

  // 스케줄 타입, 반복 간격
  const repeatSchedule = () => {
    let tmpArr = [true, false, false];
    let value = route.params.item.alarm_interval * 1;
    if (value == 0) {
      tmpArr = [true, false, false];
    } else if (value == 1) {
      tmpArr = [false, true, false];
    } else if (value == 2) {
      tmpArr = [false, false, true];
    }

    return tmpArr;
  };

  // 미션 갯수 세는 함수
  const countMissions = currentAlarm => {
    var cnt = 0;
    if (currentAlarm.alarm_math != '0') cnt++;
    if (currentAlarm.alarm_card != '0') cnt++;
    if (currentAlarm.alarm_picture != 'false') cnt++;
    if (currentAlarm.alarm_rps != 'false') cnt++;
    return cnt;
  };

  // 수정되는 것들
  const [modifiedAlarm, setModifiedAlarm] = useState(
    Object.assign({}, route.params.item),
  );
  const [tmpVibe, toggleVibe] = useState(
    JSON.parse(route.params.item.alarm_is_vibe),
  );
  const [tmpName, setTmpName] = useState(route.params.item.alarm_name);
  const [isEditing, setIsEditing] = useState(false);
  const [repeatDays, setRepeatDays] = useState(
    BitToBoolean(route.params.item.alarm_repeat),
  );
  const [tmpTime, setTmpTime] = useState(route.params.item.alarm_time);
  const [dateForFinalObj, setDateForFinalObj] = useState('');
  const [myBellName, setMyBellName] = useState(
    convertedBellName(route.params.item.alarm_bell),
  );
  const [repeat, setRepeat] = useState(repeatSchedule());

  // 미션 페이지로 이동
  const goMission = () => {
    navigation.navigate('AlarmMissions', {modifiedAlarm});
  };

  // 벨소리 페이지로 이동
  const goBell = () => {
    navigation.navigate('AlarmBells', {modifiedAlarm});
  };

  // 알람 이름 수정
  const updateAlarm = paramName => {
    const tmpAlarm = Object.assign({}, modifiedAlarm);
    tmpAlarm.alarm_name = paramName;
    setModifiedAlarm(tmpAlarm);
  };

  const _onSubmit = () => {
    if (isEditing) {
      setIsEditing(false);
      setTmpName(tmpName);
      updateAlarm(tmpName);
    }
  };

  // 진동 여부 수정
  const updateVibe = flag => {
    toggleVibe(!flag);
    const tmpAlarm = Object.assign({}, modifiedAlarm);
    tmpAlarm.alarm_is_vibe = !flag + '';
    setModifiedAlarm(tmpAlarm);
  };

  // 요일 On/Off 수정
  const updateDays = (flag, idx) => {
    const tmpAlarm = Object.assign({}, modifiedAlarm);
    const tmpArr = BitToBoolean(tmpAlarm.alarm_repeat);
    tmpArr[idx] = !flag;
    setRepeatDays(tmpArr);
    tmpAlarm.alarm_repeat = BooleanToBit(tmpArr);
    setModifiedAlarm(tmpAlarm);
  };

  // 반복 스케줄 수정
  const updateInterval = value => {
    const tmpAlarm = Object.assign({}, modifiedAlarm);
    let tmpArr = [];
    if (value == 0) {
      tmpArr = [true, false, false];
      tmpAlarm.alarm_interval = 0 + '';
    } else if (value == 1) {
      tmpArr = [false, true, false];
      tmpAlarm.alarm_interval = 1 + '';
    } else if (value == 2) {
      tmpArr = [false, false, true];
      tmpAlarm.alarm_interval = 2 + '';
    }
    setRepeat(tmpArr);
    setModifiedAlarm(tmpAlarm);
  };

  // 시간 수정
  const updateTime = value => {
    const tmpAlarm = Object.assign({}, modifiedAlarm);
    tmpAlarm.alarm_time = value + '';
    setTmpTime(value);
    const day = new Date();
    const year = day.getFullYear();
    const month = day.getMonth() + 1;
    const date = day.getDate();
    const yoil = day.getDay();

    let day2 = new Date(
      year,
      Number(month - 1),
      date,
      tmpTime.slice(0, 2),
      tmpTime.slice(3, 5),
      tmpTime.slice(6, 8),
    );
    let newday = new Date();

    const tmp = new Date();
    if (day >= day2) {
      if (modifiedAlarm.alarm_interval === '2') {
        newday = new Date(
          tmp.setDate(tmp.getDate() + 7 - (yoil - modifiedAlarm.alarm_day * 1)),
        );
      } else {
        newday = new Date(tmp.setDate(tmp.getDate() + 1));
      }
    } else {
      newday = new Date();
    }
    let YYYY = newday.getFullYear();
    let MM = `0${newday.getMonth() + 1}`.slice(-2);
    let DD = newday.getDate();

    setDateForFinalObj(DD + '-' + MM + '-' + YYYY + ' ' + tmpTime);
    setModifiedAlarm(tmpAlarm);
  };
  const [notiId2, setNotiId2] = useGlobal('notiId');
  // 알람 최종 저장
  const saveAlarm = async () => {
    // 최종 객체 만들기
    let today = new Date();
    let tmpMonth = '';
    if (today.getMonth() + 1 < 10) {
      tmpMonth = '0' + (today.getMonth() + 1);
    } else {
      tmpMonth = today.getMonth() + 1;
    }

    let tmpDate = '';
    if (today.getDate() < 10) {
      tmpDate = '0' + today.getDate();
    } else {
      tmpDate = today.getDate();
    }

    let repeatInterval = '';
    if (modifiedAlarm.alarm_interval == '1') {
      repeatInterval = 'daily';
    } else {
      repeatInterval = 'weekly';
    }
    const finalObj = {
      title: 'ILUNA',
      message: notiId2 + '',
      vibrate: JSON.parse(modifiedAlarm.alarm_is_vibe) === false ? false : true,
      vibration: 0,
      play_sound: true,
      channel: 'wakeup',
      schedule_type: modifiedAlarm.alarm_interval == '0' ? 'once' : 'repeat',
      repeat_interval: repeatInterval,
      interval_value: 1,
      data: {content: 'my notification id is 22'},
      loop_sound: true,
      has_button: false,
      fire_date: dateForFinalObj,
      sound_name: modifiedAlarm.alarm_bell + '.mp3',
    };
    // 알람 생성
    if (modifiedAlarm.alarm_id * 1 == 0) {
      // For RNAlarmNotification
      try {
        const alarm = await ReactNativeAN.scheduleAlarm(finalObj);
        // LOCAL DB에 저장
        setGlobal({
          notiId: notiId2 + 1,
        });
        modifiedAlarm.alarm_id = alarm.id + '';
        modifiedAlarm.noti_id = notiId2 + '';

        MyCrudModule.addAlarm(
          modifiedAlarm,
          success => {
            navigation.navigate('AlarmList');
          },
          fail => {
            console.log(fail);
          },
        );
      } catch (e) {
        console.log(e);
      }
    } else {
      // 알람 수정(사실상 기존 꺼 삭제 후 재생성)
      // LOCAL DB 삭제
      MyCrudModule.deleteAlarm(
        modifiedAlarm.alarm_id * 1,
        success => {
          console.log(success);
        },
        fail => {
          console.log(fail);
        },
      );

      // For RNAlarmNotification 삭제
      ReactNativeAN.deleteAlarm(modifiedAlarm.alarm_id * 1);

      // LOCAL DB 재생성
      try {
        const alarm = await ReactNativeAN.scheduleAlarm(finalObj);

        // LOCAL DB에 저장
        modifiedAlarm.alarm_id = alarm.id + '';
        modifiedAlarm.alarm_is_active = true + '';

        MyCrudModule.addAlarm(
          modifiedAlarm,
          success => {
            navigation.navigate('AlarmList');
          },
          fail => {
            console.log(fail);
          },
        );
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <View style={{backgroundColor: '#fff'}}>
      <StatusBar
        animated={true}
        backgroundColor="#ffffff"
        barStyle="dark-content"
      />
      {/* HEADER */}
      <StyledHeader width={width}>
        <Text
          style={styles.headerSideText}
          onPress={() => navigation.reset({routes: [{name: 'AlarmList'}]})}>
          취소
        </Text>
        <Text
          style={styles.headerCenterText}
          onPress={() => console.log('최종???? ', modifiedAlarm)}>
          설정
        </Text>
        <Text
          style={[styles.headerSideText, {color: '#3399FF'}]}
          onPress={() => saveAlarm()}>
          저장
        </Text>
      </StyledHeader>

      {/* CLOCK */}
      <ClockField height={height}>
        <TimeWheel
          height={height}
          width={width}
          updateTime={updateTime}
          initTime={tmpTime}
        />
      </ClockField>

      {/* DETAILS */}
      <Details height={height}>
        <View style={styles.detailTitleContainer}>
          <Text style={styles.detailTitleText}>알람 이름</Text>
        </View>
        <TouchableOpacity
          style={styles.detailContentContainer}
          onPress={() => setIsEditing(true)}>
          {isEditing ? (
            <InputName
              placeholder={modifiedAlarm.alarm_name}
              maxLength={30}
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="done"
              value={tmpName}
              onChangeText={tmpName => {
                setTmpName(tmpName);
                updateAlarm(tmpName);
              }}
              onSubmitEditing={_onSubmit}
            />
          ) : (
            <Text style={styles.detailContentText}>
              {modifiedAlarm.alarm_name}
            </Text>
          )}
        </TouchableOpacity>
      </Details>
      <Details height={height}>
        <View style={styles.detailTitleContainer}>
          <Text style={styles.detailTitleText}>미션</Text>
        </View>
        <View style={styles.detailContentContainer}>
          <TouchableOpacity style={styles.touch} onPress={() => goMission()}>
            <Text style={styles.detailContentText}>
              총 {countMissions(modifiedAlarm)}개
            </Text>
            <ArrowIcon source={Arrow} />
          </TouchableOpacity>
        </View>
      </Details>
      <Details height={height}>
        <View style={styles.detailTitleContainer}>
          <Text style={styles.detailTitleText}>알람음</Text>
        </View>
        <View style={styles.detailContentContainer}>
          <TouchableOpacity style={styles.touch} onPress={() => goBell()}>
            <Text style={styles.detailContentText}>{myBellName}</Text>
            <ArrowIcon source={Arrow} />
          </TouchableOpacity>
        </View>
      </Details>
      <Details height={height}>
        <View style={styles.detailTitleContainer}>
          <Text style={styles.detailTitleText}>반복</Text>
        </View>
        <View style={styles.detailContentContainer}>
          <TouchableOpacity
            style={{marginRight: 5, marginLeft: 5}}
            onPress={() => {
              updateInterval(0);
            }}>
            <ImageBackground
              source={Circle}
              style={styles.circle}
              imageStyle={{tintColor: repeat[0] ? '#a1887f' : '#fff'}}>
              <Text style={{color: repeat[0] ? '#fff' : '#333', fontSize: 15}}>
                한번
              </Text>
            </ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity
            style={{marginRight: 5, marginLeft: 5}}
            onPress={() => {
              updateInterval(1);
            }}>
            <ImageBackground
              source={Circle}
              style={styles.circle}
              imageStyle={{tintColor: repeat[1] ? '#a1887f' : '#fff'}}>
              <Text style={{color: repeat[1] ? '#fff' : '#333', fontSize: 15}}>
                매일
              </Text>
            </ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity
            style={{marginRight: 5, marginLeft: 5}}
            onPress={() => {
              updateInterval(2);
            }}>
            <ImageBackground
              source={Circle}
              style={styles.circle}
              imageStyle={{tintColor: repeat[2] ? '#a1887f' : '#fff'}}>
              <Text style={{color: repeat[2] ? '#fff' : '#333', fontSize: 15}}>
                주간
              </Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>
      </Details>
    </View>
  );
};

const styles = StyleSheet.create({
  touch: {
    // backgroundColor: '#ff0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 10,
    marginRight: -15,
  },
  headerSideText: {
    color: '#333333',
    fontSize: 20,
  },
  headerCenterText: {
    color: '#333333',
    fontSize: 25,
  },
  detailTitleContainer: {
    justifyContent: 'flex-end',
    width: '25%',
  },
  detailTitleText: {
    fontSize: 19,
    color: '#333333',
    letterSpacing: -1,
  },
  detailContentContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 10,
    width: '75%',
  },
  detailContentText: {
    fontSize: 17,
    color: '#333333',
    letterSpacing: -1,
    justifyContent: 'flex-end',
  },
  repeatCircle: {
    width: 40,
    height: 40,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    width: 40,
    height: 40,
    marginLeft: 5,
    marginRight: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AlarmDetail;
