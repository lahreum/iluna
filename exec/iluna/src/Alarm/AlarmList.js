import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  useWindowDimensions,
  StyleSheet,
  StatusBar,
} from 'react-native';
import styled from 'styled-components/native';
import SingleAlarm from '../components/SingleAlarm';
import AlarmRemain from '../components/AlarmRemain';
import Add from '../../assets/Images/icons/add.png';
import NothingCat from '../../assets/Images/cat/life.png';
import Setting from '../../assets/Images/icons/setting.png';
import {useIsFocused} from '@react-navigation/native';
import MyCrudModule from '../MyCrudModule';
import {TouchableOpacity} from 'react-native-gesture-handler';
import ReactNativeAN from 'react-native-alarm-notification';
import {set} from 'react-native-reanimated';
import {useGlobal} from 'reactn';
//dummy data. 데이터 타입 다 문자열로 해야됨!!!!!!!
//(id는 쓰는데에서 그냥 정수로 보내면 됨)
var myObj = {
  alarm_id: 1,
  alarm_time: '23:32:00',
  alarm_name: '겨울왕국겨울왕국겨울왕국겨울왕국겨울왕국',
  alarm_repeat: '127',
  alarm_bell: 'Good Morning',
  alarm_is_vibe: 'false',
  alarm_is_active: 'true',
  alarm_math: '0',
  alarm_card: '0',
  alarm_picture: 'false',
  alarm_rps: 'false',
};

const Container = styled.View`
  /* align-items: center; */
`;

const TopField = styled.View`
  height: ${({height}) => height * 0.25}px;
  flex-direction: row;
  /* background-color: #ee00ee; */
`;

const LeftField = styled.View`
  width: ${({width}) => width * 0.7}px;
  padding: 40px 0 0 30px;
  /* background-color: #568987; */
`;

const RightField = styled.View`
  width: ${({width}) => width * 0.3}px;
  padding: 10px 10px 10px 0;
  justify-content: flex-end;
  flex-direction: row;
  align-items: flex-end;
  /* background-color: #e87e97; */
`;

const AddIcon = styled.Image`
  width: 50px;
  height: 50px;
  margin-right: 5px;
  tint-color: #a1887f;
`;

const SettingIcon = styled.Image`
  width: 40px;
  height: 40px;
  margin-right: 10px;
  margin-bottom: 5px;
  tint-color: #a1887f;
`;

const Alarms = styled.ScrollView`
  /* flex: 1; */
  height: ${({height}) => height * 0.75}px;
`;

const AlarmList = ({navigation}) => {
  const height = useWindowDimensions().height;
  const width = useWindowDimensions().width;

  const isFocused = useIsFocused();
  const [alarms, setAlarms] = useState([]);
  const [onAlarms, setOnAlarms] = useState([]);
  const [isNothing, setIsNothing] = useState(false);

  // 알람 하나를 선택해 Detail로 감
  const selectAlarm = item => {
    navigation.navigate('AlarmDetail', {item});
  };

  // 알람 생성을 위해 Detail로 감
  const goToAdd = () => {
    const item = {
      noti_id: 0,
      alarm_id: 0,
      alarm_time: '',
      alarm_name: '',
      alarm_repeat: '0',
      alarm_bell: 'adventure',
      alarm_is_vibe: 'false',
      alarm_is_active: 'true',
      alarm_math: '0',
      alarm_card: '0',
      alarm_picture: 'false',
      alarm_rps: 'false',
      alarm_interval: '0',
      alarm_day: new Date().getDay() + '',
      // alarm_day: '1',
    };
    navigation.navigate('AlarmDetail', {item});
  };

  // 알람 On/Off
  const toggleAlarm = async id => {
    const myIndex = alarms.map(item => item.alarm_id).indexOf(id);
    const tmpArr = alarms.slice();
    tmpArr[myIndex].alarm_is_active =
      !JSON.parse(tmpArr[myIndex].alarm_is_active) + '';
    setAlarms(tmpArr);
    const currentAlarm = Object.assign({}, tmpArr[myIndex]);

    // 과거일 경우에 -> 시간 수정
    const tmpTime = currentAlarm.alarm_time;
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
      if (currentAlarm.alarm_interval === '2') {
        newday = new Date(
          tmp.setDate(tmp.getDate() + 7 - (yoil - currentAlarm.alarm_day * 1)),
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
    let dateForFinalObj = DD + '-' + MM + '-' + YYYY + ' ' + tmpTime;

    //////////////////////////////// 알람을 TURN OFF 했을 때
    if (!JSON.parse(tmpArr[myIndex].alarm_is_active)) {
      // LOCAL 삭제
      MyCrudModule.deleteAlarm(
        id * 1,
        success => {
          console.log(success);
          // RN 삭제
          ReactNativeAN.deleteAlarm(id * 1);

          // LOCAL 생성
          currentAlarm.alarm_is_active = false + '';
          MyCrudModule.addAlarm(
            currentAlarm,
            success => {
              MyCrudModule.showAll(
                success => {
                  setAlarms(success);
                  navigation.navigate('AlarmList');
                },
                fail => {
                  console.log(fail);
                },
              );
            },
            fail => {
              console.log(fail);
            },
          );
        },
        fail => {
          console.log(fail);
        },
      );
    }

    //  알람을 TURN ON 했을 때
    if (JSON.parse(tmpArr[myIndex].alarm_is_active)) {
      // LOCAL 삭제
      MyCrudModule.deleteAlarm(
        id * 1,
        async success => {
          console.log(success);
          // RN 생성 -> LOCAL 생성
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
          if (currentAlarm.alarm_interval == '1') {
            repeatInterval = 'daily';
          } else {
            repeatInterval = 'weekly';
          }

          const finalObj = {
            title: 'ILUNA',
            message: notiId + '',
            vibrate:
              JSON.parse(currentAlarm.alarm_is_vibe) === false ? false : true,
            vibration: 0,
            play_sound: true,
            channel: 'wakeup',
            schedule_type:
              currentAlarm.alarm_interval == '0' ? 'once' : 'repeat',
            repeat_interval: repeatInterval,
            interval_value: 1,
            data: {content: 'my notification id is 22'},
            loop_sound: true,
            has_button: false,
            fire_date: dateForFinalObj,
            sound_name: currentAlarm.alarm_bell + '.mp3',
          };

          // 재생성
          try {
            const alarm = await ReactNativeAN.scheduleAlarm(finalObj);

            // LOCAL DB에 저장
            currentAlarm.alarm_id = alarm.id + '';
            currentAlarm.alarm_is_active = true + '';

            MyCrudModule.addAlarm(
              currentAlarm,
              success => {
                MyCrudModule.showAll(
                  success => {
                    console.log(success);
                    setAlarms(success);
                    navigation.navigate('AlarmList');
                  },
                  fail => {
                    console.log(fail);
                  },
                );
              },
              fail => {
                console.log(fail);
              },
            );
          } catch (e) {
            console.log(e);
          }
        },
        fail => {
          console.log(fail);
        },
      );
    }
  };

  const getList = () => {
    MyCrudModule.showAll(
      success => {
        if (success.length == 0) {
          setIsNothing(true);
        } else {
          setIsNothing(false);
        }

        setAlarms(success);
        let tmpOnAlarms = success.filter(a => a.alarm_is_active == 'true');
        setOnAlarms(tmpOnAlarms);
      },
      fail => {
        console.log(fail);
      },
    );
  };

  useEffect(() => {
    getList();
  }, []);

  useEffect(() => {
    getList();
  }, [isFocused]);
  const [isNoti, setIsNoti] = useGlobal('listenerId');
  let a = 0;
  
  useEffect(() => {
    if (isNoti != -1) navigation.navigate('AlarmActivate', {isNoti});
  }, [isNoti]);

  return (
    <Container>
      <StatusBar
        animated={true}
        backgroundColor="#ffffff"
        barStyle="dark-content"
      />
      <TopField height={height}>
        <LeftField width={width}>
          <AlarmRemain onAlarms={onAlarms} />
          {/* <Text
            style={{fontSize: 15, letterSpacing: -1, color: '#e0e0e0'}}
            onPress={() => navigation.navigate('AlarmActivate')}>
            (임시)미션으로 가기
          </Text>
          <Text
          onPress={() => {
            ReactNativeAN.stopAlarmSound();
          }}>
          음악 멈춰!
        </Text> */}
        <Text style={{color:'white'}}>{isNoti}</Text>
        </LeftField>
        <RightField width={width}>
          <TouchableOpacity onPress={() => goToAdd()}>
            <AddIcon source={Add} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Setting');
            }}>
            <SettingIcon source={Setting} />
          </TouchableOpacity>
        </RightField>
      </TopField>
      <Alarms height={height}>
        {isNothing ? (
          <View
            style={{
              height: height * 0.7,
              alignItems: 'center',
              justifyContent: 'center',
              // backgroundColor: '#ff0',
            }}>
            <Image
              style={{
                width: width * 0.4,
                height: height * 0.3,
                marginBottom: -10,
              }}
              source={NothingCat}
            />
            <Text style={styles.nothingTitle}>알람이 없습니다.</Text>
            <Text style={styles.nothingText}>
              우측의 +버튼을 눌러 알람을 만들어주세요!
            </Text>
          </View>
        ) : (
          alarms.map(item => (
            <SingleAlarm
              item={item}
              key={item.alarm_id}
              selectAlarm={selectAlarm}
              toggleAlarm={toggleAlarm}
              navigation={navigation}
              getList={getList}
            />
          ))
        )}
      </Alarms>
    </Container>
  );
};

const styles = StyleSheet.create({
  nothingTitle: {
    color: '#a1887f',
    fontSize: 25,
    letterSpacing: -2,
    fontWeight: 'bold',
  },
  nothingText: {
    color: '#333333',
    fontSize: 15,
    letterSpacing: -1,
  },
});

export default AlarmList;
