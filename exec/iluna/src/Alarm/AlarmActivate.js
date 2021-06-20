/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {
  Image,
  View,
  Button,
  Text,
  StyleSheet,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  Vibration,
  BackHandler,
} from 'react-native';
import MyCrudModule from '../MyCrudModule';
import ReactNativeAN from 'react-native-alarm-notification';
import {setGlobal} from 'reactn';

class AlarmActivate extends Component {
  state = {
    info: [],
    randomedInfo: [],
    date: '', // 알람이 울리는 일자
    time: '', // 화면에 표시될 시간(12시간 형식)
    noon: '', // 오전? 오후?
    name: '', // 알람 내용
    backHandler: BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackPress,
    ), // 뒤로가기 막기
  };

  noonOrNot = props => {
    let temp = props;
    let split_temp = temp.split(':');
    let ojeon;
    let parse;

    if (split_temp[0] == 12) {
      ojeon = '오후';
      parse = split_temp[0];
    } else if (split_temp[0] > 12) {
      ojeon = '오후';
      parse = split_temp[0] - 12;
    } else if (split_temp[0] < 12) {
      ojeon = '오전';
      parse = split_temp[0];
    }

    this.setState({
      time: parse + ' : ' + split_temp[1],
      noon: ojeon,
    });
  };

  setDate = () => {
    let today = new Date();
    let month = today.getMonth() + 1; // 월
    let date = today.getDate(); // 날짜
    let day = today.getDay(); // 요일

    if (day == 1) {
      day = '월';
    } else if (day == 2) {
      day = '화';
    } else if (day == 3) {
      day = '수';
    } else if (day == 4) {
      day = '목';
    } else if (day == 5) {
      day = '금';
    } else if (Day == 6) {
      day = '토';
    } else {
      day = '일';
    }

    let temp = month + '/' + date + '(' + day + ')';

    this.setState({
      date: temp,
    });
  };

  constructor(props) {
    super(props);
    let tmp = [];
    MyCrudModule.showDetailByNotiId(
      Number(props.route.params.isNoti),
      success => {
        this.noonOrNot(success['alarm_time']);
        this.setDate();

        if (success['alarm_picture'] == 'true') {
          tmp.push(['Photo', 0]);
        }
        if (success['alarm_rps'] == 'true') {
          tmp.push(['RPS', 0]);
        }
        if (success['alarm_math'] * 1 > 0) {
          tmp.push(['Math', success['alarm_math']]);
        }
        if (success['alarm_card'] * 1 > 0) {
          tmp.push(['Card', success['alarm_card']]);
        }
        let idx = Math.floor(Math.random() * tmp.length);
        this.setState({
          info: tmp,
          randomedInfo: tmp[idx],
          name: success['alarm_name'],
        });
      },
      fail => {
        console.log(fail);
      },
    );

  }
  handleBackPress() {
    return true;
  }
  UNSAFE_componentWillMount() {}
  componentDidMount() {}
  render() {
    return (
      <View style={styles.mainView}>
        <ImageBackground
          style={{width: '100%', height: '100%'}}
          resizeMode="cover"
          source={require('../../assets/Images/alarmBg.jpeg')}
        />
        <View
          style={{
            position: 'absolute',
            top: '10%',
            left: '10%',
            color: '#333333',
          }}>
          <Text style={{fontSize: 40, marginLeft: '3%'}}>
            {this.state.noon}
          </Text>
          <Text style={{fontSize: 60}}>{this.state.time}</Text>
          <Text style={{fontSize: 30, marginLeft: '3%'}}>
            {this.state.date}
          </Text>
        </View>
        <View
          style={{
            position: 'absolute',
            bottom: '27%',
            color: '#333333',
            zIndex: 2,
          }}>
          <Text style={{fontSize: 25}}>{this.state.name}</Text>
        </View>
        <ImageBackground
          style={styles.cat}
          source={require('../../assets/Images/cat/alarm.png')}
        />
        {this.state.info.length == 0 ? (
          <TouchableOpacity
            style={[styles.btn, {bottom: '15%'}]}
            onPress={() => {
              this.props.navigation.navigate('AlarmList');
              ReactNativeAN.stopAlarmSound();
              setGlobal({
                listenerId: -1,
              });
            }}>
            <Text style={styles.btnName}> 확 인 </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.btn, {bottom: '15%'}]}
            onPress={() => {
              this.props.navigation.navigate(this.state.randomedInfo[0], {
                level: Number(this.state.randomedInfo[1]),
              });
            }}>
            <Text style={styles.btnName}> 미션하러가기 </Text>
          </TouchableOpacity>
        )}

        {/* <TouchableOpacity
          style={[styles.btn, {top: '70%'}]}
          onPress={() => {
            this.props.navigation.navigate('Math', {level: 1});
          }}>
          <Text style={styles.btnName}> 수 학 </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.btn, {top: '50%'}]}
          onPress={() => {
            this.props.navigation.navigate('Card', {level: 1});
          }}>
          <Text style={styles.btnName}> 카 드 </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.btn, {top: '30%'}]}
          onPress={() => {
            this.props.navigation.navigate('Photo');
          }}>
          <Text style={styles.btnName}> 사 물 </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btn, {top: '10%'}]}
          onPress={() => {
            this.props.navigation.navigate('RPS');
          }}>
          <Text style={styles.btnName}> 가위바위보 </Text>
        </TouchableOpacity> */}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    marginTop: 50,
    width: '80%',
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    position: 'absolute',
    borderRadius: 10,
    elevation: 10,
  },
  cat: {
    position: 'absolute',
    top: '42%',
    left: '40%',
    width: 300,
    height: 300,
  },
  btnName: {
    fontSize: 25,
  },
});
export default AlarmActivate;
