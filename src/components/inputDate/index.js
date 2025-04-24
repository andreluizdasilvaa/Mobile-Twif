import { View, Text, Pressable } from 'react-native';
import { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import Ionicons from '@expo/vector-icons/Ionicons';

import styles from './styles.js';

export default function InputDatePicker({ iconName, placeholder }) {
    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);

    const onChange = (event, selectedDate) => {
        setShowPicker(false);
        if (selectedDate) {
            setDate(selectedDate);
            const formattedDate = selectedDate.toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
            });
            setSelectedDate(formattedDate);
        }
    };

    return (
        <View style={styles.containerBtn}>
            <Ionicons name={iconName} size={24} color="#000000" style={styles.icon} />
            <Pressable style={styles.input} onPress={() => setShowPicker(true)}>
                <Text style={styles.buttonText}>{selectedDate || placeholder}</Text>
            </Pressable>
            {showPicker && (
                <DateTimePicker
                    value={date}
                    mode="date"
                    display="spinner"
                    onChange={onChange}
                    themeVariant='light'
                    textColor="#000"
                />
            )}
        </View>
    );
}
