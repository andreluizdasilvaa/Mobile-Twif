import { StyleSheet, Platform } from 'react-native';
import Colors from '../../constants/colors';
import colors from '../../constants/colors';

const styles = StyleSheet.create({
    container: {
        width: '100%',
        ...Platform.select({
            web: {
                minHeight: '90vh',
                flex: 1,
            },
            native: {
                height: '100%',
            },
        }),
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        paddingVertical: 14,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    userName: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    userNick: {
        fontSize: 14,
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 35,
    },
    // Standard Buttons
    containerButtonsRelatorio: {
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center',
        paddingVertical: 6,
        paddingHorizontal: 12,
        elevation: 10,
        borderRadius: 6,
        backgroundColor: `${Colors.primaryColor}`,
    },
    containerButtons: {
        gap: 24,
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    textButton: {
        fontSize: 14,
        fontWeight: 'bold',
    },
});

export default styles;