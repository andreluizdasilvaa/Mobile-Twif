import react from "react";
import { View, Text } from 'react-native'
import { useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ChooseProfilePicture() {
    const route = useRoute();
    const { name, nickname, email, password, birthDate, course } = route.params;
    return (
        <SafeAreaView>
            <Text>{name} - {nickname} - {email} - {password} - {birthDate} - {course}</Text>
        </SafeAreaView>
    )
}