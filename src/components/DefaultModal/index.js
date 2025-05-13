import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';

export default function DefaultModal({ showModal, setShowModal, handleConfirm, title, message }) {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={showModal}
            onRequestClose={() => setShowModal(false)}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>{title || 'Confirmar Saída'}</Text>
                    <Text style={styles.modalText}>
                        {message || 'Tem certeza que deseja sair da sua conta?'}
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
                                handleConfirm();
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
    );
}
