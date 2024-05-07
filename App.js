import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Provider } from 'react-redux';
import { Store } from './store/store';
import { useSelector, useDispatch } from 'react-redux';
import { init } from './store/actions/login';

import { AntDesign } from '@expo/vector-icons';
import * as Font from 'expo-font'
import AppLoading from 'expo-app-loading'
import Boje from './constants/Boje';

import MojiEventi from './screens/MojiEventiEkran';
import Naslovna from './screens/NaslovnicaEkran';
import MojePrijave from './screens/MojePrijaveEkran';
import Prijava from './screens/PrijavaEkran';
import Registracija from './screens/RegistracijaEkran';
import Detalji from './screens/DetaljiEkran';
import Unos from './screens/UnosEkran';
import Uredi from './screens/UrediEkran';

const dohvatiFont = () => {
  return Font.loadAsync({
    'pacifico': require('./assets/fonts/Pacifico-Regular.ttf')
  })
}

const AuthStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ tabBarStyle: { backgroundColor: Boje.Bijela, border: 'none' } }}>
      <Stack.Screen name="Login" component={Prijava} options={{ headerShown: false }} />
      <Stack.Screen name="Register" component={Registracija} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
const UserStack = () => {
  const Tab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();
  const tabOptions = ({ route }) => ({
    tabBarIcon: ({ focused, color, size }) => {
      let imeIkone;
      if (route.name === 'Naslovnica') {
        imeIkone = 'home'

      } else if (route.name === 'Moje Prijave') {
        imeIkone = 'calendar'

      } else if (route.name === 'Profil') {
        imeIkone = 'user'

      }
      return <AntDesign name={imeIkone} size={size} color={color} />;
    },
    tabBarActiveTintColor: Boje.Crna,
    tabBarInactiveTintColor: Boje.TamnoSiva
  });
  const TabNavigator = () => {
    return (
      <Tab.Navigator screenOptions={{
        headerShown: false,
        tabBarStyle: styles.navigacija
      }}>
        <Tab.Screen name="Naslovnica" component={Naslovna} options={tabOptions} />
        <Tab.Screen name="Moje Prijave" component={MojePrijave} options={tabOptions} />
        <Tab.Screen name="Profil" component={MojiEventi} options={tabOptions} />
      </Tab.Navigator>
    );
  }
  return (
    <Stack.Navigator screenOptions={{ tabBarStyle: { backgroundColor: Boje.Bijela, border: 'none' } }}>
      <Stack.Screen name="Eventi" component={TabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="Detalji" component={Detalji} options={{ headerShown: false }} />
      <Stack.Screen name="Unos" component={Unos} options={{ headerShown: false }} />
      <Stack.Screen name="Uredi" component={Uredi} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
const RootNavigation = () => {
  const korisnik = useSelector(state => state.login.token)
  const dispatch = useDispatch()
  const readItem = async () => {
    await dispatch(init())
  }
  useEffect(() => {
    readItem()
  }, []);
  return (
    <NavigationContainer>
      {korisnik === null ?
        <AuthStack /> : <UserStack />
      }
    </NavigationContainer >
  );
}

export default function App() {
  const [podaciUcitani, postaviPodatkeUcitane] = useState(false)
  if (!podaciUcitani) {
    return (<AppLoading
      startAsync={dohvatiFont}
      onFinish={() => postaviPodatkeUcitane(true)}
      onError={(err) => console.log(err)}
    />
    )
  }
  return (
    <Provider store={Store}>
      <RootNavigation />
    </Provider>
  );
}

const styles = StyleSheet.create({
  navigacija: {
    shadowColor: Boje.TamnoSiva,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 12,
    shadowOpacity: 0.5,
    elevation: 20,
    borderTopEndRadius: 20,
    borderTopStartRadius: 20
  }
});
