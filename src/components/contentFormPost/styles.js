import { StyleSheet } from 'react-native';
import colors from '../../constants/colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '90%',
        margin: 'auto',
        flexDirection: 'column',
        backgroundColor: 'white',
        padding: 0,
        gap: 12,
    },
    infoPostUser: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    header: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 8,
    },
    image: {
        width: 30,
        height: 30,
        borderRadius: 15,
        elevation: 2,
    },
    inputWrapper: {
        flex: 1,
        width: '100%',
        paddingHorizontal: 8,
        paddingBottom: 8,
    },
    textInput: {
        flex: 1,
        width: '100%',
        fontSize: 16,
        textAlignVertical: 'top',
        backgroundColor: 'transparent',
        padding: 0,
        margin: 0,
    },
    btnSubmit: {
        backgroundColor: colors.primaryColor,
        paddingVertical: 6,
        paddingHorizontal: 16,
        borderRadius: 6,
        fontWeight: 'bold',
    },
    textBtnSubmit: {
        fontWeight: 'bold',
    },
});

export default styles;
