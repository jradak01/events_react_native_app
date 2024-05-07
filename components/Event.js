import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import Boje from '../constants/Boje'
import { Ionicons } from '@expo/vector-icons';

const Event = (props) => {
    return (
        <TouchableOpacity onPress={props.onPress}>
            <View style={[stil.kartica, props.style]}>
                <View style={stil.vrijeme}>
                    <Text style={stil.vrijemePrvi}>{props.vrijemePrvi}</Text>
                    <Text style={stil.vrijemeDrugi}>{props.vrijemeDrugi}</Text>
                </View>
                <View style={stil.info}>
                    <Text style={stil.naslov}>{props.naziv}</Text>
                    <Text style={stil.tip}>{props.tip}</Text>
                    <Text style={stil.mjesto}><Text><Ionicons name="ios-location-outline" size={20} color="black" /></Text>{props.adresa}, {props.mjesto}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const stil = StyleSheet.create({
    kartica: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: 10,
        backgroundColor: Boje.Bijela,
        borderWidth: 0,
        borderRadius: 8,
        marginTop: '5%',
        borderBottomWidth: 4,
        borderBottomColor: Boje.SvijetloZelena
    },
    naslov: {
        color: Boje.Crna,
        fontSize: 22,
    },
    vrijeme: {
        flex: 0.2,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 40,
        height: 50,
        width: 40,
        backgroundColor: Boje.SvijetloZelena,
    },
    vrijemePrvi: {
        color: Boje.Bijela,
        fontSize: 20
    },
    vrijemeDrugi: {
        color: Boje.Bijela,
        fontWeight: 'bold',
        fontSize: 16
    },
    info: {
        flex: 0.80,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: 'center',
    },
    tip: {
        color: Boje.Crna,
        fontSize: 18,
    },
    mjesto: {
        fontSize: 18
    }
});

export default Event;