import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './pages/login/index';
import Register from './pages/register/index';
import Tabs from './components/Tabs';

const Stack = createStackNavigator();

export default function Routes() {
    return (
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
            <Stack.Screen name="Home" component={Tabs} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}
