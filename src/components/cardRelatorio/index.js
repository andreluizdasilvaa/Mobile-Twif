import React from 'react';
import { View, Text } from 'react-native';
import { 
    MaterialIcons, 
    MaterialCommunityIcons,
    AntDesign,
    Feather
} from '@expo/vector-icons';
import styles from './styles';

export default function CardRelatorio({ icon, title, info, wholeNumber = false}) {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text>
                    {title}
                </Text>
                {icon}
            </View>

            <View style={styles.body}>
                <Text style={styles.textInfo}>
                    {
                    wholeNumber ? (
                        Number(info)
                    ) : (
                        Number(info).toFixed(2)
                    )}
                </Text>
            </View>
        </View>
    )
}