import React, {useState} from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';
import styled from 'styled-components/native';
import Card from '../../assets/Images/missions/card.png';
import Camera from '../../assets/Images/missions/camera.png';
import Math from '../../assets/Images/missions/math.png';
import Rps from '../../assets/Images/missions/rps.png';

const StyledIcon = styled.Image`
  width: 60px;
  height: 60px;
  tint-color: #333333;
`;

const MissionContainer = styled.View`
  background-color: #e0e0e0;
  border-radius: 30px;
  border-width: 6px;
  border-style: solid;
  border-color: ${({isSelected}) => (isSelected ? '#a1887f' : '#fff')};
  width: 130px;
  height: 130px;
  margin: 10px;
  justify-content: center;
  align-items: center;
`;

const AlarmMission = ({name, selectMissions, idx, isSelected}) => {
  return (
    <TouchableOpacity onPress={() => selectMissions(idx)}>
      <MissionContainer isSelected={isSelected}>
        {idx != 0 || <StyledIcon source={Camera} />}
        {idx != 1 || <StyledIcon source={Rps} />}
        {idx != 2 || <StyledIcon source={Math} />}
        {idx != 3 || <StyledIcon source={Card} />}
        <Text style={styles.missionName}>{name}</Text>
      </MissionContainer>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  missionName: {
    fontSize: 20,
    marginTop: 10,
    color: '#333333',
    letterSpacing: -1,
  },
});

export default AlarmMission;
