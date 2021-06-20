import React, {useState} from 'react';
import { StyleSheet, Text, View, Image, StatusBar, TouchableOpacity } from 'react-native';
import Left from '../../assets/Images/left.png';

export default function AppInfo({navigation}) {
    return (
        <View style={styles.container}>
            <StatusBar
                animated={true}
                backgroundColor="#ffffff"
                barStyle="dark-content"
            />
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate('Setting')}>
                    <Image source={Left} style={styles.img} />
                </TouchableOpacity>
                <Text style={styles.letter}>앱 정보</Text>
            </View>
            <View style={styles.body}>
                <Text style={{fontSize: 50}}>일어나</Text>
                <Text style={{ fontSize: 15, paddingTop: 10}}>버전 0.0.1</Text>
            </View>
            <View style={styles.footer}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Auth')}
                    style={styles.btn}
                >
                    <Text style={{fontSize:16}}>권한</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('OpenSourceLicense')}
                    style={styles.btn}
                >
                    <Text style={{fontSize:16}}>오픈소스 라이센스</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        // backgroundColor: 'red'
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
        flex: 11,
        width: '100%',
        // backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center'
    },
    footer: {
        flex: 3,
        // backgroundColor: 'green',
        // alignItems: 'center',
        // justifyContent: 'center'
        padding: 50
    },
    btn: {
        backgroundColor: '#e0e0e0',
        justifyContent: 'center',
        alignItems: 'center',
        height: 45,
        borderRadius: 4,
        marginBottom: 20
    }
});