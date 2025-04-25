import { StatusBar } from 'expo-status-bar';
import { Text, View, Pressable } from 'react-native';
import styles from './styles';

import Toast from 'react-native-toast-message';
import InputText from '../../components/Input_text';
import Logo from '../../components/Logo';
import StandardButton from '../../components/buttonSubmit';
import { useState } from 'react';

export default function Login({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    function submitForm() {
        if (loading) return;
        setLoading(true);
        console.log('Email: ', email);
        console.log('Senha: ', password);

        // simula um tempo de envio
        setTimeout(() => {
            setLoading(false);
            Toast.show({
                type: 'success', // 'success' | 'error' | 'info'
                text1: 'Login feito com sucesso!',
                text2: 'Seja bem-vindo(a) ao app 👋',
                position: 'top', // ou 'bottom'
            });

            // navigation.navigate('Home');
        }, 2000);
    }

    return (
        <View style={styles.container}>
            <View style={styles.containerForm}>
                <View style={styles.containerLogo}>
                    <Logo width={200} height={100} />
                </View>

                <View style={styles.containerInputForm}>
                    <Text>Seu e-mail:</Text>
                    <InputText
                        placeholder="meninodasilva@ALUNO.IFSP.EDU.BR"
                        keyboardType="email-address"
                        maxLength={70}
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>

                <View style={styles.containerInputForm}>
                    <Text style={styles.descTextInp}>Sua senha:</Text>
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
                        {loading ? 'Enviando...' : 'ENTRAR'}
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
