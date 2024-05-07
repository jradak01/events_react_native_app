import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import { getEvent } from "../store/actions/eventi";
import { putPrijava, putOdjava, getPrijava } from '../store/actions/prijave';

import Zaglavlje from '../components/Zaglavlje';
import Tipka from '../components/Tipka';

import { Ionicons } from '@expo/vector-icons';
import Boje from '../constants/Boje';
import PocetniStil from '../constants/PocetniStil';

const Detalji = ({ route, navigation }) => {
    const eventPrikaz = useSelector(state => state.eventi.event)
    const prijavaPrikaz = useSelector(state => state.prijave.prijava)
    const dispatch = useDispatch()
    const onPrijava = () => {
        dispatch(putPrijava(route.params.id))
    }
    const onOdjava = () => {
        dispatch(putOdjava(route.params.id))
    }

    useEffect(() => {
        dispatch(getEvent(route.params.id));
        dispatch(getPrijava(route.params.id));
    }, [])

    return (
        <View style={stil.ekran}>
            <View style={stil.slikaOkvir}>
                <Image
                    style={stil.slika}
                    resizeMode="strecth"
                    source={require('../assets/party.jpg')}
                />
            </View>
            <Zaglavlje onPress={() => navigation.goBack()}  dodavanje={false} vracanje={true} name={'keyboard-arrow-left'} style={{ }} />
            <View style={[PocetniStil.kartica, {alignItems: 'center', justifyContent:'center'}]}>
                <Text style={stil.naziv}>{eventPrikaz.naziv}</Text>
                <Text style={stil.tip}>{eventPrikaz.tip}</Text>
                <Text style={stil.mjesto}><Ionicons name="ios-location-outline" size={24} color="black" />{eventPrikaz.adresa}, {eventPrikaz.mjesto}</Text>
                <ScrollView style={stil.detalji} showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}>
                    <Text style={stil.opis}><Text style={stil.naslov}>Vrijeme: </Text>{new Date(eventPrikaz.vrijeme).getDate()}.
                        {new Date(eventPrikaz.vrijeme).getMonth()+1}.
                        {new Date(eventPrikaz.vrijeme).getFullYear()}.
                        {new Date(eventPrikaz.vrijeme).getHours()}:
                        {new Date(eventPrikaz.vrijeme).getMinutes()}</Text>
                    <Text style={stil.opis}><Text style={stil.naslov}>Otvoreno: </Text>{eventPrikaz.otvoreno ? 'DA' : 'NE'}</Text>
                    <Text style={stil.opis}><Text style={stil.naslov}>Plačanje: </Text>{eventPrikaz.placanje ? 'DA' : 'NE'}</Text>
                    <Text style={stil.opis}><Text style={stil.naslov}>Cijena: </Text>{eventPrikaz.cijena} kn</Text>
                    <Text style={stil.opis}><Text style={stil.naslov}>Opis: </Text>{eventPrikaz.opis}</Text>
                </ScrollView>
                {prijavaPrikaz === null ?
                    <Tipka title={'Prijava'} onPress={() => onPrijava()} style={{ backgroundColor: Boje.SvijetloRoza, width: Dimensions.get('window').width / 1.25}} stilNaslov={{ color: Boje.SvijetloCrna, fontWeight: 'bold' }} />
                    :
                    <Tipka title={'Odjava'} onPress={() => onOdjava()} style={{ backgroundColor: Boje.SvijetloRoza, width: Dimensions.get('window').width / 1.25 }} stilNaslov={{ color: Boje.SvijetloCrna, fontWeight: 'bold' }} />
                }
            </View>
        </View>
    );
}

const stil = StyleSheet.create({
    ekran: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Boje.SvijetloRoza,
    },
    slika: {
        width: '100%',
        height: 200,
    },
    slikaOkvir: {
        width: '100%',
        top: 0,
        position: 'absolute'
    },
    naziv: {
        fontSize: 30,
        paddingTop: '5%',
        paddingBottom: '2%'
    },
    tip: {
        fontSize: 24,
        paddingBottom: '5%'
    },
    mjesto: {
        fontSize: 22
    },
    naslov: {
        fontWeight: 'normal',
        fontSize: 22,
    },
    detalji: {
        paddingTop: '10%',
        width: '86%',
        paddingBottom: '10%',
        maxHeight: '50%'
    },
    opis: {
        fontSize: 20,
        fontWeight: '100',
        paddingVertical: '1%'
    }

})
export default Detalji
