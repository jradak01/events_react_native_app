import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Modal, Portal, Provider } from 'react-native-paper';

import { MaterialIcons, Feather } from '@expo/vector-icons';
import Boje from '../constants/Boje';

const Obavijest = (props) => {
  return (
    <Provider>
      <Portal>
        <Modal
          visible={props.vidljiv}
          dismissable={false}
          contentContainerStyle={stil.modalView}>
          <View style={stil.sadrzaj}>{props.children}</View>
          {props.obavijest? <View style={stil.tipke}>
            <TouchableOpacity onPress={props.potvrdi} style={stil.tipka}>
              <MaterialIcons name="done" size={24} color={Boje.TamnoZelena} />
            </TouchableOpacity>
            <TouchableOpacity onPress={props.izadi} style={stil.tipka}>
              <Feather name="x" size={24} color={Boje.Crvena} />
            </TouchableOpacity>
          </View>:
          <View style={stil.tipke}>
          <View style={{flex: 0.8}}></View>
            <TouchableOpacity onPress={props.potvrdi} style={[stil.tipka, {flex: 0.2}]}>
              <MaterialIcons name="done" size={24} color={Boje.TamnoZelena} />
            </TouchableOpacity>
          </View>
          }
        </Modal>
      </Portal>
    </Provider>
  );
};

const stil = StyleSheet.create({
  modalView: {
    backgroundColor: Boje.ProzirnoBijela,
    padding: 0,
    borderRadius: 20,
    width: Dimensions.get('window').width > 600 ? '60%' : '90%',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  tipke: {
    flexDirection: 'row',
    width: '100%',
    paddingTop: 10,
    backgroundColor: Boje.Bijela,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tipka: {
    flexDirection: 'column',
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sadrzaj: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default Obavijest;
