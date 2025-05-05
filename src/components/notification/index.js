import React from "react"; 
import { View, Text, StyleSheet } from "react-native";
import { Image } from 'expo-image';
import AntDesign from '@expo/vector-icons/AntDesign';
import styles from "./styles";
import appConfig from "../../config/appConfig";

export default function Notification({ item }) {
    // Verificação de segurança para dados nulos ou indefinidos
    if (!item || !item.triggeredBy || !item.triggeredBy.usernick) {
        return (
            <View style={styles.container}>
                <Text>Carregando notificação...</Text>
            </View>
        );
    }
    
    // Formatação da data
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR');
    };
    
    // Definir a mensagem com base na ação
    const getActionMessage = () => {
        switch(item.action) {
            case 'comment':
                return 'comentou em sua publicação';
            case 'like':
                return 'curtiu sua publicação';
            case 'postDeleteByAdm':
                return 'sua publicação foi excluída por um administrador';
            default:
                return 'interagiu com você';
        }
    };
    
    return (
        <View style={styles.container}>

            <View style={styles.content}>
                <Image 
                    source={{ uri: `${appConfig.URL_API}/image/${item.triggeredBy.usernick}` }}
                    style={styles.image}
                    contentFit="cover"
                />
                
                <View style={styles.infoContainer}>
                    <View style={styles.userNames}>
                        <Text style={styles.userName}>
                            {item.triggeredBy.nome}
                        </Text>
                        <Text style={styles.userNick}>
                            @{item.triggeredBy.usernick}
                        </Text>
                    </View>
                    
                    <Text style={styles.actionText}>
                        {getActionMessage()}
                    </Text>
                    {item.commentPreview && item.action === 'comment' && (
                        <Text style={styles.previewText} numberOfLines={1}>
                            "{item.commentPreview}"
                        </Text>
                    )}
                    <Text style={styles.timeText}>
                        {formatDate(item.createdAt)}
                    </Text>
                </View>
            </View>
            
            <AntDesign name="delete" size={24} color="black" />
        </View>
    );
}
