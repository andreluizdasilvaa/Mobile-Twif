import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Feed from '../pages/feed';
import Notifications from '../pages/notifications';
import Ionicons from '@expo/vector-icons/Ionicons';
import colors from '../constants/colors';
import { useNotifyStore } from '../stores/NotifyStore';

const Tab = createBottomTabNavigator();

export default function Tabs() {
    const notifications = useNotifyStore(state => state.notifications);
    const unreadCount = notifications.filter(notification => !notification.isViewed).length;

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ color, size }) => {
                    let iconName;

                    if (route.name === 'Feed') {
                        iconName = 'home-sharp';
                    } else if (route.name === 'Notificações') {
                        iconName = 'notifications';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: colors.primaryColor,
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen name="Feed" component={Feed} />
            <Tab.Screen
                name="Notificações"
                component={Notifications}
                options={{
                    tabBarBadge: unreadCount || null,
                    tabBarBadgeStyle: { backgroundColor: colors.primaryColor },
                }}
            />
        </Tab.Navigator>
    );
}
