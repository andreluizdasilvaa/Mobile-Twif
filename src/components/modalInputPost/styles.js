import { StyleSheet } from 'react-native';
import { Platform } from 'react-native';

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',

        width: 80,
        height: 80,

        borderRadius: 40,

        backgroundColor: '#7EC543',
        boxShadow: '2px 2px 0px #000000',

        position: 'fixed',
        bottom: 80,
        right: 30,
        zIndex: 1000,
    },
});

export default styles;
