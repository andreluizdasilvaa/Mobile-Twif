import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { Image } from 'expo-image';
import { SafeAreaView } from 'react-native-safe-area-context';

import { FontAwesome5, MaterialIcons, Ionicons } from '@expo/vector-icons';

import appConfig from '../../config/appConfig';
import { useUserStore } from '../../stores/userStore';
import colors from '../../constants/colors';
import styles from './styles';
import DefaultModal from '../DefaultModal';

import { deleteItem } from '../../services/storageService';

export default function ContentDrawerBurguer({ navigation, closeDrawer }) {
    const { userNick, isAdmin, clearUserData, profilePicture } = useUserStore();
    const name = useUserStore(state => state.name);
    const [isLogginOut, setIsLogginOut] = useState(false);
    const [showModal, setShowModal] = useState(false);
    
    async function handleLogout() {
        if (isLogginOut) return; // Evita múltiplos cliques

        setIsLogginOut(true);
        try {
            await deleteItem(appConfig.TOKEN_KEY);
            await clearUserData();
            closeDrawer();
            navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
            });
        } catch (error) {
            // Em caso de erro, permite que o usuário tente novamente
            setIsLogginOut(false);
        }
    }

    // Função para abrir o modal
    const handleLogoutPress = () => {
        setShowModal(true);
    };

    // Função para truncar o nome do usuário
    function getTruncatedName(name) {
        if (!name) return '';
        return name.length > 5 ? name.slice(0, 6) + '...' : name;
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Image source={`${appConfig.URL_API}/image/default/${profilePicture}`} style={styles.image} />
                <View>
                    <Text style={styles.userName}>{getTruncatedName(name)}</Text>
                    <Text style={styles.userNick}>@{userNick}</Text>
                </View>
            </View>

            <View style={styles.containerButtons}>
                {isAdmin && (
                    <TouchableOpacity 
                        style={styles.containerButtonsRelatorio}
                        onPress={() => {
                            navigation.navigate('Relatorio')
                        }}
                    >
                        <View style={styles.shadowView} />
                        <Ionicons name="newspaper-outline" size={30} color="black" />
                        <Text style={styles.textButton}>RELATÓRIOS</Text>
                    </TouchableOpacity>
                )}
                <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate('ChangeInfoUser')}>
                    <FontAwesome5 name="user-edit" size={24} color="black" />
                    <Text style={styles.textButton}>EDITAR PERFIL</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={handleLogoutPress}
                    disabled={isLogginOut}
                >
                    <MaterialIcons name="logout" size={30} color={colors.redColor} />
                    <Text style={styles.textButton}>SAIR</Text>
                </TouchableOpacity>
                <DefaultModal
                    showModal={showModal}
                    setShowModal={setShowModal}
                    handleConfirm={handleLogout}
                    title="Confirmar Saída"
                    message="Tem certeza que deseja sair da sua conta?"
                />
            </View>
        </SafeAreaView>
    );
}
