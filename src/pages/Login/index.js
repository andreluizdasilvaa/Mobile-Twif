import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Pressable } from 'react-native';
import Toast from 'react-native-toast-message';

import styles from './styles';

import { loginRequest } from '../../services/authService';

import InputText from '../../components/inputs/Input_text';
import Logo from '../../components/Logo';
import StandardButton from '../../components/inputs/buttonSubmit';
import Loader from '../../components/loader';

export default function Login({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({
        email: '',
        password: '',
    });

    const validateForm = () => {
        let isValid = true;
        const newErrors = {
            email: '',
            password: '',
        };

        // Validação do email
        if (!email) {
            newErrors.email = 'O email é obrigatório';
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = 'Digite um email válido';
            isValid = false;
        } else if (!email.toLowerCase().endsWith('@aluno.ifsp.edu.br') && 
                   !email.toLowerCase().endsWith('@ifsp.edu.br')) {
            newErrors.email = 'Use seu email institucional ...@aluno.ifsp.edu.br';
            isValid = false;
        }

        // Validação da senha
        if (!password) {
            newErrors.password = 'A senha é obrigatória';
            isValid = false;
        } else if (password.length < 8) {
            newErrors.password = 'A senha deve ter no mínimo 8 caracteres';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
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
            const data = await loginRequest(email, password);

            Toast.show({
                type: 'success',
                text1: 'Login feito com sucesso!',
                text2: 'Seja bem-vindo(a) a TWIF',
                position: 'top',
            });

            navigation.replace('Home');
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
                        onChangeText={text => {
                            setPassword(text);
                            // Limpa o erro quando o usuário começa a digitar
                            if (errors.password) {
                                setErrors(prev => ({ ...prev, password: '' }));
                            }
                        }}
                        secureTextEntry={true}
                    />
                    {errors.password ? (
                        <Text style={styles.errorText}>{errors.password}</Text>
                    ) : null}

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
                        <Pressable onPress={() => navigation.replace('Register')}>
                            <Text style={styles.linkHook}>Cadastre-se!</Text>
                        </Pressable>
                    </Text>
                </View>
            </View>
            <StatusBar style="auto" />
        </View>
    );
}
