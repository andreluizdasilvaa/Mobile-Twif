import react, { useState } from "react";
import {
    StatusBar,
    View,
    TouchableOpacity,
    Text,
    ScrollView,
    ActivityIndicator
} from 'react-native';
import { 
    MaterialIcons,
} from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import { editInfoUser } from "../../services/userService";
import { useNavigation } from '@react-navigation/native';
import { useUserStore } from '../../stores/userStore';

import Logo from "../../components/Logo";
import InputTextIcon from "../../components/inputs/Input_text-with-icon";
import InputPicker from "../../components/inputs/inputPicker";
import InputDatePicker from "../../components/inputs/inputDate";
import InputBio from "../../components/inputs/inputBio";
import StandardButton from "../../components/inputs/buttonSubmit";

import styles from './styles';
import colors from "../../constants/colors";

export default function ChangeInfoUser({ navigation }) {
    const navigate = useNavigation();
    const { updateNameUser } = useUserStore();

    const [name, setName] = useState('')
    const [course, setCourse] = useState('')
    const [birthDate, setBirthDate] = useState(null)
    const [bio, setBio] = useState('')
    const [loading, setLoading] = useState(false);

    async function handleEditUser() {
        setLoading(true)
        if(!name && !course && !birthDate && !bio) {
            Toast.show({
                type: 'error',
                text1: 'Os campos não podem estar vazio.',
                text2: 'Corrija os campos abaixo',
                position: 'bottom',
            });
            setLoading(false);
            return;
        };

        await editInfoUser(name.trim(), course, birthDate, bio.trim())
        .then((snapshot) => {
            console.log(snapshot)
            Toast.show({
                type: 'success',
                text1: 'Perfil atualizado com sucesso!',
                text2: 'Suas informações foram atualizadas com sucesso.',
                position: 'top',
            });

            updateNameUser(snapshot.nome)

            setName('');
            setCourse('');
            setBirthDate(null);
            setBio('');
            navigate.reset({
                index: 0,
                routes: [{ name: 'Home', params: { shouldRefreshFeed: true } }],
            });
        })
        .catch((e) => {
            console.log('ERROR: ', e)
            Toast.show({
                type: 'error',

                text1: 'Ocorreu um erro.',
                text2: 'Por favor, tente mais tarde.',
                position: 'top',
            });
        })

        setLoading(false);
    }

    return (
        <View style={styles.container}>
            <View style={styles.headerTop}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.goBack();
                    }}
                >
                    <MaterialIcons
                        name="arrow-back"
                        size={30}
                        color={colors.primaryColor}
                    />
                </TouchableOpacity>

                <Logo width={100} height={60} />
            </View>
            <Text style={styles.title}>Edite suas Informações.</Text>
            <Text style={styles.subTtitle}>Edite as informações do seu perfil</Text>

            <ScrollView 
                style={styles.containerInputs}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.containerInputForm}>
                    <Text>Nome:</Text>
                    <InputTextIcon
                        iconName={'happy-outline'}
                        placeholder={'Digite seu nome'}
                        keyboardType={'default'}
                        value={name}
                        onChangeText={(e) => setName(e)}
                        maxLength={50}
                    />
                </View>

                <View style={styles.containerInputForm}>
                    <Text>Curso:</Text>
                    <InputPicker
                        iconName={'star-outline'}
                        value={course}
                        onValueChange={(e) => setCourse(e)}
                        placeholder={'Seu curso, ex: engenharia civil'}
                    />
                </View>

                <View style={styles.containerInputForm}>
                    <Text>Data de nascimento:</Text>
                    <InputDatePicker
                        iconName={'balloon-outline'}
                        value={birthDate}
                        onChange={(e) => setBirthDate(e)}
                        placeholder={'xx/xx/xxxx'}
                    />
                </View>

                <View style={styles.containerInputForm}>
                    <Text>Bio:</Text>
                    <InputBio 
                        iconName={'balloon-outline'}
                        value={bio}
                        onChangeText={(e) => setBio(e)}
                        placeholder={'Sua nova bio...'}
                        maxLength={50}
                    />
                </View>

                <View style={[styles.containerInputForm, { marginTop: 25, marginBottom: 25 }]}>
                    <StandardButton onPress={handleEditUser} disabled={loading}>
                        {loading ? (
                            <ActivityIndicator size={24} color="#fff" />
                        ) : (
                            'ENVIAR'
                        )}
                    </StandardButton>
                </View>

            </ScrollView> 

            <StatusBar backgroundColor={colors.backgroundGrayColor} />
        </View>
    )
}