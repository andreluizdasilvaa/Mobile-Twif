import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes';
import { navigationRef } from './src/services/navigationService';
import Toast from 'react-native-toast-message';
import Perfil from './src/pages/perfil';
import 'react-native-gesture-handler';

export default function App() {
    const [fontsLoaded] = useFonts({
        Gilroy_Extrabold: require('./src/assets/fonts/Gilroy-ExtraBold.otf'),
        Gilroy_Light: require('./src/assets/fonts/Gilroy-Light.otf'),
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <SafeAreaProvider>
            <NavigationContainer ref={navigationRef}>
                <Routes />
            </NavigationContainer>
            <Toast />
        </SafeAreaProvider>
    );
}
