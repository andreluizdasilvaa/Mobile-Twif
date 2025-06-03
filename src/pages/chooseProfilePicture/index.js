import react, { useEffect, useState } from 'react';
import { View, Text, Pressable, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { useRoute, useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { getAllImages, replaceProfile } from '../../services/imageService';
import { register } from '../../services/authService';

import ScreenLoader from '../../components/ScreenLoader';
import StandardButton from '../../components/inputs/buttonSubmit';

import appConfig from '../../config/appConfig';
import styles from './styles';
import colors from '../../constants/colors';

export default function ChooseProfilePicture() {
    const route = useRoute();
    const navigation = useNavigation();
    const [loading, setLoading] = useState(true);
    const [loadingForm, setLoadingForm] = useState(false);
    const [images, setImages] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(6); 
    const [selectedImage, setSelectedImage] = useState(null); 
    const { name,
            nickname, 
            email, 
            password, 
            birthDate, 
            course,
            isChangePicture = false,
        } = route.params;
    useEffect(() => {
        const loadImages = async () => {
            try {
                const data = await getAllImages();
                setImages(data.images);
                setSelectedImage(data.images[0]);  
            } catch (error) {
                console.log('Erro: ', error);
            } finally {
                setLoading(false);
            }
        };
        loadImages();
    }, []);

    function nextImage() {
        if (images.length === 0) return;
        const nextIndex = (currentIndex + 1) % images.length;
        setCurrentIndex(nextIndex);
        setSelectedImage(images[nextIndex]);
    }

    function prevImage() {
        if (images.length === 0) return;
        const prevIndex = (currentIndex - 1 + images.length) % images.length;
        setCurrentIndex(prevIndex);
        setSelectedImage(images[prevIndex]);
    }

    async function handleSave() {
        if(loadingForm) return;
        setLoadingForm(true);

        try {
            await register(email, password, nickname, name, selectedImage.filename, birthDate, course);
            Toast.show({
                type: 'success',
                text1: 'Cadastro realizado com sucesso!',
                text2: 'Faça o login para entrar no TWIF!',
                position: 'top',
            });
            navigation.replace('Login');
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Erro ao criar cadastro',
                text2: 'Tente novamente mais tarde, ou entre em contato com o suporte pelo site.',
                position: 'top',
            });
            navigation.replace('Login');
        } finally {
            setLoadingForm(false);
        }
    }

    async function replaceProfileUser() {
        if(loadingForm) return;
        setLoadingForm(true);
        try {
            await replaceProfile(selectedImage.filename, nickname)
            Toast.show({
                type: 'success',
                text1: 'Avatar atualizado com sucesso!',
                position: 'top',
            });
            navigation.goBack();
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Erro ao criar atualizar cadastro',
                text2: 'Tente novamente mais tarde, ou entre em contato com o suporte pelo site.',
                position: 'top',
            });
            navigation.goBack();
        } finally {
            setLoadingForm(false);
        }
    }

    if (loading) {
        return <ScreenLoader />;
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>

                {isChangePicture ? (
                    <TouchableOpacity style={{ marginRight: 'auto'}} onPress={() => navigation.goBack()}>
                        <MaterialIcons name="arrow-back" size={30} color={colors.primaryColor} />
                    </TouchableOpacity>
                ) : null}

                <Text style={styles.title}>Escolha seu avatar.</Text>
                <Text style={styles.textDesc}>
                    Esse será o ícone exibido no seu perfil. Não se preocupe, você poderá alterá-lo
                    quando quiser.
                </Text>
            </View>

            <View style={styles.containerCarrousel}>
                <Pressable onPress={prevImage} disabled={loadingForm}>
                    <MaterialIcons name="keyboard-arrow-left" size={40} color="black" />
                </Pressable>
                {images.length > 0 && (
                    <Image
                        source={{ uri: `${appConfig.URL_API}${images[currentIndex].url}` }}
                        style={styles.img}
                    />
                )}
                <Pressable onPress={nextImage} disabled={loadingForm}>
                    <MaterialIcons name="keyboard-arrow-right" size={40} color="black" />
                </Pressable>
            </View>

            <StandardButton 
                onPress={ isChangePicture ? replaceProfileUser : handleSave }
                disabled={loadingForm}
            >
                {loadingForm ? (
                    <ActivityIndicator size={24} color="#fff" />
                ) : (
                    'SALVAR'
                )}
            </StandardButton>
        </SafeAreaView>
    );
}
