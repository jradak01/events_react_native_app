import * as React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';
import Boje from '../constants/Boje'

const Zaglavlje = (props) => {
    return (
        <View style={stil.zaglavlje}>
            {props.vracanje ?
                <TouchableOpacity onPress={props.onPress} style={[stil.vracanje, props.style]}>
                    <MaterialIcons name={props.name} size={30} color={Boje.SvijetloCrna} />
                </TouchableOpacity> : <View></View>
            }
            {props.dodavanje ?
                <TouchableOpacity onPress={props.onPress2} style={[stil.dodavanje, props.style]}>
                    <MaterialIcons name={props.name2} size={30} color={Boje.SvijetloCrna} />
                </TouchableOpacity> : <View></View>
            }
        </View>
    );
};

const stil = StyleSheet.create({
    zaglavlje: {
        flexDirection: 'row',
        width: "100%",
        height: '10%',
        top: 0,
        position: 'absolute',
        paddingTop: 5,
    },
    dodavanje: {
        flex: 0.97,
        flexDirection: "column",
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
    },
    vracanje: {
        flex: 0.3,
        flexDirection: "column",
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    }
});

export default Zaglavlje;