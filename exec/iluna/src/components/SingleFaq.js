import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, StatusBar, TouchableOpacity } from 'react-native';
import Down from '../../assets/Images/down.png';

export default function SingleFaq({ id, title, getClick }) {
    const sendClick = (data) => {
       getClick(data);
    }

    return (
        <View style={{flexDirection: 'row'}}>
            <View style={{ flex: 7 }}>
                <View>
                    <View style={styles.content}>
                        <Text style={styles.faq}>{id}</Text>
                        <Text style={styles.faq}>{title}</Text>
                    </View>
                </View>
            </View>
            <View style={{ flex: 1}}>
                <TouchableOpacity style={{ height: 85 }} onPress={()=> sendClick(id)}>
                    <Image source={Down} style={styles.arrow} />
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
    content: {
        paddingLeft: 20,
        flexDirection: 'row',
        alignItems: 'center',
        height: 85,
        justifyContent:'flex-start'
    },
    faq: {
        fontSize: 19,
        marginRight: 20,
    },
    arrow: {
        width: 18,
        height: 18,
        marginLeft: 20,
        marginTop: 35
    }
});