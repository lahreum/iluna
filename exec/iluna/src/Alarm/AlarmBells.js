import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  useWindowDimensions,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import styled from 'styled-components/native';
import Close from '../../assets/Images/icons/close.png';
import SingleBell from '../components/SingleBell.js';
import MyCrudModule from '../MyCrudModule';
import Sound from 'react-native-sound';

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

const StyledList = styled.ScrollView`
  height: ${({height}) => height - 200}px;
`;

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

const bellArr = [];
for (let i = 0; i < dataBells.length; i++) {
  bellArr.push(new Sound(dataBells[i].src + '.mp3', Sound.MAIN_BUNDLE));
}

const AlarmBells = ({navigation, route}) => {
  const width = useWindowDimensions().width;
  const height = useWindowDimensions().height;

  const [bells, setBells] = useState(route.params.modifiedAlarm.alarm_bell);
  const currentRinging = useRef(1);

  const selectBell = idx => {
    if (currentRinging.current != -1) {
      bellArr[currentRinging.current].stop();
    }
    setBells(dataBells[idx].src);
    bellArr[idx].setVolume(0.8).play();
    currentRinging.current = idx;
  };

  const updateBell = () => {
    const item = Object.assign({}, route.params.modifiedAlarm);
    item.alarm_bell = bells;
    navigation.reset({
      routes: [{name: 'AlarmList'}, {name: 'AlarmDetail', params: {item}}],
    });
  };

  useEffect(() => {
    return () => {
      bellArr[currentRinging.current].stop();
    };
  }, []);

  return (
    <View>
      <StatusBar
        animated={true}
        backgroundColor="#ffffff"
        barStyle="dark-content"
      />
      {/* HEADER */}
      <StyledHeader width={width}>
        <TouchableOpacity
          onPress={() => {
            bellArr[currentRinging.current].stop();
            navigation.goBack();
          }}>
          <CloseIcon source={Close} />
        </TouchableOpacity>
        <Text
          style={{color: '#3399FF', letterSpacing: -1, fontSize: 20}}
          onPress={() => {
            bellArr[currentRinging.current].stop();
            updateBell();
          }}>
          선택
        </Text>
      </StyledHeader>

      {/* CONTENTS */}
      <Text style={styles.title}>벨소리 선택</Text>
      <StyledList height={height} persistentScrollbar={true}>
        {dataBells.map(item => (
          <SingleBell
            item={item}
            key={item.id}
            selectedBell={bells}
            selectBell={selectBell}
          />
        ))}
      </StyledList>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    height: 50,
    fontSize: 30,
    letterSpacing: -1,
    color: '#333333',
    marginLeft: 43,
    marginTop: 20,
    fontWeight: 'bold',
  },
  bell: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#ff0',
  },
});

export default AlarmBells;
