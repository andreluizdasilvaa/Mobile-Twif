import { StyleSheet, Platform } from 'react-native';
import colors from '../../constants/colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    ContainerTextComment: {
        width: '90%',
        maxWidth: 700,
        margin: 'auto',
    },
    textComment: {
        color: colors.grayColor,
        fontWeight: 'bold',
        fontSize: 16,
    },
    noCommentsContainer: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    noCommentsText: {
        fontSize: 16,
        color: colors.grayColor,
    },
    containerComments: {
        flex: 1,
    },
    commentPost: {
        transform: [{ scale: 0.95 }],
        minHeight: 140,
    },
});

export default styles;
