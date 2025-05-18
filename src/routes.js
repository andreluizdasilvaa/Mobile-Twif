import React, { useEffect, useCallback, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './pages/login';
import Register from './pages/register';
import Perfil from './pages/perfil';
import Comment from './pages/comment';
import Tabs from './components/Tabs';
import AuthLoading from './pages/authLoading';
import { notifications } from './services/userService';
import { useNotifyStore } from './stores/NotifyStore';
import { getItem } from './services/storageService';
import appConfig from './config/appConfig';

const Stack = createStackNavigator();

export default function Routes() {
    const { setNotifications } = useNotifyStore();

    const fetchNotifications = useCallback(async () => {
        const token = await getItem(appConfig.TOKEN_KEY);
        if (!token) return;

        const data = await notifications();
        setNotifications(data);
        
    }, [setNotifications]);

    useEffect(() => {
        fetchNotifications(); 
        const intervalId = setInterval(fetchNotifications, 5000); 
        return () => clearInterval(intervalId);
    }, [fetchNotifications]);

    return (
        <>
            <Stack.Navigator initialRouteName="authLoading">
                <Stack.Screen 
                    name="Login" 
                    component={Login} 
                    options={{ headerShown: false }} 
                />
                <Stack.Screen 
                    name="Perfil" 
                    component={Perfil} 
                    options={{ headerShown: false }} 
                />
                <Stack.Screen 
                    name="Register"
                    component={Register}
                    options={{ headerShown: false }}
                />
                <Stack.Screen 
                    name="Home" 
                    component={Tabs} 
                    options={{ headerShown: false }} 
                />
                <Stack.Screen 
                    name="authLoading"
                    component={AuthLoading}
                    options={{ headerShown: false }}
                />
                <Stack.Screen 
                    name='Comment'
                    component={Comment}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </>
    );
}
