import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, Dimensions, Platform } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import { getEvents, filterEvent } from "../store/actions/eventi";

import Event from '../components/Event';
import Tipka from '../components/Tipka';
import Zaglavlje from '../components/Zaglavlje';

import Boje from '../constants/Boje';
import PocetniStil from '../constants/PocetniStil';

const Naslovna = ({ route, navigation }) => {
    const [pojam, postaviPojam] = useState('');
    const [primjenjenFilter, postaviPrimjenjenFilter] = useState(false)
    const eventiPrikaz = useSelector(state => state.eventi.pocetniEventi)
    const eventiPrikazFilter = useSelector(state => state.eventi.primjenjenfilterEventi)
    const filterPrikaz = useSelector(state => state.filter.filteri)
    const dispatch = useDispatch()
    const onFilter = (pojam) => {
        dispatch(filterEvent(pojam))
        postaviPrimjenjenFilter(true)
    }

    React.useEffect(() => {
        dispatch(getEvents());
    }, [])
    return (
        <View style={stil.ekran}>
            {primjenjenFilter ? <Zaglavlje onPress={() => postaviPrimjenjenFilter(false)} onPress2={() => navigation.navigate('Unos')} dodavanje={true} vracanje={true} name={'keyboard-arrow-left'} name2={'add'} />
                :
                <View style={stil.gornjiDio}>
                    <Zaglavlje onPress2={() => navigation.navigate('Unos')} dodavanje={true} vracanje={false} name2={'add'} />
                    <TextInput style={[stil.trazilica, Platform.select({ ios: stil.trazilicaIOS })]} placeholder="Traži" onChangeText={(pojam) => postaviPojam(pojam)} onSubmitEditing={() => onFilter(pojam)}></TextInput>
                    <View style={stil.horizontalnaLista}>
                        <FlatList style={stil.horizontalnaLista} horizontal={true} showsHorizontalScrollIndicator={false}
                            data={filterPrikaz}
                            renderItem={({ item }) => (
                                <Tipka onPress={() => { onFilter(item.pojam) }} title={item.pojam} style={{ borderRadius: 20, backgroundColor: Boje.Bijela, marginLeft: '10%' }} stilNaslov={{ color: Platform.OS === 'ios' ? Boje.TamnoSiva : Boje.SvijetloZelena, backgroundColor: Platform.OS === 'ios' ? Boje.SvijetlaRozaBronca : Boje.Bijela }} />
                            )} />
                    </View>
                </View>
            }
            {primjenjenFilter ?
                <View style={[PocetniStil.kartica, { height: Dimensions.get('window').height / 1.17, alignItems: 'center' }]}>
                    <FlatList style={stil.lista}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        data={eventiPrikazFilter}
                        renderItem={({ item }) => (
                            <Event naziv={item.naziv} tip={item.tip} vrijemePrvi={new Date(item.vrijeme).getDate()} vrijemeDrugi={new Date(item.vrijeme).getMonth() + 1}
                                mjesto={item.mjesto} adresa={item.adresa} onPress={() => navigation.navigate('Detalji', { id: item.id })} />
                        )}
                    />
                </View>
                :
                <View style={[PocetniStil.kartica, { height: Dimensions.get('window').height / 1.4, alignItems: 'center' }]}>
                    <FlatList style={stil.lista}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        data={eventiPrikaz}
                        renderItem={({ item }) => (
                            <Event naziv={item.naziv} tip={item.tip} vrijemePrvi={new Date(item.vrijeme).getDate()} vrijemeDrugi={new Date(item.vrijeme).getMonth() + 1}
                                mjesto={item.mjesto} adresa={item.adresa} onPress={() => navigation.navigate('Detalji', { id: item.id })} />
                        )}
                    />
                </View>
            }
        </View>
    );
}

const stil = StyleSheet.create({
    ekran: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Platform.OS === 'ios' ? Boje.RozaBronca : Boje.SvijetloZelena,
    },
    lista: {
        width: '96%',
    },
    horizontalnaLista: {
        width: '96%',
    },
    trazilica: {
        width: '90%',
        fontSize: 18,
        backgroundColor: Boje.Bijela,
        borderRadius: 6,
        paddingTop: '2%',
        paddingBottom: '2%',
        marginBottom: 10,
    },
    trazilicaIOS: {
        fontSize: 20,
        backgroundColor: Boje.SvijetlaRozaBronca,
        borderRadius: 8,
        paddingTop: '1%',
        paddingBottom: '1%',
    },
    gornjiDio: {
        alignItems: 'center',
        justifyContent: 'center',
        height: Dimensions.get('window').height / 4.5,
        width: Dimensions.get('window').width,
        top: 0,
        position: 'absolute'
    }
})
export default Naslovna
