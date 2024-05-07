import { StyleSheet, Dimensions } from 'react-native'
import Boje from './Boje'

export default StyleSheet.create({
    kartica: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        bottom: 0,
        position: 'absolute',
        backgroundColor: Boje.ProzirnoBijela,
        height: Dimensions.get('window').height / 1.25,
        width: Dimensions.get('window').width / 1.05
    },
    katricaTop: {
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        top: 0,
        position: 'absolute',
        backgroundColor: Boje.ProzirnoBijela,
        height: Dimensions.get('window').height / 1.12,
        width: Dimensions.get('window').width / 1.05
    }
})