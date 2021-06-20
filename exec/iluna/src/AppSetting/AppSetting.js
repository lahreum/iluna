import React, {useState} from 'react';
import { StyleSheet, Text, Switch, View, Image, StatusBar, TouchableOpacity } from 'react-native';
import Left from '../../assets/Images/left.png';

export default function AppSetting({navigation}) {
    const [isEnabled1, setIsEnabled1] = useState(true);
    const [isEnabled2, setIsEnabled2] = useState(true);
    const [isEnabled3, setIsEnabled3] = useState(true);

    // const closeAlarm = () => {      // 알람 강제 종료
    //     setIsEnabled1(previousState => !previousState);
    //     alert('알람 강제 종료');
    // }
    const overlayAlarm = () => {    // 다른 앱 위에 표시
        setIsEnabled2(previousState => !previousState);
        // alert('다른 앱 위에 표시');
    }
    const notifyAlarm = () => {     // 알람 노티
        setIsEnabled3(previousState => !previousState);
        // alert('알람 노티');
    }

    return (
        <View style={styles.container}>
            <StatusBar
                animated={true}
                backgroundColor="#ffffff"
                barStyle="dark-content"
            />
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate('AlarmList')}>
                    <Image source={Left} style={styles.img} />
                </TouchableOpacity>
                <Text style={styles.letter}>설정</Text>
            </View>

            <View style={styles.body}>
                {/* <View style={styles.content}>
                    <View><Text style={styles.contentLetter}>알람 강제 종료</Text></View>
                    <View style={{ paddingRight:30 }}>
                        <Switch
                        trackColor={{ false: "#767577", true: "#26d676" }}
                        thumbColor={isEnabled1 ? "#ffffff" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={closeAlarm}
                        value={isEnabled1}
                        style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }}
                        />
                    </View>
                </View> */}
                <View style={styles.content}>
                    <View><Text style={styles.contentLetter}>다른 앱 위에 표시</Text></View>
                    <View style={{ paddingRight:30 }}>
                         <Switch
                        trackColor={{ false: "#767577", true: "#26d676" }}
                        thumbColor={isEnabled2 ? "#ffffff" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={overlayAlarm}
                        value={isEnabled2}
                        style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }}
                        />
                    </View>
                </View>
                <View style={styles.content}>
                    <View><Text style={styles.contentLetter}>알람 노티</Text></View>
                    <View style={{ paddingRight:30 }}>
                         <Switch
                        trackColor={{ false: "#767577", true: "#26d676" }}
                        thumbColor={isEnabled3 ? "#ffffff" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={notifyAlarm}
                        value={isEnabled3}
                        style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }}
                        />
                    </View>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('Faq')} style={styles.content}>
                    <Text style={styles.contentLetter}>FAQ</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Info')} style={styles.content}>
                    <Text style={styles.contentLetter}>앱 정보</Text>
                </TouchableOpacity>
                <View style={styles.content}>
                    <Text style={styles.contentLetter}>별점 남기기</Text>
                </View>
            </View>
            <View style={styles.footer}>

            </View>
        </View>
    );
}

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
        paddingLeft: 10
    },
    body: {
        flex: 10,
        width: '100%'
    },
    letter: {
        fontSize: 20,
        paddingLeft: 10
    },
    img: {
        width: 25,
        height: 25,
    },
    content: {
        paddingLeft: 20,
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'space-between',
    },
    contentLetter: {
        fontSize: 20
    },
    footer: {
        flex: 4
    }
});