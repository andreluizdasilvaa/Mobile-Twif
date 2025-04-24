import { StatusBar } from 'expo-status-bar';
import { Text, View, Pressable } from 'react-native';
import styles from './styles';

import InputText from '../../components/Input_text';
import Logo from '../../components/Logo';
import StandardButton from '../../components/buttonSubmit';

export default function Login({ navigation }) {
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
                    />
                </View>

                <View style={styles.containerInputForm}>
                    <Text style={styles.descTextInp}>Sua senha:</Text>
                    <InputText
                        placeholder="wasdasd"
                        keyboardType="visible-password"
                        maxLength={50}
                    />

                    <Pressable>
                        <Text style={styles.forgotPassword}>Esqueceu a senha?</Text>
                    </Pressable>
                </View>

                <View style={styles.containerInputSubmit}>
                    <StandardButton onPress={() => navigation.navigate('Home')}>ENTRAR</StandardButton>
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
