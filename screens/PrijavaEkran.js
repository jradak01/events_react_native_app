import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Image, Dimensions, Platform, KeyboardAvoidingView, Keyboard } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import { login } from "../store/actions/login";

import Tipka from '../components/Tipka';

import Boje from '../constants/Boje';
import PocetniStil from '../constants/PocetniStil';

const Prijava = ({ navigation }) => {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const dispatch = useDispatch()
    const onLogin = () => {
        let user = {
            username: username,
            pass: password,
        };
        dispatch(login(user))
    }
    return (
        <KeyboardAvoidingView style={stil.ekran} behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <View style={PocetniStil.katricaTop}>
                <View style={stil.slikaOkvir}>
                    <Image
                        style={stil.slika}
                        resizeMode="stretch"
                        source={require('../assets/login_photo.jpg')}
                    />
                </View>
                <Text style={stil.tekst}>Dobrodošli!</Text>
                <View style={stil.polja}>
                    <TextInput style={stil.unos} placeholder="Korisničko ime" onChangeText={(username) => setUsername(username)} onSubmitEditing={Keyboard.dismiss} />
                    <TextInput style={stil.unos} secureTextEntry={true} placeholder="Lozinka" onChangeText={(password) => setPassword(password)} onSubmitEditing={Keyboard.dismiss} />
                    <Tipka onPress={() => onLogin()} style={{ width: Dimensions.get('window').width / 1.25, marginTop: Dimensions.get('window').height / Dimensions.get('window').width >= 2 ? '5%' : '1%' }} title="Login" />
                </View>
            </View>
            <View style={stil.dno}>
                <Tipka onPress={() => navigation.navigate('Register')} style={{ backgroundColor: 'none', color: Boje.Bijela }} title="Registracija" />
            </View>
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
    slika: {
        width: '100%',
        height: '100%',
    },
    slikaOkvir: {
        width: Dimensions.get("window").width > 500 ? Dimensions.get("window").width / 2.5 : Dimensions.get("window").width / 1.12,
        height: Dimensions.get('window').height > 720 ? Dimensions.get("window").height / 3 : Dimensions.get("window").height / 3.5,
        borderRadius: 20,
        borderWidth: 4,
        borderColor: Boje.ProzirnoBijela,
        overflow: 'hidden'
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
        paddingTop: Dimensions.get('window').height / Dimensions.get('window').width >= 2 ? '5%' : '1%',
        paddingBottom: Dimensions.get('window').height / Dimensions.get('window').width >= 2 ? '5%' : '1%'
    },
    tekst: {
        fontSize: 28,
        color: Boje.TamnoLjubicasta,
        paddingTop: Dimensions.get('window').height / Dimensions.get('window').width >= 2 ? '10%' : '1%',
        fontFamily: 'pacifico'
    },
    dno: {
        bottom: Dimensions.get('window').height / 90,
        position: 'absolute',
        fontDisplay: 'block',
    }
})
export default Prijava
