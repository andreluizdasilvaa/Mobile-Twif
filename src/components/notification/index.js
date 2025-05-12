import React, { useCallback, useState } from "react";
import { View, Text, Pressable } from "react-native";
import { Image } from 'expo-image';
import AntDesign from '@expo/vector-icons/AntDesign';
import styles from "./styles";
import appConfig from "../../config/appConfig";
import colors from "../../constants/colors";
import { markNotification as markNotificationService } from "../../services/userService";
import { useNotifyStore } from "../../stores/NotifyStore";

function Notification({ item }) {
    const [isViewed, setIsViewed] = useState(item.isViewed);
    const [showMarkButton, setShowMarkButton] = useState(!item.isViewed);
    const markNotificationAsRead = useNotifyStore(state => state.markNotificationAsRead);

    console.log('renderizei')
    // Verificação para array vazio
    if (item.length === 0) {
        return (
            <View style={styles.container}>
                <Text style={styles.emptyMessage}>Você não tem notificações no momento</Text>
            </View>
        );
    };

    // Marca notificação como vista
    const markNotification = useCallback(async (notifyId) => {
        try {
            await markNotificationService(notifyId);
            setIsViewed(true);
            setShowMarkButton(false);
            markNotificationAsRead(notifyId);
        } catch (error) {
            console.error('Erro ao marcar notificação:', error);
        }
    }, [markNotificationAsRead]);
    
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
        <View style={[styles.container, { 
            backgroundColor: !isViewed ? `${colors.primaryColor}1D` : colors.whiteColor
        }]}>

            {!isViewed ? (
                <View style={styles.container_dot}>
                    <View style={styles.dotNotify} />
                </View>
            ) : null}

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

                {showMarkButton && (
                    <Pressable onPress={() => markNotification(item.id)}>
                        <AntDesign name="eyeo" size={30} color="black" />
                    </Pressable>
                )}
                
            </View>
        </View>
    );
}

export default React.memo(Notification, (prevProps, nextProps) => {
    return JSON.stringify(prevProps.item) === JSON.stringify(nextProps.item);
});