import React, {useState} from 'react';
import { StyleSheet, Text, View, Image, StatusBar, TouchableOpacity, ScrollView } from 'react-native';
import Left from '../../assets/Images/left.png';
import SingleFaq from '../components/SingleFaq';

export default function AppFaq({navigation, props}) {
    const [click, setClick] = useState(0);

    const getClick = (data) => {
        setClick(data);
    }
    
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
                <Text style={styles.letter}>FAQ</Text>
            </View>

            <View style={styles.body}>
                <ScrollView>
                <SingleFaq id="1" title="난이도 상, 중, 하는 어떤 기준인가요?" getClick={getClick}/>
                {
                    click == 1 &&
                    <View style={styles.contentsBox}><Text style={styles.contents}>
                        난이도 구분은 다음과 같습니다.{"\n"}{"\n"}
                        1) 수학 문제{"\n"}
                        - 쉬움: 두 자리 수 + 두 자리 수{"\n"}
                        ex) 21 + 12{"\n"}
                        - 보통: 두 자리 수 * 한 자리 수{"\n"}
                        ex) 23 * 7{"\n"}
                        - 어려움: (두 자리 수 * 한 자리 수) + 두 자리 수{"\n"}
                        ex) (31 * 2) + 16{"\n"}{"\n"}

                        2) 카드 게임{"\n"}
                        - 쉬움: 4 * 2 개의 카드 짝 맞추기{"\n"}
                        - 보통: 4 * 3 개의 카드 짝 맞추기{"\n"}
                        - 어려움: 4 * 4 개의 카드 짝 맞추기
                    </Text></View>
                }
                {/* <SingleFaq id="2" title="알람을 강제종료할 수 있나요?" getClick={getClick} />
                {
                    click == 2 &&
                    <View style={styles.contentsBox}><Text style={styles.contents}>
                        설정 {">"} 알람 강제 종료를 ON 설정하면 알람 작동 시 버튼을 통해 미션을 하지 않고도 알람을 종료할 수 있습니다.
                    </Text></View>w
                } */}
                <SingleFaq id="2" title="중간에 미션을 바꿀 수 있나요?" getClick={getClick} />
                {
                    click == 2 &&
                    <View style={styles.contentsBox}><Text style={styles.contents}>
                        중간에 미션을 바꿀 수 없으며, AI 사물 미션의 경우에만 촬영할 사물 종류를 변경할 수 있습니다. 우측 상단에 새로고침 버튼을 클릭하여 사물 종류를 변경합니다.
                    </Text></View>
                }
                <SingleFaq id="3" title="네트워크 없이도 작동 되나요?" getClick={getClick} />
                {
                    click == 3 &&
                    <View style={styles.contentsBox}><Text style={styles.contents}>
                        네트워크 연결 없이도 작동합니다.
                    </Text></View>
                }
                <SingleFaq id="4" title="사물 미션에는 어떤 사물이 나오나요?" getClick={getClick} />
                {
                    click == 4 &&
                    <View style={styles.contentsBox}><Text style={styles.contents}>
                        사물 미션에 나오는 사물은 다음과 같습니다.{"\n"}
                        - 숫가락, 세면대, 책, 신발    
                    </Text></View>
                }
                <SingleFaq id="5" title="문의 사항은 어디로 하면 되나요?" getClick={getClick} />
                {
                    click == 5 &&
                    <View style={styles.contentsBox}><Text style={styles.contents}>
                        아래 이메일로 문의 사항 보내주시면 빠르게 답변드리겠습니다.{"\n"}
                        lar8224@gmail.com
                    </Text></View>
                }
                </ScrollView>
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
    },
    contents: {
        paddingLeft: 20,
        paddingRight: 20,
        fontSize:17
    },
    contentsBox: {
        backgroundColor: '#f6f6f6',
        paddingTop: 15,
        paddingBottom: 15
    },
});