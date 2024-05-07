import * as React from 'react';
import { View, Text, StyleSheet, TextInput, Dimensions, Keyboard } from 'react-native';

import { Switch } from 'react-native-paper';
import Tipka from '../components/Tipka';

import Boje from '../constants/Boje'

const Forma = (props) => {
    return (
        <View style={stil.kartica}>
            <Text style={stil.naslov}>{props.naslov}</Text>
            <TextInput style={stil.unos} placeholder="Naziv" value={props.naziv} onChangeText={props.promjenaNaziva} onSubmitEditing={Keyboard.dismiss} />
            <TextInput style={stil.unos} placeholder="Tip" value={props.tip} onChangeText={props.promjenaTipa} onSubmitEditing={Keyboard.dismiss} />
            <TextInput style={stil.unos} placeholder="Mjesto" value={props.mjesto} onChangeText={props.promjenaMjesta} onSubmitEditing={Keyboard.dismiss} />
            <TextInput style={stil.unos} placeholder="Adresa" value={props.adresa} onChangeText={props.promjenaAdrese} onSubmitEditing={Keyboard.dismiss} />
            <Text style={[stil.tekst, { marginHorizontal: '10%' }]}>Vrijeme:</Text>
            <View style={stil.vrijemeUnos}>
                <TextInput style={[stil.unos, stil.podijeljenUnos]}
                    keyboardType='numeric' maxLength={2} value={props.dan} onSubmitEditing={Keyboard.dismiss}
                    onChangeText={props.promjenaDana} /><span style={{ fontSize: 30 }}>.</span>
                <TextInput style={[stil.unos, stil.podijeljenUnos]} onSubmitEditing={Keyboard.dismiss}
                    keyboardType='numeric' maxLength={2} value={props.mjesec}
                    onChangeText={props.promjenaMjeseca} /><span style={{ fontSize: 30 }}>.</span>
                <TextInput style={[stil.unos, stil.podijeljenUnos, { width: '15%' }]} onSubmitEditing={Keyboard.dismiss}
                    keyboardType='numeric' maxLength={4} value={props.godina}
                    onChangeText={props.promjenaGodine} /><span style={{ fontSize: 30 }}>.</span>
                <TextInput style={[stil.unos, stil.podijeljenUnos]} onSubmitEditing={Keyboard.dismiss}
                    keyboardType='numeric' maxLength={2} value={props.sat}
                    onChangeText={props.promjenaSata} /><span style={{ fontSize: 30 }}>:</span>
                <TextInput style={[stil.unos, stil.podijeljenUnos]} onSubmitEditing={Keyboard.dismiss}
                    keyboardType='numeric' maxLength={2} value={props.min}
                    onChangeText={props.promjenaMinuta} />
            </View>
            <View style={stil.switch}>
                <Text style={stil.tekst}>Otvoreno:
                    <Switch value={props.otvoreno} color={props.boja} style={{ marginHorizontal: 20 }} onValueChange={props.izmjenaOtvorenog} />
                </Text>
                <Text style={stil.tekst}>Plačanje:
                    <Switch value={props.placanje} color={props.boja} style={{ marginHorizontal: 20 }} onValueChange={props.izmjenaPlacanja} />
                </Text>
            </View>
            <TextInput style={stil.unos} keyboardType='numeric' placeholder="Cijena" value={props.cijena} onChangeText={props.promijenaCijene} onSubmitEditing={Keyboard.dismiss} />
            <TextInput style={[stil.unos, { textAlignVertical: "top" }]} multiline={true} numberOfLines={5}
                placeholder="Opis" value={props.opis} onChangeText={props.promjenaOpisa}
            />
            <Tipka onPress={props.onPress} style={{ width: Dimensions.get('window').width / 1.25, marginTop: '5%', marginBottom: '5%', backgroundColor: props.boja }} title={props.tipkaTitle} />
        </View>
    );
};

const stil = StyleSheet.create({
    kartica: {
        width: '100%',
        alignItems: 'center',
        paddingTop: '10%',
        paddingBottom: '10%',
    },
    unos: {
        width: '80%',
        fontSize: 20,
        backgroundColor: 'white',
        borderRadius: 6,
        paddingTop: '2%',
        paddingBottom: '2%',
        marginTop: '2%',
        marginBottom: '2%',
    },
    podijeljenUnos: {
        flex: 0.8,
        alignSelf: 'flex-start',
        flexDirection: "column",
        marginTop: 0,
        marginBottom: 0,
        width: '10%'
    },
    vrijemeUnos: {
        width: '80%',
        marginTop: '2%',
        marginBottom: '2%',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    switch: {
        width: '80%',
        alignItems: 'center'
    },
    tekst: {
        fontSize: 20,
        color: Boje.TamnoSiva,
        paddingBottom: '5%',
        paddingTop: '5%',
        width: '80%',
        alignSelf: 'flex-start'
    },
    naslov: {
        fontSize: 28,
        color: Boje.TamnoSiva,
        paddingTop: '2%',
        paddingBottom: '2%',
        fontFamily: 'pacifico'
    }
});

export default Forma;