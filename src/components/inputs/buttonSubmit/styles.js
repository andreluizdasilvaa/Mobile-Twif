import { StyleSheet } from 'react-native';
import colors from '../../../constants/colors';

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 45,
        backgroundColor: colors.primaryColor,
        borderRadius: 10,
    },
    textBtn: {
        fontWeight: 'bold',
        fontSize: 16,
    }
})

export default styles;