import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { Image } from 'expo-image';
import { SafeAreaView } from 'react-native-safe-area-context';

import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';

import appConfig from '../../config/appConfig';
import { useUserStore } from '../../stores/userStore';
import { useDrawerStore } from '../../stores/DrawerStore';
import colors from '../../constants/colors';
import styles from './styles';

import { deleteItem } from '../../services/storageService';

export default function ContentDrawerBurguer({ navigation }) {

    const { userNick, name, isAdmin, clearUserData } = useUserStore();
    const { close } = useDrawerStore();
    const [isLogginOut, setIsLogginOut] = useState(false)
    const [showModal, setShowModal] = useState(false);

    async function handleLogout() {
        if(isLogginOut) return; // Evita múltiplos cliques

        setIsLogginOut(true);
        try {
            await deleteItem('your-session-token');
            await clearUserData();
            await close();
            navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }]
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

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Image source={`${appConfig.URL_API}/image/${userNick}`} style={styles.image} />
                <View>
                    <Text style={styles.userName}>{name}</Text>
                    <Text style={styles.userNick}>@{userNick}</Text>
                </View>
            </View>

            <View style={styles.containerButtons}>
                {isAdmin && (
                    <TouchableOpacity style={styles.containerButtonsRelatorio}>
                        <View style={styles.shadowView} />
                        <Ionicons name="newspaper-outline" size={30} color="black" />
                        <Text style={styles.textButton}>RELATÓRIOS</Text>
                    </TouchableOpacity>
                )}

                <TouchableOpacity style={styles.buttonContainer}>
                    <Entypo name="light-bulb" size={30} color="black" />
                    <Text style={styles.textButton}>ATIVAR MODO ESCURO</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.buttonContainer}
                    onPress={handleLogoutPress}
                    disabled={isLogginOut}
                >
                    <MaterialIcons name="logout" size={30} color={colors.redColor} />
                    <Text style={styles.textButton}>SAIR</Text>
                </TouchableOpacity>
                
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={showModal}
                    onRequestClose={() => setShowModal(false)}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Confirmar Saída</Text>
                            <Text style={styles.modalText}>
                                Tem certeza que deseja sair da sua conta?
                            </Text>

                            <View style={styles.modalButtons}>
                                <TouchableOpacity 
                                    style={[styles.modalButton, styles.cancelButton]}
                                    onPress={() => setShowModal(false)}
                                >
                                    <Text style={styles.modalButtonText}>Cancelar</Text>
                                </TouchableOpacity>

                                <TouchableOpacity 
                                    style={[styles.modalButton, styles.confirmButton]}
                                    onPress={() => {
                                        setShowModal(false);
                                        handleLogout();
                                    }}
                                >
                                    <Text style={[styles.modalButtonText, styles.confirmButtonText]}>
                                        Confirmar
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        </SafeAreaView>
    );
}
