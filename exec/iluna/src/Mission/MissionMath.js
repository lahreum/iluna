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
  Text,
  StyleSheet,
  TextInput,
  ImageBackground,
  Vibration,
  Dimensions,
  BackHandler,
} from 'react-native';
import Header from '../components/Header';
import Success from '../components/Success';

var Sound = require('react-native-sound');
var fail = null;
var success = null;

class MissionMath extends Component {
  constructor(props) {
    super(props);
    const onedigits = Math.floor(Math.random() * 10 + 1);
    const twodigits1 = Math.floor(Math.random() * 90 + 10);
    const twodigits2 = Math.floor(Math.random() * 90 + 10);
    const case1 = `${twodigits1} + ${twodigits2} = ?`;
    const case2 = `${twodigits1} X ${onedigits} = ?`;
    const case3 = `( ${twodigits1} X ${onedigits} ) + ${twodigits2} = ?`;
    const ans1 = twodigits1 + twodigits2;
    const ans2 = twodigits1 * onedigits;
    const ans3 = twodigits1 * onedigits + twodigits2;
    const lev = props.route.params ? props.route.params.level : null;

    fail = new Sound('fail.mp3', Sound.MAIN_BUNDLE);
    success = new Sound('success.mp3', Sound.MAIN_BUNDLE);

    this.state = {
      onedigits: onedigits,
      twodigits1: twodigits1,
      twodigits2: twodigits2,
      level: lev,
      catCase: require('../../assets/Images/cat/happy.png'),
      question: case1,
    };
    if (lev === 1) {
      this.state = {
        onedigits: onedigits,
        twodigits1: twodigits1,
        twodigits2: twodigits2,
        level: lev,
        catCase: require('../../assets/Images/cat/happy.png'),
        question: case1,
        answer: ans1,
        correct: false,
        WindowWidth: Dimensions.get('window').width,
        WindowHeight: Dimensions.get('window').height,
        backHandler: BackHandler.addEventListener(
          'hardwareBackPress',
          this.handleBackPress,
        ),
      };
    } else if (lev === 2) {
      this.state = {
        onedigits: onedigits,
        twodigits1: twodigits1,
        twodigits2: twodigits2,
        level: lev,
        catCase: require('../../assets/Images/cat/happy.png'),
        question: case2,
        answer: ans2,
        correct: false,
        WindowWidth: Dimensions.get('window').width,
        WindowHeight: Dimensions.get('window').height,
        backHandler: BackHandler.addEventListener(
          'hardwareBackPress',
          this.handleBackPress,
        ),
      };
    } else if (lev === 3) {
      this.state = {
        onedigits: onedigits,
        twodigits1: twodigits1,
        twodigits2: twodigits2,
        level: lev,
        catCase: require('../../assets/Images/cat/happy.png'),
        question: case3,
        answer: ans3,
        correct: false,
        WindowWidth: Dimensions.get('window').width,
        WindowHeight: Dimensions.get('window').height,
        backHandler: BackHandler.addEventListener(
          'hardwareBackPress',
          this.handleBackPress,
        ),
      };
    }
  }

  onChangeInput = event => {
    this.setState({
      myAnswerInput: event,
    });
  };

  enterPress = event => {
    if (this.state.answer == this.state.myAnswerInput) {
      this.Success();
      this.setState({
        catCase: require('../../assets/Images/cat/rightAnswer.png'),
        correct: true,
      });
      // ReactNativeAN.stopAlarmSound();
    } else {
      this.Fail();
      this.setState({
        catCase: require('../../assets/Images/cat/unhappy.png'),
      });
      Vibration.vibrate(500);
    }
  };
  Fail = () => {
    fail.setVolume(0.2).play();
  };
  Success = () => {
    success.setVolume(0.2).play();
  };

  handleBackPress() {
    return true;
  }
  render() {
    return (
      <View style={styles.mainView}>
        <Header>
          <Text>수학문제 풀기</Text>
        </Header>
        {this.state.correct && <Success navigation={this.props.navigation} />}
        <ImageBackground
          source={require('../../assets/Images/classroom.png')}
          style={[
            {width: this.state.WindowWidth, height: this.state.WindowHeight},
            this.state.correct ? {opacity: 0.8} : {opacity: 1},
          ]}>
          <Text style={styles.question}>{this.state.question}</Text>
          <Image source={this.state.catCase} style={styles.cat} />
          <TextInput
            autoFocus={true}
            placeholder="정답을 입력해주세요"
            placeholderTextColor="#333333"
            style={[
              styles.input,
              this.state.correct ? {opacity: 0.3} : {opacity: 1},
            ]}
            onChangeText={this.onChangeInput}
            keyboardType="number-pad"
            returnKeyType="done"
            onSubmitEditing={this.enterPress}
            blurOnSubmit={false}
          />
        </ImageBackground>

        {/* </ImageBackground> */}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  mainView: {
    alignItems: 'center',
    flex: 1,
  },
  question: {
    position: 'absolute',
    top: '23%',
    left: '7%',
    color: 'white',
    fontSize: 40,
  },

  input: {
    width: '60%',
    position: 'absolute',
    height: 60,
    fontSize: 20,
    top: '48%',
    left: '20%',
    textAlign: 'center',
    borderColor: 'black',
    backgroundColor: 'white',
    borderWidth: 1,
    color: '#333333',
    zIndex: 15,
  },
  cat: {
    position: 'absolute',
    top: '30%',
    right: '3%',
    width: '25%',
    height: '20%',
  },
});

export default MissionMath;
