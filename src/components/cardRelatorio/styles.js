import { StyleSheet, Platform } from 'react-native';
import fonts from '../../constants/fonts';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 12,
        borderWidth: 1,
        elevation: 4
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    body: {
        paddingVertical: 25,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInfo: {
        fontSize: 40,
        fontFamily: fonts.Gilroy_Extrabold
    }
})

export default styles;