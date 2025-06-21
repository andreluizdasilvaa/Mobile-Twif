import react from 'react';
import { View, Text, TextInput } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import styles from './styles';

export default function InputBio({ iconName, placeholder, value, onChangeText, maxLength }) {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <AntDesign name="hearto" size={24} color="black" />
                <Text>Bio</Text>
            </View>
            <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                maxLength={maxLength}
            />
        </View>
    );
}
