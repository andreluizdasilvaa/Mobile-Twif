import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Pressable, ActivityIndicator } from 'react-native';
import Toast from 'react-native-toast-message';
import styles from './styles';
import { loginRequest } from '../../services/authService';
import { validateEmail, validatePassword } from '../../utils/validation';

import InputText from '../../components/inputs/Input_text';
import Logo from '../../components/Logo';
import StandardButton from '../../components/inputs/buttonSubmit';

export default function Login({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({
        email: '',
        password: '',
    });

    const validateForm = () => {
        const emailError = validateEmail(email);
        const passwordError = validatePassword(password);
        const newErrors = {
            email: emailError,
            password: passwordError,
        };
        setErrors(newErrors);
        return !emailError && !passwordError;
    };

    async function submitForm() {
        if (loading) return;

        // Valida o formulário antes de prosseguir
        if (!validateForm()) {
            Toast.show({
                type: 'error',
                text1: 'Erro de validação',
                text2: 'Por favor, corrija os erros no formulário',
                position: 'top',
            });
            return;
        }

        setLoading(true);

        try {
            await loginRequest(email, password);

            Toast.show({
                type: 'success',
                text1: 'Login feito com sucesso!',
                text2: 'Seja bem-vindo(a) a TWIF',
                position: 'top',
            });

            navigation.replace('Home');
        } catch (error) {
            if (error.status === 401) {
                Toast.show({
                    type: 'error',
                    text1: 'Credenciais Invalidas!',
                    text2: 'Corrija os campos abaixo',
                    position: 'top',
                });
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Erro ao fazer Login!',
                    text2: 'Tente novamente mais tarde',
                    position: 'top',
                });
            }
        } finally {
            setLoading(false);
        }
    }

    // Modifique o retorno do componente para incluir as mensagens de erro:
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
                        onChangeText={text => {
                            setEmail(text);
                            // Limpa o erro quando o usuário começa a digitar
                            if (errors.email) {
                                setErrors(prev => ({ ...prev, email: '' }));
                            }
                        }}
                    />
                    {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
                </View>

                <View style={styles.containerInputForm}>
                    <Text style={styles.descTextInp}>Senha:</Text>
                    <InputText
                        placeholder="********"
                        keyboardType="default"
                        maxLength={50}
                        value={password}
                        secureTextEntry={true}
                        onChangeText={text => {
                            setPassword(text);
                            // Limpa o erro quando o usuário começa a digitar
                            if (errors.password) {
                                setErrors(prev => ({ ...prev, password: '' }));
                            }
                        }}
                    />
                    {errors.password ? (
                        <Text style={styles.errorText}>{errors.password}</Text>
                    ) : null}
                </View>

                <View style={styles.containerInputSubmit}>
                    <StandardButton onPress={submitForm} disabled={loading}>
                        <Text style={styles.textInputSubmit}>
                            {loading ? <ActivityIndicator size={24} color="#fff" /> : 'ENTRAR'}
                        </Text>
                    </StandardButton>

                    <Text style={[styles.forgotPassword, { textAlign: 'center' }]}>
                        Ainda não possui uma conta?
                        <Text
                            onPress={() => navigation.replace('Register')}
                            style={styles.linkHook}
                        >
                            Cadastre-se!
                        </Text>
                    </Text>
                </View>
            </View>
            <StatusBar style="auto" />
        </View>
    );
}
