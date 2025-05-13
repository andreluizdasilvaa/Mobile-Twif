import { View, ActivityIndicator } from 'react-native';

export default function ScreenLoader({ size = 24, color = "#fff" }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator size={size} color={color} />
        </View>
    );
}