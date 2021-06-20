import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  BackHandler,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import Header from '../components/Header';
import CameraBtn from '../../assets/Images/camera_button.png';
import Reload from '../../assets/Images/reload_icon.png';
import Success from '../components/Success';
import MissionFail from '../components/MissionFail';
import Change from '../../assets/Images/change.png';
import Tflite from 'tflite-react-native';

const model = new Tflite();

model.loadModel(
  {
    model: 'object_detection.tflite',
    labels: 'object_detection_labelmap.txt',
    numThreads: 1,
  },
  (err, res) => {
    if (err) console.log(err);
    else console.log('MissionPhoto model loaded');
  },
);

function PendingView() {
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

export default function MissionPhoto({navigation}) {
  const [img, setImage] = useState('');
  const [object, setObject] = useState('');
  const [photo, setPhoto] = useState(false);
  const [result, setResult] = useState(false);
  const [idx, setIdx] = useState(0);
  const [click, setClick] = useState(false);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);
  }, []);

  const [objectArray, setObjectArray] = useState([
    '고양이를',
    '강아지를',
    '가방을',
    '공을',
    '와인잔을',
    '가위를',
    '컵을',
    '바나나를',
    '사과를',
    '오렌지를',
    '의자를',
    '화분을',
    '변기를',
    '텔레비전을',
    '노트북을',
    '마우스를',
    '리모컨을',
    '키보드를',
    '세면대를',
    '칫솔을',
    '냉장고를',
    '전자레인지를',
    '책을',
    '시계를',
    '곰인형을',
  ]);

  const [objectArray2, setObjectArray2] = useState([
    'cat',
    'dog',
    'backpack',
    'sports ball',
    'wine glass',
    'scissors',
    'cup',
    'banana',
    'apple',
    'orange',
    'chair',
    'potted plant',
    'toilet',
    'tv',
    'laptop',
    'mouse',
    'remote',
    'keyboard',
    'sink',
    'toothbrush',
    'refrigerator',
    'microwave',
    'book',
    'clock',
    'teddy bear',
  ]);

  var Sound = require('react-native-sound');
  Sound.setCategory('Playback');

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
  const handleBackPress = () => {
    return true;
  };
  const playFail = () => {
    var fail = new Sound('fail.mp3', Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log(error);
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
    for (let i = 0; i < objectArray.length; i++) {
      let j = Math.floor(Math.random() * (i + 1));
      [objectArray[i], objectArray[j]] = [objectArray[j], objectArray[i]];
      [objectArray2[i], objectArray2[j]] = [objectArray2[j], objectArray2[i]];
    }

    setObjectArray(objectArray);
    setObjectArray2(objectArray2);
    setObject(objectArray[0]);
  }, []);

  useEffect(() => {
    if (result) {
      setTimeout(() => {
        // ReactNativeAN.stopAlarmSound();
        navigation.navigate('AlarmList');
      }, 3000);
    }
  }, [result]);

  useEffect(() => {
    if (photo) {
      setClick(false);
    }
  }, [photo]);

  const shuffleObject = () => {
    let temp = idx + 1;
    if (temp == objectArray.length) temp = 0;
    setIdx(temp);
    return objectArray[temp];
  };

  const checkObject = arr => {
    let isFind = false;

    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < objectArray2.length; j++) {
        if (arr[i] == objectArray2[idx]) {
          isFind = true;
          break;
        } else if (objectArray2[j] == 'backpack') {
          if (arr[i] == 'handbag' || arr[i] == 'suitcase') {
            isFind = true;
            break;
          }
        } else if (objectArray2[j] == 'chair') {
          if (arr[i] == 'bench') {
            isFind = true;
            break;
          }
        }
      }

      if (isFind) break;
    }

    if (isFind) {
      setResult(true);
      setPhoto(true);
      playSuccess();
    } else {
      setResult(false);
      setPhoto(true);
      playFail();
    }
  };

  const takePicture = async function (camera) {
    const options = {quality: 0.5, base64: true, fixOrientation: true};
    const data = await camera.takePictureAsync(options);
    setImage(data.uri);

    model.detectObjectOnImage(
      {
        path: data.uri,
        model: 'SSDMobileNet',
        imageMean: 127.5,
        imageStd: 127.5,
        threshold: 0.3,
        numResultsPerClass: 1,
      },
      (err, res) => {
        if (err) console.log(err);
        else {
          let objectList = [];

          for (let i = 0; i < res.length; i++)
            objectList.push(res[i].detectedClass);
        }
      },
    );
  };

  if (!photo) {
    // 사진 안찍었으면 카메라 렌즈 실시간 출력
    return (
      <View style={styles.container}>
        <Header>
          <Text>랜덤 사물 찍기</Text>
        </Header>
        <RNCamera
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
          {({camera, status}) => {
            if (status !== 'READY') return <PendingView />;
            return (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                <View
                  style={{
                    marginBottom: 20,
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}>
                  <Text style={{fontSize: 28, color: 'white'}}>
                    {object} 찍어주세요!
                  </Text>
                  <TouchableOpacity onPress={() => setObject(shuffleObject())}>
                    <Image
                      source={Change}
                      style={{
                        width: 28,
                        height: 28,
                        // marginTop: 5,
                        marginLeft: 15,
                      }}
                    />
                  </TouchableOpacity>
                </View>
                <View
                  style={{position: 'absolute', bottom: '-260%', zIndex: 1}}>
                  {!click ? (
                    <TouchableOpacity
                      onPress={() => [takePicture(camera), setClick(true)]}
                      style={styles.capture}>
                      <Image
                        resizeMode="contain"
                        source={CameraBtn}
                        style={{width: 82, height: 82}}
                      />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      disabled={true}
                      onPress={() => [takePicture(camera)]}
                      style={styles.capture}>
                      <Image
                        source={CameraBtn}
                        style={{width: 82, height: 82}}
                      />
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            );
          }}
        </RNCamera>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            backgroundColor: 'white',
          }}></View>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Header>
          <Text>랜덤 사물 찍기</Text>
        </Header>
        <Image source={{uri: img}} style={styles.preview} />
        {result ? <Success navigation={navigation} /> : <MissionFail />}
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            backgroundColor: 'white',
          }}>
          {!result ? (
            <TouchableOpacity
              onPress={() => setPhoto(false)}
              style={styles.capture}>
              <Image source={Reload} style={{width: 60, height: 60}} />
            </TouchableOpacity>
          ) : (
            <View style={{position: 'absolute', bottom: '8%', zIndex: 1}}>
              <View style={styles.capture}>
                <Image source={CameraBtn} style={{width: 82, height: 82}} />
              </View>
            </View>
          )}
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
