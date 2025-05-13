import { StyleSheet, Dimensions } from 'react-native';
import colors from '../../constants/colors';
import fonts from '../../constants/fonts';

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
    header: {
        width: '100%',
        backgroundColor: colors.backgroundDarkColor,
        height: height * 0.25,
        padding: 12,
    },
    containerInfo: {
        width: width * 0.98,
        maxWidth: 500,
        flexDirection: 'row',
        alignItems: 'flex-start',
        // backgroundColor: '#f3f',
        paddingTop: 12,
        paddingHorizontal: 10,
        alignSelf: 'center',
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 75,
        position: 'relative',
        bottom: 75,
    },
    contentInfo: {
        flexShrink: 1,
        flexWrap: 'wrap',
        flex: 1,
        paddingLeft: 10,
    },
    nameUserText: {
        fontSize: 17,
        fontWeight: 'bold',
        marginBottom: 0,
    },
    descUserText: {
        color: colors.primaryColor,
        paddingVertical: 3
    },
    containerIconInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 12,
    },
    infoIcon: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 3,
        flexShrink: 1,
        maxWidth: '50%',
    },
    textInfo: {
        flexShrink: 1,
        flexWrap: 'wrap',
        width: '100%',
        fontSize: 14,
    },
    infoIconText: {
        flexShrink: 1,
        flexWrap: 'wrap',
        fontSize: 12,
    },
    containerPosts: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default styles;
