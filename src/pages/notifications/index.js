import { View, Text, FlatList, SafeAreaView } from "react-native";

import Ionicons from '@expo/vector-icons/Ionicons';
import styles from './styles';
import Notification from "../../components/notification";
import { useNotifyStore } from "../../stores/NotifyStore";

export default function Notifications() {
    const { notifications: storedNotifications } = useNotifyStore();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <Ionicons name="notifications-outline" size={26} color="black" />
                    <Text style={styles.title}>Notificações</Text>
                </View>
            </View>

            {storedNotifications.length === 0 ? (
                <Text style={styles.emptyText}>Nenhuma notificação disponível</Text>
            ) : (
                <FlatList 
                    data={storedNotifications}
                    renderItem={({ item }) => (
                        <Notification item={item} />
                    )}
                    keyExtractor={(item) => item.id.toString()}
                />
            )}
        </SafeAreaView>
    )
}