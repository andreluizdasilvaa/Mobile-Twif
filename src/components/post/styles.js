import { StyleSheet } from 'react-native';
import colors from '../../constants/colors';

const styles = StyleSheet.create({
    container: {
        width: '90%',
        maxWidth: 700,
        margin: 'auto',
        minHeight: 180,
        backgroundColor: colors.whiteColor,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
        marginVertical: 16,
        padding: 18,
        borderRadius: 24,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        gap: 10,
    },
    nameUser: {
        fontWeight: '500', // 'medium' não é aceito direto, melhor usar numérico
        fontSize: 16,
      },
      userNick: {
        fontSize: 12,
        color: 'gray',
      },
    content: {
        marginVertical: 10,
    },
    footer: {
        marginTop: 15,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 20,
    },
    containerIcon: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    imageUser: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
});

export default styles;
