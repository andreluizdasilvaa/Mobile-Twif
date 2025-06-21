import { StyleSheet } from 'react-native';
import colors from '../../constants/colors';
import fonts from '../../constants/fonts';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 30,
        backgroundColor: colors.backgroundGrayColor,
    },
    headerTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 25
    },
    title: {
        fontSize: 30,
        fontWeight: '900',
        
    },
    subTtitle: {
        color: colors.secondaryColor,
        textDecorationLine: 'underline',
        fontWeight: '600'
    },
    containerInputs: {
        marginTop: 25,
        flexDirection: 'column',
    },
    containerInputForm: {
        flexDirection: 'column',
        marginTop: 12
    },

})

export default styles;