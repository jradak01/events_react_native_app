import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import Boje from '../constants/Boje'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const Event = (props) => {
    return (
        <TouchableOpacity onPress={props.onPress}>
            <View>
                <View style={[stil.kartica, props.style]}>
                    <View style={stil.glavneInfo}>
                        <Text style={stil.naziv}>{props.naziv}</Text>
                        <Text style={stil.tip}>{props.tip}</Text>
                    </View>
                    <View style={stil.dodatniInfo}>
                        <View style={stil.ikona}>
                            <MaterialCommunityIcons
                                name="calendar-outline"
                                size={16}
                                color={Boje.Crna}
                            />
                            <Text style={stil.vrijeme}>
                                {props.vrijemePrvi} {props.vrijemeDrugi}
                            </Text>
                        </View>
                        <View style={stil.ikona}>
                            <Ionicons
                                name="ios-location-outline"
                                size={16}
                                color={Boje.Crna}
                            />
                        </View>
                        <Text style={stil.mjesto}> {props.adresa}, {props.mjesto}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const stil = StyleSheet.create({
    kartica: {
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: 10,
        backgroundColor: Boje.Bijela,
        borderWidth: 0,
        borderRadius: 8,
        marginTop: '5%',
        borderBottomWidth: 8,
        borderBottomColor: Boje.RozaBronca,
    },
    glavneInfo: {
        alignItems: 'center',
        padding: 10,
        backgroundColor: Boje.Bijela,
        marginBottom: 10,
        borderRadius: 20,
    },
    naziv: {
        flexDirection: 'row',
        fontSize: 22,
        fontWeight: 400,
        padding: 5,
    },
    tip: {
        flexDirection: 'row',
        fontSize: 18,
        fontWeight: 350,
    },
    dodatniInfo: {
        flexDirection: 'row',
        backgroundColor: Boje.Bijela,
        borderRadius: 20,
    },
    vrijeme: {
        alignItems: 'center',
        flex: 0.5,
        flexDirection: 'column',
    },
    mjesto: {
        alignItems: 'center',
        flex: 0.5,
        flexDirection: 'column',
    },
    ikona: {
        backgroundColor: Boje.SvijetlaRozaBronca,
        height: 28,
        width: 28,
        borderRadius: 28,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Event;