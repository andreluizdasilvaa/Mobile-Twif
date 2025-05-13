import { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import Logo from '../../components/Logo';
import { verifySession } from '../../services/authService';

export default function AuthLoading({ navigation }) {
    // Exemplo de uso na página
    useEffect(() => {
        const checkAuth = async () => {
            const result = await verifySession();
            if (result.authenticated) {
                return navigation.reset({
                    index: 0,
                    routes: [{ name: 'Home' }],
                });
            } else {
                return navigation.reset({
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
            <ActivityIndicator color="#000000" size={32} />
        </View>
    );
}
