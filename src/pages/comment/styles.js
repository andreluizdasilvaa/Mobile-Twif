import { StyleSheet, Platform } from 'react-native';
import colors from '../../constants/colors';
import { Dimensions } from 'react-native';

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
    modalBackground: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        height: Dimensions.get('window').height * 0.5,
        width: '100%',
        backgroundColor: '#fff',
        overflow: 'hidden',
        borderTopWidth: 0.5,
        borderColor: '#000',
    },
});

export default styles;
