import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Dimensions, Platform, KeyboardAvoidingView, Keyboard } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import { register } from "../store/actions/login";

import Tipka from '../components/Tipka';
import Obavijest from '../components/Modal';

import Boje from '../constants/Boje';
import PocetniStil from '../constants/PocetniStil';

const Registracija = ({ route, navigation }) => {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [email, setEmail] = useState();
    const [name, setName] = useState();
    const [vidljiv, postaviVidljiv] = useState(false)
    const dispatch = useDispatch()
    const onRegister = () => {
        let user = {
            username: username,
            pass: password,
            ime: name,
            email: email
        };
        dispatch(register(user))
        postaviVidljiv(true)
    }
    return (
        <KeyboardAvoidingView style={stil.ekran} behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <View style={PocetniStil.katricaTop}>
                <Text style={stil.tekst}>Dobrodošli!</Text>
                <View style={stil.polja}>
                    <TextInput style={stil.unos} placeholder="Korisničko ime" onChangeText={(username) => setUsername(username)} onSubmitEditing={Keyboard.dismiss} />
                    <TextInput style={stil.unos} placeholder="Ime" onChangeText={(name) => setName(name)} onSubmitEditing={Keyboard.dismiss} />
                    <TextInput style={stil.unos} placeholder="Email" onChangeText={(email) => setEmail(email)} onSubmitEditing={Keyboard.dismiss} />
                    <TextInput style={stil.unos} placeholder="Lozinka" secureTextEntry={true} onChangeText={(password) => setPassword(password)} onSubmitEditing={Keyboard.dismiss} />
                    <Tipka onPress={() => onRegister()} style={{ width: Dimensions.get('window').width / 1.25, marginTop: '5%' }} title="Registracija" />
                </View>
            </View>
            <View style={stil.dno}>
                <Tipka onPress={() => navigation.navigate('Login')} style={{ backgroundColor: 'none', color: Boje.Bijela, width: Dimensions.get('window').width / 1.25, }} title="Login" />
            </View>
            <Obavijest vidljiv={vidljiv} potvrdi={() => postaviVidljiv(false)} obavijest={false}>
                <Text style={{ fontSize: 20 }}>Neuspješna registracija!</Text>
            </Obavijest>
        </KeyboardAvoidingView>
    );
}

const stil = StyleSheet.create({
    ekran: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Boje.IspranaLjubicasta,
    },
    unos: {
        width: '80%',
        fontSize: 20,
        backgroundColor: 'white',
        borderRadius: 6,
        paddingTop: '2%',
        paddingBottom: '2%',
        marginTop: Dimensions.get('window').height / Dimensions.get('window').width >= 2 ? '3%' : '0.5%',
        marginBottom: Dimensions.get('window').height / Dimensions.get('window').width >= 2 ? '3%' : '0.5%'
    },
    polja: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        paddingTop: Dimensions.get('window').height / Dimensions.get('window').width >= 2 ? '5%' : '2%',
        paddingBottom: Dimensions.get('window').height / Dimensions.get('window').width >= 2 ? '5%' : '2%'
    },
    tekst: {
        fontSize: 28,
        color: Boje.TamnoLjubicasta,
        fontFamily: 'pacifico',
        fontDisplay: 'block',
    },
    dno: {
        bottom: Dimensions.get('window').height / 90,
        position: 'absolute'
    }
})
export default Registracija
