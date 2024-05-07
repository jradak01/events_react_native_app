import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, ScrollView, Alert, Text, FlatList, Dimensions, TouchableWithoutFeedback, Platform, KeyboardAvoidingView, Keyboard } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import { putEvent } from '../store/actions/eventi'
import { getPrijaveEvent, putDopustenje } from '../store/actions/prijave';

import Obavijest from '../components/Modal';
import Zaglavlje from '../components/Zaglavlje';
import Prijava from '../components/Prijava';
import Forma from '../components/Forma';

import Boje from '../constants/Boje';
import PocetniStil from '../constants/PocetniStil';

const Uredi = ({ route, navigation }) => {
    const [naziv, setNaziv] = useState(route.params.item.naziv);
    const [tip, setTip] = useState(route.params.item.tip);
    const [mjesto, setMjesto] = useState(route.params.item.mjesto);
    const [adresa, setAdresa] = useState(route.params.item.adresa);
    const [otvoreno, setOtvoreno] = useState(route.params.item.otvoreno);
    const [placanje, setPlacanje] = useState(route.params.item.placanje);
    const [cijena, setCijena] = useState(route.params.item.cijena);
    const [opis, setOpis] = useState(route.params.item.opis);
    const [dan, setDan] = useState(new Date(route.params.item.vrijeme).getDate())
    const [mjesec, setMjesec] = useState(new Date(route.params.item.vrijeme).getMonth() + 1)
    const [godina, setGodina] = useState(new Date(route.params.item.vrijeme).getFullYear())
    const [sat, setSat] = useState(new Date(route.params.item.vrijeme).getHours())
    const [min, setMin] = useState(new Date(route.params.item.vrijeme).getMinutes())
    const [vidljiv, postaviVidljiv] = useState(false)
    const prijavePrikaz = useSelector(state => state.prijave.dozvoleNaPrijavu)
    const ukupno = useSelector(state => state.prijave.ukupnoPrijavljenih)
    const dispatch = useDispatch()
    const unosVremena = (dan, mjesec, godina, sat, min) => {
        if (dan > 31) {
            dan = 31
        }
        if (mjesec > 12) {
            mjesec = 12
        }
        if (sat > 23) {
            sat = 24
        }
        if (min > 59) {
            min = 59
        }
        const zona = new Date().toISOString().slice(19)
        const datum = new Date(godina, mjesec - 1, dan, sat, min).toISOString().slice(0, 19)
        const noviDatum = datum + zona
        return noviDatum;
    }
    const onAllow = (id, prid, dopusteno) => {
        const dopustenje = {
            dopustenje: !dopusteno
        }
        dispatch(putDopustenje(id, prid, dopustenje))

    }
    const onCreate = () => {
        let newEvent = {
            naziv: naziv,
            tip: tip,
            mjesto: mjesto,
            adresa: adresa,
            vrijeme: unosVremena(dan, mjesec, godina, sat, min),
            otvoreno: otvoreno,
            placanje: placanje,
            cijena: cijena,
            opis: opis
        };
        Alert('Uspješno promijenjen event!')
        dispatch(putEvent(newEvent, route.params.item.id))
        navigation.goBack();
    }
    const naIzmjenuOtvoreno = () => setOtvoreno(!otvoreno);
    const naIzmjenuPlacanje = () => setPlacanje(!placanje);
    useEffect(() => {
        dispatch(getPrijaveEvent(route.params.item.id));
    }, [])
    return (
        <KeyboardAvoidingView style={stil.ekran} behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <Zaglavlje onPress={() => navigation.goBack()} dodavanje={false} vracanje={true} name={'keyboard-arrow-left'} />
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <ScrollView showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false} style={[PocetniStil.kartica, { height: Dimensions.get('window').height / 1.05, flex: 1 }]} >
                    <Forma
                        naslov={'Uredi svoj Event!'} naziv={naziv} promjenaNaziva={(naziv) => setNaziv(naziv)}
                        tip={tip} promjenaTipa={(tip) => setTip(tip)}
                        mjesto={mjesto} promjenaMjesta={(mjesto) => setMjesto(mjesto)}
                        adresa={adresa} promjenaAdrese={(adresa) => setAdresa(adresa)}
                        dan={dan} promjenaDana={(dan) => setDan(dan)}
                        mjesec={mjesec} promjenaMjeseca={(mjesec) => setMjesec(mjesec)}
                        godina={godina} promjenaGodine={(godina) => setGodina(godina)}
                        sat={sat} promjenaSata={(sat) => setSat(sat)}
                        min={min} promjenaMinuta={(min) => setMin(min)}
                        otvoreno={otvoreno} izmjenaOtvorenog={naIzmjenuOtvoreno}
                        placanje={placanje} izmjenaPlacanja={naIzmjenuPlacanje}
                        boja={Boje.Narancasta}
                        cijena={cijena} promijenaCijene={(cijena) => setCijena(cijena)}
                        opis={opis} promjenaOpisa={(opis) => setOpis(opis)}
                        onPress={() => postaviVidljiv(!vidljiv)} tipkaTitle={'Promijeni'}
                    />
                    <View style={stil.popisPrijava}>
                        <Text style={stil.tekst}>Prijave koje čekaju dozvolu:</Text>
                        <Text style={[stil.tekst, { fontSize: 12, paddingTop: 0 }]}>(ukupno prijava: {ukupno})</Text>
                        <FlatList showsVerticalScrollIndicator={false} style={stil.lista}
                            showsHorizontalScrollIndicator={false}
                            data={prijavePrikaz}
                            keyExtractor={item => item._id}
                            renderItem={({ item }) => (
                                <Prijava username={item.prKorisnik.username} onPress={() => onAllow(route.params.item.id, item._id, item.dopusteno)} disabled={item.dopusteno} />

                            )}
                        />
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
            <Obavijest vidljiv={vidljiv} izadi={() => postaviVidljiv(!vidljiv)} potvrdi={() => onCreate()} obavijest={true}>
                <Text style={{ fontSize: 20 }}>Jeste li sigurni da se želite promijeniti podatke o eventu?</Text>
            </Obavijest>
        </KeyboardAvoidingView>
    );
}

const stil = StyleSheet.create({
    ekran: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Boje.SvijetloNarancasta,
    },
    lista: {
        width: '100%',
    },
    tekst: {
        fontSize: 20,
        color: Boje.TamnoSiva,
        paddingTop: '7%',
        width: '100%',
        alignSelf: 'center'
    },
    popisPrijava: {
        flex: 1,
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        width: '96%',
        padding: '1%'
    }
})
export default Uredi
