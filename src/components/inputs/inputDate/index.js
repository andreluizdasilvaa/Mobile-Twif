import { View, Text, Pressable } from 'react-native';
import { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import Ionicons from '@expo/vector-icons/Ionicons';

import styles from './styles.js';
import colors from '../../../constants/colors.js';

export default function InputDatePicker({ iconName, placeholder, value, onChange }) {
    const [showPicker, setShowPicker] = useState(false);
    // Garante que displayDate é sempre string
    const displayDate = value || placeholder;

    const handleChange = (event, selectedDate) => {
        setShowPicker(false);
        if (selectedDate && onChange) {
            // Retorna a data formatada como string para o pai
            const d = new Date(selectedDate);
            const year = d.getFullYear();
            const month = String(d.getMonth() + 1).padStart(2, '0');
            const day = String(d.getDate()).padStart(2, '0');
            onChange(`${year}-${month}-${day}`);
        }
    };

    return (
        <View style={styles.containerBtn}>
            <Ionicons name={iconName} size={24} color={colors.blackColor} style={styles.icon} />
            <Pressable style={styles.input} onPress={() => setShowPicker(true)}>
                <Text style={styles.buttonText}>{displayDate}</Text>
            </Pressable>
            {showPicker && (
                <DateTimePicker
                    value={value ? new Date(value) : new Date()}
                    mode="date"
                    display="spinner"
                    onChange={handleChange}
                    themeVariant="light"
                    textColor={colors.blackColor}
                />
            )}
        </View>
    );
}
