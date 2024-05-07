import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, Dimensions, TouchableWithoutFeedback, Platform, KeyboardAvoidingView, Keyboard } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import { postEvent } from '../store/actions/eventi'

import Zaglavlje from '../components/Zaglavlje';
import Forma from '../components/Forma';
import Obavijest from '../components/Modal';

import Boje from '../constants/Boje';
import PocetniStil from '../constants/PocetniStil';

const Unos = ({ route, navigation }) => {
    const [naziv, setNaziv] = useState('');
    const [tip, setTip] = useState('');
    const [mjesto, setMjesto] = useState('');
    const [adresa, setAdresa] = useState('');
    const [otvoreno, setOtvoreno] = useState(true);
    const [placanje, setPlacanje] = useState(false);
    const [cijena, setCijena] = useState(0);
    const [opis, setOpis] = useState('');
    const [dan, setDan] = useState(new Date().getDate())
    const [mjesec, setMjesec] = useState(new Date().getMonth() + 1)
    const [godina, setGodina] = useState(new Date().getFullYear())
    const [sat, setSat] = useState(new Date().getHours())
    const [min, setMin] = useState(new Date().getMinutes())
    const [vidljiv, postaviVidljiv] = useState(false)
    const dispatch = useDispatch()
    const unosVremena = (dan, mjesec, godina, sat, min) => {
        if (dan > 31) {
            dan = 31
        }
        if (mjesec > 12) {
            mjesec = 12
        }
        if (sat > 23) {
            sat = 23
        }
        if (min > 59) {
            min = 59
        }
        const zona = new Date().toISOString().slice(19)
        const datum = new Date(godina, mjesec - 1, dan, sat, min).toISOString().slice(0, 19)
        const noviDatum = datum + zona
        return noviDatum;
    }
    const onCreate = () => {
        Alert.alert('Uspješno kreiran event!')
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
        dispatch(postEvent(newEvent))
        navigation.goBack()
    }
    const naIzmjenuOtvoreno = () => setOtvoreno(!otvoreno);
    const naIzmjenuPlacanje = () => setPlacanje(!placanje);
    return (
        <KeyboardAvoidingView style={stil.ekran} behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <Zaglavlje onPress={() => navigation.goBack()} dodavanje={false} vracanje={true} name={'keyboard-arrow-left'} />
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <ScrollView showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false} style={[PocetniStil.kartica, { height: Dimensions.get('window').height / 1.05, flex: 1 }]} >
                    <Forma
                        naslov={'Kreiraj svoj Event!'} naziv={naziv} promjenaNaziva={(naziv) => setNaziv(naziv)}
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
                        boja={Boje.Crvena}
                        cijena={cijena} promijenaCijene={(cijena) => setCijena(cijena)}
                        opis={opis} promjenaOpisa={(opis) => setOpis(opis)}
                        onPress={() => postaviVidljiv(!vidljiv)} tipkaTitle={'Kreiraj'}
                    />
                </ScrollView>
            </TouchableWithoutFeedback>
            <Obavijest vidljiv={vidljiv} izadi={() => postaviVidljiv(!vidljiv)} potvrdi={() => onCreate()} obavijest={true}>
                <Text style={{ fontSize: 20 }}>Jeste li sigurni da se želite kreirati ovaj event?</Text>
            </Obavijest>
        </KeyboardAvoidingView>
    );
}

const stil = StyleSheet.create({
    ekran: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Boje.SvijetloCrvena,
    }
})
export default Unos
