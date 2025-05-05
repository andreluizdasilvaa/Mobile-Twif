import { View, Text, FlatList, SafeAreaView } from "react-native";

import Ionicons from '@expo/vector-icons/Ionicons';
import styles from './styles';
import { useEffect, useState } from "react";
import Notification from "../../components/notification";
import { notifications } from "../../services/userService";

export default function Notifications() {
    const [notific, setNotific] = useState([]);

    const fetchNotifications = async () => {
        try {
            const data = await notifications();
            setNotific(data);
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchNotifications();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <Ionicons name="notifications-outline" size={26} color="black" />
                    <Text style={styles.title}>Notificações</Text>
                </View>
            </View>

            <FlatList 
                data={notific}
                renderItem={({ item }) => (
                    <Notification item={item} />
                )}
                keyExtractor={(item) => item.id.toString()}
            />
        </SafeAreaView>
    )
}