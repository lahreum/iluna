import React, {useState} from 'react';
import { StyleSheet, Text, View, Image, StatusBar, TouchableOpacity, ScrollView } from 'react-native';
import Left from '../../assets/Images/left.png';

export default function Auth({navigation}) {
    return (
        <View style={styles.container}>
            <StatusBar
                animated={true}
                backgroundColor="#ffffff"
                barStyle="dark-content"
            />
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate('AppInfo')}>
                    <Image source={Left} style={styles.img} />
                </TouchableOpacity>
                <Text style={styles.letter}>권한</Text>
            </View>
            <View style={styles.body}>
                <ScrollView>
                    <Text style={{color: '#616161', fontSize: 12}}>
                        다음 권한은 선택 권한입니다. 해당 권한을 허용하지 않아도 앱을 사용할 수 있으나, 일부 기능이 제한될 수 있습니다. {"\n"}{"\n"}
                        저장공간: 저장된 음원을 알람음 또는 타이머음으로 설정할 때 사용됨
                    </Text>
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent:'center',
        flexDirection: 'column',
        backgroundColor:'#ffffff'
    },
    header: {
        flex: 1,
        width: '100%',
        alignItems:'center',
        fontSize: 100,
        flexDirection: 'row',
        paddingLeft: 10,
    },
    img: {
        width: 25,
        height: 25,
    },
    letter: {
        fontSize: 20,
        paddingLeft: 10
    },
    body: {
        flex: 10,
        width: '100%',
        paddingLeft: 10,
        paddingRight: 10,
        
    },
});