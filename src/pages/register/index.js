import { useState } from 'react';
import { View, Text, Pressable, Modal, ActivityIndicator } from 'react-native';

import Logo from '../../components/Logo';
import InputTextIcon from '../../components/inputs/Input_text-with-icon';
import InputDatePicker from '../../components/inputs/inputDate';
import StandardButton from '../../components/inputs/buttonSubmit';
import InputPicker from '../../components/inputs/inputPicker';

import { MaterialIcons } from '@expo/vector-icons';
import { verifyEmailValid, verifyUsernickValid } from '../../services/authService';
import styles from './styles';
import { StatusBar } from 'expo-status-bar';
import colors from '../../constants/colors';
import Toast from 'react-native-toast-message';
import {
    validateName,
    validateEmail,
    validatePassword,
    validateNickname,
} from '../../utils/validation';

// Funções utilitárias
function formatDate(date) {
    if (!date) return '';
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function getInitialFormState() {
    return {
        name: '',
        email: '',
        password: '',
        nickname: '',
        birthDate: null,
        course: '',
    };
}

export default function Register({ navigation }) {
    // States principais
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [newErrors, setNewErrors] = useState({});
    const [form, setForm] = useState(getInitialFormState());

    // Handlers de campos
    const handleChange = (field, value) => {
        setForm(prev => ({ ...prev, [field]: value }));
        if (newErrors[field]) {
            setNewErrors(prev => ({ ...prev, [field]: '' }));
        };
    };

    // Modal
    function handleModal() {
        setForm(prev => ({ ...prev, nickname: '', course: '' }));
        setModalVisible(!modalVisible);
    }

    // Validação do primeiro passo
    function validateForm1() {
        const dataValidate = {
            name: validateName(form.name),
            email: validateEmail(form.email),
            password: validatePassword(form.password),
        };
        setNewErrors(dataValidate);
        return !dataValidate.name && !dataValidate.email && !dataValidate.password;
    }

    // Handler do segundo passo (cadastro)
    async function handleRegister() {
        if(loading) return;

        const safeNickname = form.nickname.toLowerCase();
        const safeEmail = form.email.toLowerCase();
        const nicknameError = validateNickname(safeNickname);

        setNewErrors(prev => ({ ...prev, nickname: nicknameError }));
        if (nicknameError || !safeNickname) return;
        try {
            setLoading(true);
            const dataNick = await verifyUsernickValid(safeNickname);
            const dataMail = await verifyEmailValid(safeEmail);
            if (dataNick.valid && dataMail.valid) {
                navigation.navigate('ChoosePicture', {
                    name: form.name,
                    nickname: safeNickname,
                    email: safeEmail,
                    password: form.password,
                    birthDate: formatDate(form.birthDate),
                    course: form.course,
                });
            }
        } catch (error) {
            if (error.status === 409) {
                setNewErrors(prev => ({
                    ...prev,
                    nickname: 'Email ou nickname já em uso',
                    email: 'Email ou nickname já em uso',
                }));
                Toast.show({
                    type: 'error',
                    text1: 'Email ou nickname já em uso',
                    text2: 'Este email ou nickname já está em uso',
                    position: 'top',
                });
            }
        } finally {
            setLoading(false);
        }
    }

    // Handler do botão CONTINUAR
    function handleNextStep() {
        if (!validateForm1()) {
            Toast.show({
                type: 'error',
                text1: 'Dados invalidos',
                text2: 'Por favor, corrija os erros no formulário',
                position: 'top',
            });
            return;
        }
        handleModal();
    }

    // Renderização dos campos do primeiro passo
    function renderFirstStep() {
        return (
            <View style={styles.containerForm}>
                <Logo width={200} height={100} />

                <Text style={styles.textTittle}>Crie sua conta</Text>

                <View style={styles.containerInputForm}>
                    <Text>Seu nome:</Text>
                    <InputTextIcon
                        iconName={'happy-outline'}
                        placeholder={'Digite seu nome'}
                        keyboardType={'default'}
                        maxLength={50}
                        value={form.name}
                        onChangeText={text => handleChange('name', text)}
                    />
                    {newErrors.name ? <Text style={styles.errorText}>{newErrors.name}</Text> : null}
                </View>

                <View style={styles.containerInputForm}>
                    <Text>Seu Email:</Text>
                    <InputTextIcon
                        iconName={'mail-open-outline'}
                        placeholder={'meninodasilva@ALUNO.IFSP.EDU.BR'}
                        keyboardType={'email-address'}
                        maxLength={50}
                        value={form.email}
                        onChangeText={text => handleChange('email', text.toLowerCase())}
                    />
                    {newErrors.email ? (
                        <Text style={styles.errorText}>{newErrors.email}</Text>
                    ) : null}
                </View>

                <View style={styles.containerInputForm}>
                    <Text>Sua senha:</Text>
                    <InputTextIcon
                        iconName={'lock-closed-outline'}
                        placeholder={'********'}
                        keyboardType={'visible-password'}
                        maxLength={50}
                        minLength={8}
                        secureTextEntry={true}
                        value={form.password}
                        onChangeText={text => handleChange('password', text)}
                    />
                    {newErrors.password ? (
                        <Text style={styles.errorText}>{newErrors.password}</Text>
                    ) : null}
                </View>

                <View>
                    <StandardButton onPress={handleNextStep}>CONTINUAR</StandardButton>
                    <Text style={styles.textBottomBtnSubmit}>
                        Já faz parte da turma?
                        <Text style={styles.linkHook} onPress={() => navigation.replace('Login')}>
                            Faça seu Login.
                        </Text>
                    </Text>
                </View>
            </View>
        );
    }

    // Renderização dos campos do segundo passo (modal)
    function renderSecondStep() {
        return (
            <Modal visible={modalVisible} animationType="fade">
                <View style={[styles.containerForm, { marginHorizontal: 'auto' }]}>
                    <View style={styles.headerModal}>
                        <Pressable onPress={handleModal}>
                            <MaterialIcons
                                name="arrow-back"
                                size={30}
                                color={colors.primaryColor}
                            />
                        </Pressable>
                        <Logo width={110} height={60} />
                    </View>
                    <Text style={styles.titleTextModal}>Conte um pouco mais sobre você:</Text>
                    <View style={styles.containerInputForm}>
                        <Text>Seu apelido:</Text>
                        <InputTextIcon
                            iconName={'at-outline'}
                            placeholder={'@meninodasilva'}
                            keyboardType={'default'}
                            maxLength={50}
                            value={form.nickname}
                            onChangeText={text => handleChange('nickname', text.toLowerCase())}
                        />
                        {newErrors.nickname ? (
                            <Text style={styles.errorText}>{newErrors.nickname}</Text>
                        ) : null}
                    </View>
                    <View style={styles.containerInputForm}>
                        <Text>Sua data de nascimento:</Text>
                        <InputDatePicker
                            iconName={'balloon-outline'}
                            placeholder={'xx/xx/xxxx'}
                            value={form.birthDate}
                            onChange={date => handleChange('birthDate', date)}
                        />
                    </View>
                    <View style={styles.containerInputForm}>
                        <Text>O que você cursa:</Text>
                        <InputPicker
                            iconName={'star-outline'}
                            placeholder={'Seu curso, ex: engenharia civil'}
                            value={form.course}
                            onValueChange={value => handleChange('course', value)}
                        />
                    </View>
                    <StandardButton onPress={handleRegister} disabled={loading}>
                        {loading ? <ActivityIndicator size={24} color="#fff" /> : 'CADASTRAR'}
                    </StandardButton>
                </View>
            </Modal>
        );
    }

    // Render principal
    return (
        <View style={styles.container}>
            {renderFirstStep()}
            {renderSecondStep()}
            <StatusBar style="auto" />
        </View>
    );
}
