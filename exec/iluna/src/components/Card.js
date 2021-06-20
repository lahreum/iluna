/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component, useContext} from 'react';
import CardContext from '../contexts/CardContext';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Image,
  ImageBackground,
} from 'react-native';

var Sound = require('react-native-sound');
var cardfail = null;
var cardsuccess = null;

export default class animatedbasic extends Component {
  static contextType = CardContext;
  _isMounted = false;
  state = {
    animal: '',
    idx: 0,
    clickTrg: false,
  };

  UNSAFE_componentWillMount() {
    this.animal = this.props.animal;
    this.idx = this.props.idx;
    this.setState({
      idx: this.props.idx,
      animal: this.props.animal,
    });
    if (this.animal === 'bear') {
      this.src = require('../../assets/Images/cardImg/bear.jpg');
    } else if (this.animal === 'bird') {
      this.src = require('../../assets/Images/cardImg/bird.jpg');
    } else if (this.animal === 'chick') {
      this.src = require('../../assets/Images/cardImg/chick.jpg');
    } else if (this.animal === 'cow') {
      this.src = require('../../assets/Images/cardImg/cow.jpg');
    } else if (this.animal === 'dog') {
      this.src = require('../../assets/Images/cardImg/dog.jpg');
    } else if (this.animal === 'fox') {
      this.src = require('../../assets/Images/cardImg/fox.jpg');
    } else if (this.animal === 'panda') {
      this.src = require('../../assets/Images/cardImg/panda.jpg');
    } else if (this.animal === 'penguin') {
      this.src = require('../../assets/Images/cardImg/penguin.jpg');
    }

    this.animatedValue = new Animated.Value(0);
    this.value = 0;
    this.animatedValue.addListener(({value}) => {
      this.value = value;
    });
    this.frontInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg'],
    });
    this.backInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['180deg', '360deg'],
    });

    cardfail = new Sound('fail.mp3', Sound.MAIN_BUNDLE);
    cardsuccess = new Sound('success.mp3', Sound.MAIN_BUNDLE);
  }

  // 컴포넌트가 만들어지고 첫렌더링을 한후에 3초뒤 카드가 뒤집어 지고 클릭을 할수 있게 바뀐다
  componentDidMount() {
    this._ismounted = true;
    setTimeout(() => {
      this.flipCard();
      this.setState(prev => {
        return {
          clickTrg: true,
        };
      });
    }, 3000);
  }
  componentWillUnmount() {
    this._ismounted = false;
  }

  // 컴포넌트가 리렌더링을 마친후 실행되는데
  componentDidUpdate() {
    // 카드 2개를 골랐을 때 두개가 서로 다르면 해당카드만 뒤집고

    if (
      this.context.check.length === 4 &&
      this.context.check[0] !== this.context.check[2] &&
      this.context.check.includes(this.state.idx)
    ) {
      this.props.popCheck(this.state.idx);
      setTimeout(() => {
        this.setState(prev => {
          return {
            clickTrg: false,
          };
        });
      }, 1100);
      setTimeout(() => {
        this.flipCard();
      }, 800);
      setTimeout(() => {
        this.setState(prev => {
          return {
            clickTrg: true,
          };
        });
      }, 1500);
      this.cardFail();
    }

    if (
      this.context.check.length === 4 &&
      this.context.check[0] === this.context.check[2] &&
      this.context.check.includes(this.state.idx)
    ) {
      setTimeout(() => {
        this.cardSuccess();
        this.setState(prev => {
          return {
            clickTrg: false,
          };
        });
        this.props.popCheckWhoSame(this.state.idx);
      }, 300);
      setTimeout(() => {
        this.setState(prev => {
          return {
            clickTrg: true,
          };
        });
      }, 1500);
    }

    if (
      this.context.check.length === 4 &&
      !this.context.check.includes(this.state.idx)
    ) {
      setTimeout(() => {
        this.setState(prev => {
          return {
            clickTrg: false,
          };
        });
      });
      setTimeout(() => {
        this.setState(prev => {
          return {
            clickTrg: true,
          };
        });
      }, 1000);
    }
  }

  cardFail = () => {
    cardfail.setVolume(0.2).play();
  };
  cardSuccess = () => {
    cardsuccess.setVolume(0.2).play();
  };
  flipCard() {
    if (this.value >= 90) {
      Animated.spring(this.animatedValue, {
        toValue: 0,
        friction: 8,
        tension: 100,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.spring(this.animatedValue, {
        toValue: 180,
        friction: 8,
        tension: 100,
        useNativeDriver: true,
      }).start();
    }
    this.setState({
      clickTrg: false,
    });
  }
  render() {
    const frontAnimatedStyle = {
      transform: [{rotateY: this.frontInterpolate}],
    };
    const backAnimatedStyle = {
      transform: [{rotateY: this.backInterpolate}],
    };
    
    return (
      // <View style={styles.container}>
      <TouchableOpacity
        style={styles.container}
        disabled={
          this.context.doneCheck.includes(this.state.idx) ||
          !this.state.clickTrg
            ? true
            : false || this.context.check.length == 4
            ? true
            : false
        }
        onPress={() => [
          this.flipCard(),
          this.props.select(this.state.animal, this.state.idx),
        ]}>
        <Animated.View style={[frontAnimatedStyle, styles.flipCard]}>
          <Image style={styles.card} source={this.src}></Image>
        </Animated.View>

        <Animated.View
          style={[backAnimatedStyle, styles.flipCard, styles.flipCardBack]}>
          <Image
            style={styles.card}
            source={require('../../assets/Images/cardImg/cardBackCat.png')}></Image>
        </Animated.View>
      </TouchableOpacity>
      // </View>
      //   </CardContext.Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 60,
    height: 90,
    margin: '5%',
    // elevation: 5,
    // borderRadius: 3,
    // backgroundColor: 'red',
  },
  card: {
    width: 60,
    height: 90,
    borderRadius: 10,
    // borderColor: 'gray',
    borderWidth: 1,
  },
  flipCard: {
    width: 60,
    height: 90,
    alignItems: 'center',
    justifyContent: 'center',
    backfaceVisibility: 'hidden',
    // elevation: 1,
    borderRadius: 10,
    borderWidth: 1,
    zIndex: 8,
  },
  flipCardBack: {
    position: 'absolute',
    top: 0,
    // elevation: 1,
  },
});
