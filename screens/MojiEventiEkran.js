import React, { useCallback, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Button, Dimensions } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import { logout } from "../store/actions/login";
import { getMojeProsle, getMojeAktualne, deleteEvent } from "../store/actions/eventi";

import Zaglavlje from '../components/Zaglavlje';
import MojEvent from '../components/MojEvent';
import Obavijest from '../components/Modal';

import Boje from '../constants/Boje';
import PocetniStil from '../constants/PocetniStil';
import { MaterialIcons } from '@expo/vector-icons';

const MojiEventi = ({ route, navigation }) => {
    const [izmjena, postaviIzmjenu] = useState(true)
    const eventiAktualni = useSelector(state => state.eventi.mojiBuduciEventi)
    const eventiProsli = useSelector(state => state.eventi.mojiProsliEventi)
    const korisnik = useSelector(state => state.login.token)
    const dispatch = useDispatch()
    const [vidljiv, postaviVidljiv] = useState(false)
    const brisiEvent = (id) => {
        dispatch(deleteEvent(id.toString()))
    }
    const onLogout = () => {
        dispatch(logout())
    }

    useEffect(() => {
        dispatch(getMojeAktualne());
        dispatch(getMojeProsle());
    }, [])
    return (
        <View style={stil.ekran}>
            <Zaglavlje onPress={() => postaviVidljiv(!vidljiv)} onPress2={() => navigation.navigate('Unos')} dodavanje={true} vracanje={true} name={'logout'} name2={"add"} style={{ paddingHorizontal: '2%' }} />
            <View style={stil.podaci}>
                <View style={stil.slikaOkvir}>
                    <Image style={stil.slika} source={korisnik.ime.charAt(korisnik.ime.length - 1) === 'a' ? require('../assets/zenski_lik.PNG') : require('../assets/muski_lik.PNG')} />
                </View>
                <View style={stil.karticaTekst}>
                    <Text style={stil.tekst}>{korisnik.ime}</Text>
                    <Text>{korisnik.username}</Text>
                </View>
            </View>
            <View style={[PocetniStil.kartica, { height: Dimensions.get('window').height / 1.46, justifyContent: 'flex-start' }]}>
                <View style={stil.grupaOdabir}>
                    <TouchableOpacity style={[stil.odabir, { borderTopLeftRadius: 20 }]} onPress={() => postaviIzmjenu(true)}>
                        <MaterialIcons name="assignment" size={30} color={Boje.TamnoSiva} />
                    </TouchableOpacity>
                    <TouchableOpacity style={[stil.odabir, { borderTopRightRadius: 20 }]} onPress={() => postaviIzmjenu(false)}>
                        <MaterialIcons name="assignment-turned-in" size={30} color={Boje.TamnoSiva} />
                    </TouchableOpacity>
                </View>
                {izmjena ?
                    <View style={stil.ispis}>
                        <FlatList showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false} style={stil.lista}
                            data={eventiAktualni}
                            renderItem={({ item }) => (
                                <MojEvent naziv={item.naziv} tip={item.tip} vrijemePrvi={new Date(item.vrijeme).getDate()}
                                    vrijemeDrugi={new Date(item.vrijeme).getMonth() + 1} mjesto={item.mjesto}
                                    nameIcon1={'edit'} nameIcon2={'delete-outline'} adresa={item.adresa}
                                    brisi={() => brisiEvent(item.id)} uredi={() => navigation.navigate('Uredi', { item: item })} />
                            )}
                        /></View>
                    :
                    <View style={stil.ispis}>
                        <FlatList showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false} style={stil.lista}
                            data={eventiProsli}
                            renderItem={({ item }) => (
                                <MojEvent naziv={item.naziv} tip={item.tip} vrijemePrvi={new Date(item.vrijeme).getDate()}
                                    vrijemeDrugi={new Date(item.vrijeme).getMonth() + 1} mjesto={item.mjesto} adresa={item.adresa}
                                    nameIcon1={'edit'} nameIcon2={'delete-outline'}
                                    brisi={() => brisiEvent(item.id)} uredi={() => navigation.navigate('Uredi', { item: item })} />)}
                        /></View>
                }
            </View>
            <Obavijest vidljiv={vidljiv} izadi={() => postaviVidljiv(!vidljiv)} potvrdi={() => onLogout()} obavijest={true}>
                <Text style={{ fontSize: 20 }}>Jeste li sigurni da se želite odjaviti?</Text>
            </Obavijest>
        </View>
    );
}

const stil = StyleSheet.create({
    ekran: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Boje.SvijetloZuta
    },
    podaci: {
        top: 10,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        width: '80%'
    },
    slika: {
        width: 130,
        height: 130,
    },
    slikaOkvir: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        top: 0,
        position: 'absolute'
    },
    grupaOdabir: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '100%',
        position: 'absolute',
        top: 0
    },
    odabir: {
        borderWidth: 0,
        backgroundColor: Boje.Bijela,
        flex: 0.5,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: 'center',
        padding: '1%',
    },
    lista: {
        width: '96%',
    },
    ispis: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        bottom: 0,
        position: 'absolute',
        height: '90%',
        maxHeight: '90%'
    },
    tekst: {
        fontSize: 24
    },
    karticaTekst: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        top: 115,
        position: 'absolute'
    }
})
export default MojiEventi
