import { StyleSheet } from 'react-native';
import colors from '../../constants/colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        width: '100%',
        marginHorizontal: 'auto',
        borderBottomColor: colors.grayColor,
        borderBottomWidth: 0.5,
        backgroundColor: colors.whiteColor,
    },
    headerContent: {
        width: '90%',
        maxWidth: 500,
        marginHorizontal: 'auto',
        paddingVertical: 25,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    emptyText: {
        fontSize: 16,
        color: colors.grayColor,
        fontWeight: 'bold',
        position: 'absolute',
        top: '50%',
        left: 0,
        right: 0,
        textAlign: 'center',
        transform: [{ translateY: -8 }],
    },
});

export default styles;
