import { View, Text, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import Ionicons from '@expo/vector-icons/Ionicons';
import styles from './styles';
import colors from '../../constants/colors';
import Notification from '../../components/notification';
import { useNotifyStore } from '../../stores/NotifyStore';

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
                    renderItem={({ item }) => <Notification item={item} />}
                    keyExtractor={item => item.id.toString()}
                />
            )}
            <StatusBar style="dark" backgroundColor={colors.whiteColor} />
        </SafeAreaView>
    );
}
