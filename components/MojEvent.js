import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import Boje from '../constants/Boje'
import { Feather, MaterialIcons, Ionicons } from '@expo/vector-icons';

const MojEvent = (props) => {
    return (
        <View style={[stil.kartica, props.kartica]}>
            <View style={stil.sadrzaj}>
                <View style={[stil.vrijeme, props.vrijeme]}>
                    <Text style={stil.vrijemePrvi}>{props.vrijemePrvi}</Text>
                    <Text style={stil.vrijemeDrugi}>{props.vrijemeDrugi}</Text>
                </View>
                <View style={stil.info}>
                    <Text style={stil.naslov}>{props.naziv}</Text>
                    <Text style={stil.tip}>{props.tip}</Text>
                    <Text style={stil.mjesto}><Text><Ionicons name="ios-location-outline" size={20} color="black" /></Text>{props.adresa}, {props.mjesto}</Text>
                </View>
            </View>
            <View style={stil.akcije}>
                <TouchableOpacity onPress={props.uredi} style={[stil.akcija, { flex: 0.9, alignSelf: 'flex-end' }]}>
                    <Feather name={props.nameIcon1} size={28} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={props.brisi} style={[stil.akcija, { flex: 0.1, alignSelf: 'flex-end' }]}>
                    <MaterialIcons name={props.nameIcon2} size={32} color="black" />
                </TouchableOpacity>
            </View>

        </View>
    );
};

const stil = StyleSheet.create({
    kartica: {
        backgroundColor: Boje.SvijetloZuta,
        width: '100%',
        alignSelf: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        padding: 0,
        marginBottom: '5%'
    },
    sadrzaj: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Boje.Bijela,
        width: '100%',
        borderRadius: 8,
        flex: 1.4,
        flexDirection: 'row',
        padding: 10,
    },
    akcije: {
        flex: 0.6,
        flexDirection: 'row',
        width: '100%',
    },
    akcija: {
        flexDirection: "column",
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
        backgroundColor: Boje.Zuta
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
        flex: 0.8,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: 'center',
        alignSelf: 'center'
    },
    tip: {
        color: Boje.Crna,
        fontSize: 18,
    },
    mjesto: {
        alignSelf: 'center',
        fontSize: 18,
    }
});

export default MojEvent;