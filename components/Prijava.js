import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import Boje from '../constants/Boje'
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

const Prijava = (props) => {
    const [ikona, postaviIkonu] = useState(props.disabled)
    const promijeniStanje = () => {
        props.onPress()
        postaviIkonu(!props.disabled)
    }
    return (
        <View>
            <View style={[stil.kartica, props.style]}>
                <View style={stil.username}>
                    <Text style={stil.tekst}>{props.username}</Text>
                </View>
                <View style={stil.info}>
                    <TouchableOpacity onPress={promijeniStanje} disabled={props.disabled}>
                        {ikona ?
                            <Ionicons name="person-outline" size={24} color="black" /> :
                            <MaterialIcons name="person-add-alt" size={24} color={Boje.TamnoSiva} />
                        }
                    </TouchableOpacity>
                </View>
            </View>
        </View>
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
        borderBottomColor: Boje.Narancasta
    },
    username: {
        flex: 0.5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    info: {
        flex: 0.5,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: 'center',
    },
    tekst: {
        fontSize: 16,
        color: Boje.TamnoSiva
    }
});

export default Prijava;