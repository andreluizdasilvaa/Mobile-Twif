import { StyleSheet } from 'react-native';
import { Platform } from 'react-native';
import Colors from "../../constants/colors";

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 70,
        height: 70,
        borderRadius: 40,
        backgroundColor: Colors.primaryColor,
        boxShadow: '2px 2px 0px #000000',

        // Use 'fixed' for the web and 'absolute' for Android.
        position: Platform.OS === 'web' ? 'fixed' : 'absolute',

        // Ensure correct positioning on both platforms.
        bottom: Platform.OS === 'web' ? 80 : 30,  
        right: Platform.OS === 'web' ? 30 : 20,  // Position on the right for web
        left: Platform.OS === 'android' ? 300 : null,  // Position on the left for Android

        zIndex: 1000,
    },
});

export default styles;
