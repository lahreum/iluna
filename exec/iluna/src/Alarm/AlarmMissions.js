import React, {Component, useEffect, useState} from 'react';
import {
  View,
  Text,
  useWindowDimensions,
  StyleSheet,
  Button,
  TouchableOpacity,
  StatusBar,
  Modal,
} from 'react-native';
import styled from 'styled-components/native';
import AlarmMission from '../components/AlarmMission.js';
import Close from '../../assets/Images/icons/close.png';

const StyledHeader = styled.View`
  height: 60px;
  width: ${({width}) => width}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  /* background-color: #e0e0e0; */
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 20px;
`;

const CloseIcon = styled.Image`
  width: 35px;
  height: 35px;
  tint-color: #333333;
`;

const AlarmMissions = ({navigation, route}) => {
  const width = useWindowDimensions().width;
  const height = useWindowDimensions().height;

  // const [modifiedAlarm, setModifiedAlarm] = useState(
  //   Object.assign({}, route.params.modifiedAlarm),
  // );
  var modifiedAlarm = Object.assign({}, route.params.modifiedAlarm);

  const [isModalMath, setModalMath] = useState(false);
  const [isModalCard, setModalCard] = useState(false);

  // 수학/카드 미션을 위한 Boolean 변수
  const toBoolean = num => {
    var tmpNum = num * 1;
    if (tmpNum == 0) {
      return false;
    } else {
      return true;
    }
  };

  // 미션들 선택 여부 - 사진찍기, 가위바위보, 수학풀기, 카드게임
  const [isSelectedPicture, togglePicture] = useState(
    JSON.parse(route.params.modifiedAlarm.alarm_picture),
  );
  const [isSelectedRps, toggleRps] = useState(
    JSON.parse(route.params.modifiedAlarm.alarm_rps),
  );
  const [isSelectedMath, toggleMath] = useState(
    toBoolean(route.params.modifiedAlarm.alarm_math),
  );
  const [isSelectedCard, toggleCard] = useState(
    toBoolean(route.params.modifiedAlarm.alarm_card),
  );

  // 난이도 - 수학풀기, 카드게임
  const [lvMath, setLvMath] = useState(
    route.params.modifiedAlarm.alarm_math === '0'
      ? 2
      : route.params.modifiedAlarm.alarm_math * 1,
  );
  const [lvCard, setLvCard] = useState(
    route.params.modifiedAlarm.alarm_card === '0'
      ? 2
      : route.params.modifiedAlarm.alarm_card * 1,
  );

  // 미션 아이콘들 클릭했을 때
  const selectMissions = idx => {
    if (idx == 0) {
      // 사진 찍기
      const tmpPicture = !isSelectedPicture;
      togglePicture(tmpPicture);
    } else if (idx == 1) {
      // 가위바위보
      const tmpRps = !isSelectedRps;
      toggleRps(tmpRps);
    } else if (idx == 2) {
      // 수학 풀기
      if (isSelectedMath) {
        toggleMath(false);
        // setLvMath(0);
        // modifiedAlarm.alarm_math = '0';
      } else {
        setModalMath(true);
        toggleMath(true);
      }
    } else if (idx == 3) {
      // 카드 게임
      if (isSelectedCard) {
        toggleCard(false);
        // setLvCard(0);
        // modifiedAlarm.alarm_card = '0';
      } else {
        setModalCard(true);
        toggleCard(true);
      }
    }
  };

  // 수학 풀기 난이도 저장
  const saveLvMath = () => {
    toggleMath(true);
    setModalMath(false);
  };

  // 카드 게임 난이도 저장
  const saveLvCard = () => {
    toggleCard(true);
    setModalCard(false);
  };

  // 최종 보내기 함수들
  const setModifiedAlarm = () => {
    if (isSelectedPicture) {
      modifiedAlarm.alarm_picture = 'true';
    } else {
      modifiedAlarm.alarm_picture = 'false';
    }

    if (isSelectedRps) {
      modifiedAlarm.alarm_rps = 'true';
    } else {
      modifiedAlarm.alarm_rps = 'false';
    }

    if (isSelectedMath) {
      modifiedAlarm.alarm_math = lvMath + '';
    } else {
      modifiedAlarm.alarm_math = '0';
    }

    if (isSelectedCard) {
      modifiedAlarm.alarm_card = lvCard + '';
    } else {
      modifiedAlarm.alarm_card = '0';
    }

    let item = Object.assign({}, modifiedAlarm);
    navigation.reset({
      routes: [{name: 'AlarmList'}, {name: 'AlarmDetail', params: {item}}],
    });
  };

  return (
    <View>
      <StatusBar
        animated={true}
        backgroundColor="#ffffff"
        barStyle="dark-content"
      />
      {/* HEADER */}
      <StyledHeader width={width}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <CloseIcon source={Close} />
        </TouchableOpacity>
      </StyledHeader>

      {/* TITLE */}
      <Text style={styles.title}>미션을 선택해주세요 :)</Text>
      <Text style={styles.desc}>원하는 미션들을 모두 선택해주세요.</Text>
      <Text style={styles.desc}>선택된 미션들 중 랜덤으로 실행됩니다!</Text>

      {/* CONTENTS */}
      <View style={styles.missionContainer}>
        <View>
          <AlarmMission
            name={'사진 찍기'}
            selectMissions={selectMissions}
            isSelected={isSelectedPicture}
            idx={`0`}
          />
          <AlarmMission
            name={'수학 풀기'}
            selectMissions={selectMissions}
            isSelected={isSelectedMath}
            idx={`2`}
          />
        </View>
        <View>
          <AlarmMission
            name={'가위바위보'}
            selectMissions={selectMissions}
            isSelected={isSelectedRps}
            idx={`1`}
          />
          <AlarmMission
            name={'카드 게임'}
            selectMissions={selectMissions}
            isSelected={isSelectedCard}
            idx={`3`}
          />
        </View>
      </View>
      <TouchableOpacity
        onPress={() => setModifiedAlarm()}
        style={{alignItems: 'center', marginBottom: 100}}>
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>확 인</Text>
        </View>
      </TouchableOpacity>

      {/* MODAL-MATH */}
      <Modal visible={isModalMath} animationType={'fade'} transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>난이도 선택</Text>
            <View style={styles.modalLevels}>
              <TouchableOpacity
                onPress={() => setLvMath(1)}
                style={[
                  {backgroundColor: lvMath == 1 ? '#a1887f' : '#fff'},
                  styles.modalLevel,
                ]}>
                <Text style={styles.modalLevelTitle}>쉬 움</Text>
                <Text style={styles.modalLevelEx}>36 + 28 = ?</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setLvMath(2)}
                style={[
                  {backgroundColor: lvMath == 2 ? '#a1887f' : '#fff'},
                  styles.modalLevel,
                ]}>
                <Text style={styles.modalLevelTitle}>보 통</Text>
                <Text style={styles.modalLevelEx}>25 × 8 = ?</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setLvMath(3)}
                style={[
                  {backgroundColor: lvMath == 3 ? '#a1887f' : '#fff'},
                  styles.modalLevel,
                ]}>
                <Text style={styles.modalLevelTitle}>어려움</Text>
                <Text style={styles.modalLevelEx}>(35 × 11) + 12 = ?</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.modalSave} onPress={() => saveLvMath()}>
              확 인
            </Text>
          </View>
        </View>
      </Modal>

      {/* MODAL-CARD */}
      <Modal visible={isModalCard} animationType={'fade'} transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>난이도 선택</Text>
            <View style={styles.modalLevels}>
              <TouchableOpacity
                onPress={() => setLvCard(1)}
                style={[
                  {backgroundColor: lvCard == 1 ? '#a1887f' : '#fff'},
                  styles.modalLevel,
                ]}>
                <Text style={styles.modalLevelTitle}>쉬 움</Text>
                <Text style={styles.modalLevelEx}>4 × 2 장</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setLvCard(2)}
                style={[
                  {backgroundColor: lvCard == 2 ? '#a1887f' : '#fff'},
                  styles.modalLevel,
                ]}>
                <Text style={styles.modalLevelTitle}>보 통</Text>
                <Text style={styles.modalLevelEx}>4 × 3 장</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setLvCard(3)}
                style={[
                  {backgroundColor: lvCard == 3 ? '#a1887f' : '#fff'},
                  styles.modalLevel,
                ]}>
                <Text style={styles.modalLevelTitle}>어려움</Text>
                <Text style={styles.modalLevelEx}>4 × 4 장</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.modalSave} onPress={() => saveLvCard()}>
              확 인
            </Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    letterSpacing: -1,
    color: '#333333',
    marginLeft: 43,
    marginTop: 20,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  desc: {
    fontSize: 16,
    letterSpacing: -1,
    color: '#333333',
    marginLeft: 43,
    marginTop: 3,
  },
  missionContainer: {
    padding: 55,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  buttonContainer: {
    backgroundColor: '#a1887f',
    width: 300,
    height: 55,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 10,
  },
  modalContainer: {
    backgroundColor: 'rgba(52, 52, 52, 0.5)',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    width: '65%',
    height: '40%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  modalTitle: {
    fontSize: 25,
    color: '#333333',
    width: '85%',
    textAlign: 'left',
    margin: 20,
    letterSpacing: -1,
  },
  modalLevels: {
    width: '100%',
    height: '60%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  modalLevel: {
    borderRadius: 30,
    width: '85%',
    height: '25%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 3,
  },
  modalLevelTitle: {
    fontSize: 20,
    color: '#333333',
    marginLeft: 15,
  },
  modalLevelEx: {
    fontSize: 18,
    color: '#bbbbbb',
    marginRight: 15,
    letterSpacing: -1,
  },
  modalSave: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    width: '85%',
    textAlign: 'right',
    margin: 20,
    letterSpacing: 2,
  },
});

export default AlarmMissions;
