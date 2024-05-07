import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions } from 'react-native';

import { getPrijave, filterPrijaveDatum } from '../store/actions/prijave';
import { useSelector, useDispatch } from 'react-redux';

import MojEvent from '../components/MojEvent'
import Zaglavlje from '../components/Zaglavlje';

import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { LocaleConfig } from 'react-native-calendars';

import PocetniStil from '../constants/PocetniStil';
import Boje from '../constants/Boje';
import { AntDesign } from '@expo/vector-icons';

LocaleConfig.locales['hr'] = {
    monthNames: [
        'Siječanj',
        'Veljača',
        'Ožujak',
        'Travanj',
        'Svibanj',
        'Lipanj',
        'Srpanj',
        'Kolovoz',
        'Rujan',
        'Listopad',
        'Studeni',
        'Prosinac'
    ],
    monthNamesShort: ['Sij.', 'Velj.', 'Ožu.', 'Tra.', 'Svi.', 'Lip.', 'Srp.', 'Kol.', 'Ruj.', 'Lis.', 'Stu.', 'Pro.'],
    dayNames: ['Nedjelja', 'Ponedjeljak', 'Utorak', 'Srijeda', 'Četvrtak', 'Petak', 'Subota'],
    dayNamesShort: ['Ned.', 'Pon.', 'Uto.', 'Sri.', 'Čet.', 'Pet.', 'Sub.'],
    today: "Današnji dan"
};
LocaleConfig.defaultLocale = 'hr';

const MojePrijave = ({ navigation }) => {
    const [lista, prikaziListu] = useState(false)
    const datumiPrijava = useSelector(state => state.prijave.datumi)
    const eventiPrijavljen = useSelector(state => state.prijave.prijave)
    const sortiranePrijave = useSelector(state => state.prijave.sortiranePrijave)
    const korisnik = useSelector(state => state.login.token)
    const dispatch = useDispatch()
    const marked = (datumiPrijava) => {
        let newDaysObject = {};

        datumiPrijava.forEach((day) => {
            newDaysObject[day] = {
                selected: true,
                selectedColor: Boje.Plava
            };
        });
        return newDaysObject;
    }
    const postaviPrihvaceno = (item) => {
        const postavi = item.prijavljeniKorisnici.filter(pr => pr.prKorisnik.username === korisnik.username)
        if (postavi.length > 0) {
            const vrati = postavi[0].dopusteno ? 'done' : 'remove-done'
            return vrati;
        } else {
            return 'remove-done'
        }
    }
    const dohvatiEventeDatuma = (dan) => {
        dispatch(filterPrijaveDatum(dan.dateString))
        prikaziListu(eventiPrijavljen.length > 0 ? true : false)
    }

    useEffect(() => {
        dispatch(getPrijave());
    }, [])
    return (
        <View style={stil.ekran}>
            <Zaglavlje onPress2={() => navigation.navigate('Unos')} dodavanje={true} vracanje={false} name2={"add"} style={{ paddingHorizontal: '2%' }} />
            <View style={[PocetniStil.kartica, { height: Dimensions.get('window').height / 1.14, justifyContent: 'flex-start' }]}>
                <View style={stil.podrucjeKalendar}>
                    <Calendar
                        minDate={'2020-01-01'}
                        maxDate={'2030-01-01'}
                        onDayPress={day => {
                            dohvatiEventeDatuma(day)
                        }}
                        monthFormat={'MM. yyyy.'}
                        // onMonthChange={month => {
                        //     console.log('Promijenjen mjesec', month);
                        // }}
                        renderArrow={(direction) => direction === 'left' ? <AntDesign name="left" size={24} color="black" /> : <AntDesign name="right" size={24} color="black" />}
                        horizontal={true}
                        pagingEnabled={true}
                        calendarWidth={320}
                        firstDay={1}
                        onPressArrowLeft={subtractMonth => subtractMonth()}
                        onPressArrowRight={addMonth => addMonth()}
                        enableSwipeMonths={true}
                        markedDates={marked(datumiPrijava)}
                        style={stil.kalendar}
                        theme={{
                            calendarBackground: Boje.ProzirnoBijela,
                            todayBackgroundColor: Boje.SvijetloPlava,
                            todayTextColor: Boje.Crna,
                            selectedDayBackgroundColor: Boje.Plava,
                            selectedDayTextColor: Boje.Crna,
                            textDayFontSize: 20,
                            textMonthFontSize: 20,
                            textDayHeaderFontSize: 20,
                        }}
                    />
                </View>
            </View>
            {lista ?
                <View style={stil.ispis}>
                    <FlatList showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false} style={stil.lista}
                        data={sortiranePrijave}
                        renderItem={({ item }) => (
                            <MojEvent naziv={item.naziv} tip={item.tip} vrijemePrvi={new Date(item.vrijeme).getDate()}
                                vrijemeDrugi={new Date(item.vrijeme).getMonth()+1} mjesto={item.mjesto}
                                nameIcon1={'eye'} nameIcon2={postaviPrihvaceno(item)} adresa={item.adresa}
                                kartica={{ backgroundColor: Boje.SvijetloPlava }} vrijeme={{ backgroundColor: Boje.Plava }}
                                uredi={() => navigation.navigate('Detalji', { id: item.id })} />
                        )}
                    /></View>
                : <View></View>}
        </View>
    );
}
const stil = StyleSheet.create({
    ekran: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Boje.SvijetloPlava,
    },
    lista: {
        width: '92%',
    },
    ispis: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        bottom: 0,
        position: 'absolute',
        height: '40%',
        maxHeight: '40%'
    },
    podrucjeKalendar: {
        width: '100%'
    },
    kalendar: {
        borderRadius: 20,
        backgroundColor: Boje.ProzirnoBijela,
        width: '100%'
    }
})
export default MojePrijave
