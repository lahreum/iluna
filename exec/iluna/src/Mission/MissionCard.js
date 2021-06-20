/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React, {Component, useContext} from 'react';
import {
  Image,
  View,
  Text,
  StyleSheet,
  ImageBackground,
  BackHandler,
} from 'react-native';
import Header from '../components/Header';
import Card from '../components/Card';
import CardContext from '../contexts/CardContext';
import Success from '../components/Success';
import Timer3Sec from '../components/Timer3Sec';

class MissionCard extends Component {

  _isMounted = false;
  constructor(props) {
    super(props);
    const lev = props.route.params ? props.route.params.level : null;

    if (lev === 1) {
      this.state = {
        animals: [
          ['bear', 1],
          ['bird', 2],
          ['chick', 3],
          ['cow', 4],
          ['bear', 5],
          ['bird', 6],
          ['chick', 7],
          ['cow', 8],
        ],
        level: lev,
        animalCount: 8,
        shuffle: array => {
          array.sort(() => Math.random() - 0.5);
        },
        tmp1: [],
        tmp2: [],
        tmp: [],
        check: [],
        doneCheck: [],
        trg: 0,
        mTop: 0,
        cnt: 0,
        catCase: require('../../assets/Images/cat/close.png'),
        startMessage: true,
        loading: false,
        backHandler: BackHandler.addEventListener(
          'hardwareBackPress',
          this.handleBackPress,
        ),
      };
    } else if (lev === 2) {
      this.state = {
        animals: [
          ['bear', 1],
          ['bird', 2],
          ['chick', 3],
          ['cow', 4],
          ['dog', 5],
          ['fox', 6],
          ['bear', 7],
          ['bird', 8],
          ['chick', 9],
          ['cow', 10],
          ['dog', 11],
          ['fox', 12],
        ],
        level: lev,
        animalCount: 12,
        shuffle: array => {
          array.sort(() => Math.random() - 0.5);
        },
        tmp1: [],
        tmp2: [],
        tmp3: [],
        tmp: [],
        check: [],
        doneCheck: [],
        trg: 0,
        mTop: 0,
        cnt: 0,
        catCase: require('../../assets/Images/cat/close.png'),
        startMessage: true,
        loading: false,
        backHandler: BackHandler.addEventListener(
          'hardwareBackPress',
          this.handleBackPress,
        ),
      };
    } else if (lev === 3) {
      this.state = {
        animals: [
          ['bear', 1],
          ['bird', 2],
          ['chick', 3],
          ['cow', 4],
          ['dog', 5],
          ['fox', 6],
          ['panda', 7],
          ['penguin', 8],
          ['bear', 9],
          ['bird', 10],
          ['chick', 11],
          ['cow', 12],
          ['dog', 13],
          ['fox', 14],
          ['panda', 15],
          ['penguin', 16],
        ],
        level: lev,
        animalCount: 16,
        shuffle: array => {
          array.sort(() => Math.random() - 0.5);
        },
        tmp1: [],
        tmp2: [],
        tmp3: [],
        tmp4: [],
        tmp: [],
        check: [],
        doneCheck: [],
        isSame: -1,
        trg: 0,
        mTop: 0,
        cnt: 0,
        catCase: require('../../assets/Images/cat/close.png'),
        startMessage: true,
        loading: false,
        backHandler: BackHandler.addEventListener(
          'hardwareBackPress',
          this.handleBackPress,
        ),
      };
    }
  }
  handleBackPress() {
    return true;
  }
  componentDidMount() {
    this._isMounted = true;

    if (this._isMounted) {
      setTimeout(() => {
        this.setState(prev => {
          return {
            startMessage: false,
          };
        });
      }, 3000);
    }
  }
  UNSAFE_componentWillMount() {
    this.state.shuffle(this.state.animals);
    if (this.state.level === 1) {
      this.setState(prev => {
        return {
          tmp1: this.state.animals.slice(0, 4),
          tmp2: this.state.animals.slice(4, 8),
          mTop: prev.mTop * 50,
        };
      });
    } else if (this.state.level === 2) {
      this.setState({
        tmp1: this.state.animals.slice(0, 4),
        tmp2: this.state.animals.slice(4, 8),
        tmp3: this.state.animals.slice(8, 12),
        mTop: this.state.mTop * 50,
      });
    } else if (this.state.level === 3) {
      this.setState({
        tmp1: this.state.animals.slice(0, 4),
        tmp2: this.state.animals.slice(4, 8),
        tmp3: this.state.animals.slice(8, 12),
        tmp4: this.state.animals.slice(12, 16),
        mTop: this.state.mTop * 50,
      });
    }
  }
  componentWillUnmount() {
    this.setState({
      startMessage: true,
    });
  }

  selectCard = (animal, idx) => {

    this.setState(prev => {
      return {
        check: prev.check.concat([animal, idx]),
        trg: 1,
        doneCheck: prev.doneCheck.concat(idx),
      };
    });
  };

  popCheck = i => {
    this.setState(prev => {
      return {
        check: [],
        isSame: -1,
        trg: 1,
        doneCheck: prev.doneCheck.filter(x => x !== i),
        catCase: require('../../assets/Images/cat/card_no.png'),
      };
    });
  };
  popCheckWhoSame = idx => {
    this.setState(prev => {
      return {
        check: [],
        isSame: -1,
        trg: 1,
        cnt: prev.cnt + 1,
        catCase: require('../../assets/Images/cat/card_yes.png'),
      };
    });
  };
  setPosition = lev => {
    if (lev === 1) {
      return {
        flex: 1,
        flexDirection: 'row',
        marginBottom: '25%',
        marginTop: 150,
      };
    } else if (lev === 2) {
      return {
        flex: 1,
        flexDirection: 'row',
        marginBottom: '1%',
        marginTop: 100,
      };
    } else if (lev === 3) {
      return {
        flex: 1,
        flexDirection: 'row',
        marginBottom: '5%',
        marginTop: 50,
      };
    }
  };

  render() {
    const mapToCard = data => {
      return data.map((animal, i) => {
        return (
          <CardContext.Provider
            value={{
              isSame: this.state.isSame,

              check: this.state.check,
              idx: animal[1],
              doneCheck: this.state.doneCheck,
              animalCount: this.state.animalCount,
            }}
            key={i}>
            <Card
              animal={animal[0]}
              idx={animal[1]}
              check={this.state.check}
              select={this.selectCard}
              whatLen={this.whatLen}
              popCheck={this.popCheck}
              popCheckWhoSame={this.popCheckWhoSame}
              isSame={this.state.isSame}
              trg={this.state.trg}
              doneCheck={this.state.doneCheck}
              key={i}></Card>
          </CardContext.Provider>
        );
      });
    };

    return (
      <View style={[{flex: 1}]}>
        <Header>
          <Text>카드짝 맞추기</Text>
        </Header>
        {this.state.startMessage && <Timer3Sec />}

        {this.state.startMessage && (
          <Text style={styles.startMessage}>카드가 곧 뒤집어집니다</Text>
        )}
        {this.state.doneCheck.length === this.state.animalCount && (
          <Success navigation={this.props.navigation} />
        )}
        <View
          style={[
            styles.colView,
            this.state.doneCheck.length === this.state.animalCount
              ? {opacity: 0.65}
              : {opacity: 1},
          ]}>
          <ImageBackground
            style={{flex: 1}}
            source={require('../../assets/Images/cardImg/cardBackground.jpg')}>
            <View style={this.setPosition(this.state.level)}>
              {mapToCard(this.state.tmp1)}
            </View>
            <View style={styles.rowView}>
              {this.state.tmp2
                ? mapToCard(this.state.tmp2)
                : mapToCard(this.state.tmp)}
            </View>
            <View style={styles.rowView}>
              {this.state.tmp3
                ? mapToCard(this.state.tmp3)
                : mapToCard(this.state.tmp)}
            </View>
            <View style={styles.rowView}>
              {this.state.tmp4
                ? mapToCard(this.state.tmp4)
                : mapToCard(this.state.tmp)}
            </View>

            {/* <Card animal={'bear'}></Card> */}
            <View style={{height: '20%'}}></View>
          </ImageBackground>
        </View>
        <Image
          style={{
            width: '60%',
            height: '25%',
            position: 'absolute',
            bottom: '-5%',
            left: '20%',
            resizeMode: 'contain',
          }}
          source={this.state.catCase}></Image>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  colView: {
    flex: 1,

    flexDirection: 'column',
  },

  rowView: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 1,
    marginTop: 1,
    // justifyContent: 'space-around',
  },
  startMessage: {
    width: '100%',
    textAlign: 'center',
    position: 'absolute',
    top: '8%',
    zIndex: 15,
    fontSize: 30,
    color: 'white',
  },
});

export default MissionCard;
