import { StyleSheet } from 'react-native';
import colors from '../../constants/colors';
import fonts from '../../constants/fonts';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.backgroundGrayColor,
        paddingHorizontal: 30,
        paddingTop: 25,
    },
    headerTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textTittle: {
        fontSize: 28,
        fontWeight: 'bold',
        fontFamily: fonts.Gilroy_Extrabold,
    },
    descTittle: {
        color: colors.secondaryColor,
        textDecorationLine: 'underline',
    },
    containerInfoCard: {
        flexDirection: 'column',
        gap: 12,
        marginVertical: 25,
    },
    containerGraphic: {
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 24,
        padding: 16,
        marginBottom: 100,
        marginTop: 10
    },
    legendContainer: {
        marginTop: 16,
        width: '100%',
        alignItems: 'center',
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    legendColorBox: {
        width: 16,
        height: 16,
        marginRight: 8,
        borderRadius: 4,
    },
    legendText: {
        color: colors.grayColor,
        fontSize: 15,
    },
    header: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});

export default styles;
