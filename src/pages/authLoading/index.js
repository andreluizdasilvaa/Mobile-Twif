import { useEffect } from 'react';
import { View } from 'react-native';
import Loader from '../../components/loader/index';
import Logo from '../../components/Logo';
import { verifySessiom } from '../../services/authService';

export default function AuthLoading({ navigation }) {
    // Exemplo de uso na página
    useEffect(() => {
        const checkAuth = async () => {
            const result = await verifySessiom();
            if (result.authenticated) {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Home' }],
                });
            } else {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Login' }],
                });
            }
        };

        checkAuth();
    }, []);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ position: 'absolute', opacity: 1 / 3 }}>
                <Logo width={200} height={130} />
            </View>
            <Loader color="#000000" size={32} />
        </View>
    );
}
