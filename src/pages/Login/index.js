import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Pressable } from 'react-native';
import Toast from 'react-native-toast-message';

import styles from './styles';

import { getItem } from '../../services/storageService';
import { loginRequest } from '../../services/authService';

import InputText from '../../components/inputs/Input_text';
import Logo from '../../components/Logo';
import StandardButton from '../../components/inputs/buttonSubmit';
import Loader from '../../components/loader';

export default function Login({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    async function submitForm() {
        if (loading) return;
        setLoading(true);

        await new Promise(resolve => setTimeout(resolve, 3000)); // simulando atraso do servidor - 3s
        try {
            const data = await loginRequest(email, password);

            Toast.show({
                type: 'success',
                text1: 'Login feito com sucesso!',
                text2: 'Seja bem-vindo(a) a TWIF',
                position: 'top',
            });

            navigation.navigate('Home');
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Erro ao fazer login',
                text2: error.message || 'Tente novamente!',
                position: 'top',
            });
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        async function checkToken() {
            const token = await getItem('your-session-token');
            if (token) {
                navigation.navigate('Home'); 
            }
        }
    
        checkToken();
    }, [navigation]);

    return (
        <View style={styles.container}>
            <View style={styles.containerForm}>
                <View style={styles.containerLogo}>
                    <Logo width={200} height={100} />
                </View>

                <View style={styles.containerInputForm}>
                    <Text>E-mail:</Text>
                    <InputText
                        placeholder="meninodasilva@ALUNO.IFSP.EDU.BR"
                        keyboardType="email-address"
                        maxLength={70}
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>

                <View style={styles.containerInputForm}>
                    <Text style={styles.descTextInp}>Senha:</Text>
                    <InputText
                        placeholder="********"
                        keyboardType="default"
                        maxLength={50}
                        value={password}
                        onChangeText={setPassword}
                    />

                    <Pressable>
                        <Text style={styles.forgotPassword}>Esqueceu a senha?</Text>
                    </Pressable>
                </View>

                <View style={styles.containerInputSubmit}>
                    <StandardButton onPress={submitForm} disabled={loading}>
                        <Text style={styles.textInputSubmit}>
                            {loading ? <Loader size={24} color="#fff" /> : 'ENTRAR'}
                        </Text>
                    </StandardButton>

                    <Text style={[styles.forgotPassword, { textAlign: 'center' }]}>
                        Ainda não possui uma conta?
                        <Pressable onPress={() => navigation.navigate('Register')}>
                            <Text style={styles.linkHook}>Cadastre-se!</Text>
                        </Pressable>
                    </Text>
                </View>
            </View>
            <StatusBar style="auto" />
        </View>
    );
}
