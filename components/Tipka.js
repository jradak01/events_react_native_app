import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import Boje from '../constants/Boje'

const Tipka = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={[stil.tipka, props.style]}>
        <Text style={[stil.naslov, props.stilNaslov]}>{props.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const stil = StyleSheet.create({
  tipka: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 4,
    backgroundColor: Boje.IspranaLjubicasta,
  },
  naslov: {
    color: Boje.Bijela,
    fontSize: 20
  }
});

export default Tipka;