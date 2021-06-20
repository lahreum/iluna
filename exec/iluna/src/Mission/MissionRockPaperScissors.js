import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  NativeModules,
  BackHandler,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import Header from '../components/Header';
import Life from '../../assets/Images/cat/life.png';
import Wait from '../../assets/Images/cat/wait.png';
import Cry from '../../assets/Images/cat/cry.png';
import MissionComplete from '../components/MissionComplete';
import Success from '../components/Success';
import Timer3Sec from '../components/Timer3Sec';
import ReactNativeAN from 'react-native-alarm-notification';

const {init, predict, close} = NativeModules.MissionRockPaperScissors;
init();
// ReactNativeAN.stopAlarmSound();
function PendingView() {
  // 카메라가 로딩 안됐을 때의 로딩화면
  return (
    <View
      style={{
        flex: 1,
        width: ' 100%',
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={{color: 'white', fontSize: 25}}>Loading...</Text>
    </View>
  );
}

function LifeBar(props) {
  // 상단에 이겨야 할 고양이 두마리
  if (props.cnt == 2) {
    return (
      <View
        style={{
          position: 'absolute',
          zIndex: 1,
          flexDirection: 'row',
          top: '6%',
        }}>
        <Image source={Life} style={{width: 60, height: 60}} />
        <Image source={Life} style={{width: 60, height: 60}} />
      </View>
    );
  } else if (props.cnt == 1) {
    return (
      <View
        style={{
          position: 'absolute',
          zIndex: 1,
          flexDirection: 'row',
          top: '6%',
        }}>
        <Image source={Life} style={{width: 60, height: 60}} />
      </View>
    );
  } else {
    // life == 0 일 때 게임 종료
    return (
      <View
        style={{
          position: 'absolute',
          zIndex: 1,
          flexDirection: 'row',
          top: '6%',
        }}></View>
    );
  }
}

export default function MissionRockPaperScissors({navigation}) {
  const [img, setImage] = useState('');
  const [photo, setPhoto] = useState(false);
  // const [count, setCount] = useState(0);
  const handArray = ['Rock', 'Paper', 'Scissors'];
  const [handImg, setHandImg] = useState(null);
  const [camera, setCamera] = useState(null);
  const [match, setMatch] = useState(''); // win, lose, draw
  const [life, setLife] = useState(2);
  const [finish, setFinish] = useState(false);
  const [computer, setComputer] = useState(''); // 컴퓨터가 내는 것
  const [go, setGo] = useState(false);
  const [round, setRound] = useState(0); // 게임 횟수

  var Sound = require('react-native-sound');
  Sound.setCategory('Playback');
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);
  }, []);

  const handleBackPress = () => {
    return true;
  };
  const playRps = () => {
    var rps = new Sound('rps.mp3', Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log(error);
        return;
      }

      rps.setVolume(2.0).play(success => {
        if (success) {
          console.log('successfully finished playing');
        } else {
          console.log('playback failed due to audio decoding errors');
        }
      });
    });
  };

  const playSuccess = () => {
    var success = new Sound('success.mp3', Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log(error);
        return;
      }

      success.setVolume(0.2).play(success => {
        if (success) {
          console.log('successfully finished playing');
        } else {
          console.log('playback failed due to audio decoding errors');
        }
      });
    });
  };

  const playFail = () => {
    var fail = new Sound('fail.mp3', Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }

      fail.setVolume(0.2).play(success => {
        if (success) {
          console.log('successfully finished playing');
        } else {
          console.log('playback failed due to audio decoding errors');
        }
      });
    });
  };

  useEffect(() => {
    // componentWillmount
    const temp = shuffleComputer(); // 손을 처음 한번 shuffle
    setComputer(temp);
  }, []);

  const [didMount, setDidMount] = useState(false);
  useEffect(() => {
    //componentWillUnmount
    setDidMount(true);
    return () => {
      setDidMount(false);
      close();
      // ReactNativeAN.stopAlarmSound();
    };
  }, []);

  useEffect(() => {
    // 3
    if (computer === 'Rock') {
      setHandImg(require('../../assets/Images/rock.png'));
    } else if (computer === 'Paper') {
      setHandImg(require('../../assets/Images/paper.png'));
    } else {
      setHandImg(require('../../assets/Images/scissors.png'));
    }
  }, [computer]);

  useEffect(() => {
    // 손을 다시 찍을때마다 계속 shuffle
    // var rps = new Sound('rps.mp3', Sound.MAIN_BUNDLE);
    if (photo == false) {
      const temp = shuffleComputer();
      setComputer(temp);
      setGo(false);
      countNum();
      playRps();
      setMatch('');
    }
  }, [photo]);

  useEffect(() => {
    if (life == 0) {
      // 게임이 끝나면 화면 이동
      setFinish(true);
      setTimeout(() => {
        console.log('끝');
      }, 3000);
    } else {
      // life가 1,2 일때
      setTimeout(() => {
        setPhoto(false);
      }, 2000); // 2초 후에 다시 카메라
    }
  }, [round]);

  const gameMatch = hand => {
    if (hand == 'None') {
      setMatch('정확한 모양으로 찍어주세요');
    } else {
      if (computer == 'Rock') {
        // 컴퓨터가 주먹일 때
        if (hand == 'Rock') {
          setMatch('비김');
          playFail();
        } else if (hand == 'Paper') {
          win();
          setMatch('승리');
          playSuccess();
        } else {
          setMatch('패배');
          playFail();
        }
      } else if (computer == 'Paper') {
        // 컴퓨터가 보일 때
        if (hand == 'Paper') {
          setMatch('비김');
          playFail();
        } else if (hand == 'Rock') {
          setMatch('패배');
          playFail();
        } else {
          win();
          setMatch('승리');
          playSuccess();
        }
      } else {
        // 컴퓨터가 가위일 때
        if (hand == 'Scissors') {
          setMatch('비김');
          playFail();
        } else if (hand == 'Paper') {
          setMatch('패배');
          playFail();
        } else {
          win();
          setMatch('승리');
          playSuccess();
        }
      }
    }

    let temp = round;
    temp = temp + 1;
    setRound(temp);
  };

  const win = () => {
    let tempLife = life;
    setLife(tempLife - 1);
  };

  const countNum = () => {
    // 2
    setTimeout(() => {
      setGo(true);
    }, 3000); // 3초 후에 고양이 -> 손으로 사진 변경
  };

  const shuffleComputer = () => {
    return handArray[Math.floor(Math.random() * handArray.length)];
  };

  const onAnimationFinish = () => {
    // 3-> 2-> 1 끝나자마자 해야할 일
    takePicture(camera);
  };

  const takePicture = async function (camera) {
    try {
      const options = {quality: 0.5, base64: true, fixOrientation: true};
      const data = await camera.takePictureAsync(options);

      // 사진 받아와져있는 시점
      setImage(data.uri);
      predict(
        data.base64,
        success => {
          // success에 결과가 있음, String으로(Rock, Paper, Scissors, None)
          gameMatch(success);
        },
        fail => {
          console.log(fail);
        },
      );
      setPhoto(true); // 사진찍었음을 알림
    } catch (e) {
      console.log(e);
    }
  };

  if (!photo) {
    // 사진 안찍었으면 카메라 렌즈 실시간 출력
    return (
      <View style={styles.container}>
        <Header>
          <Text>가위바위보 2승</Text>
        </Header>
        <LifeBar cnt={life} />
        <Timer3Sec onAnimationFinish={onAnimationFinish} />
        <RNCamera
          ref={ref => {
            setCamera(ref);
          }}
          style={styles.preview}
          captureAudio={false}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.off}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}>
          {({status}) => {
            if (status !== 'READY') return <PendingView />;
            return (
              // 로딩 완료 시점에서(??) 3초 세는 함수 발동 시작
              <View style={{position: 'absolute', right: '0%', bottom: '0%'}}>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#A1887F',
                    width: 100,
                    height: 100,
                  }}>
                  {!go ? (
                    <Image
                      source={Wait}
                      style={{
                        backgroundColor: '#A1887F',
                        width: 100,
                        height: 100,
                      }}
                    />
                  ) : (
                    <Image
                      source={handImg}
                      resizeMode="contain"
                      style={{
                        backgroundColor: '#A1887F',
                        width: 70,
                        height: 80,
                      }}
                    />
                  )}
                </View>
              </View>
            );
          }}
        </RNCamera>
      </View>
    );
  } else {
    // 사진 찍었으면 찍은 이미지를 보여줌
    return (
      <View style={styles.container}>
        <Header>
          <Text>[미션] 가위바위보 2승</Text>
        </Header>
        <LifeBar cnt={life} />
        <Image source={{uri: img}} style={styles.preview} />
        {finish ? (
          <Success navigation={navigation} />
        ) : (
          <View
            style={{
              position: 'absolute',
              top: 10,
              left: 0,
              right: 0,
              bottom: 0,
              justifyContent: 'center',
              alignItems: 'center',
              }}>
              {
                match == '정확한 모양으로 찍어주세요'
                  ?
                  <Text style={{ fontSize: 30, color: 'white' }}>{match}</Text>
                  :
                  <Text style={{fontSize: 85, color: 'white'}}>{match}</Text>  
              }
            
          </View>
        )}
        <View style={{position: 'absolute', right: '0%', bottom: '0%'}}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#A1887F',
              width: 100,
              height: 100,
            }}>
            {finish ? (
              <Image source={Cry} style={{width: 100, height: 100}} />
            ) : (
              <Image
                source={handImg}
                resizeMode="contain"
                style={{width: 70, height: 80}}
              />
            )}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 4,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    borderRadius: 5,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});
