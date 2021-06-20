import React from 'react';
import {View, Image, Text, StyleSheet, useWindowDimensions} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import Check from '../../assets/Images/icons/check.png';

const CheckIcon = styled.Image`
  width: 40px;
  height: 40px;
  tint-color: #a1887f;
  background-color: #fff;
`;

const SingleBell = ({item, selectBell, selectedBell}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        selectBell(item.id - 1);
      }}>
      <View style={styles.imageContainer}>
        {selectedBell != item.src || <CheckIcon source={Check} />}
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    margin: 5,
    height: 40,
    // backgroundColor: '#ff0',
  },
  imageContainer: {
    // backgroundColor: '#af9',
    flex: 3,
    alignItems: 'flex-end',
    marginRight: 5,
  },
  textContainer: {
    // backgroundColor: '#29a',
    flex: 10,
  },
  text: {
    fontSize: 20,
    letterSpacing: -1,
    color: '#333333',
  },
});

export default SingleBell;
