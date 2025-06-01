import React from 'react';
import { View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Ionicons from '@expo/vector-icons/Ionicons';

import styles from './styles';
import colors from '../../../constants/colors';

const cursos = [
    { label: 'Selecione seu curso', value: '', enabled: false },
    { label: 'Técnico em T.I.', value: 'Tec. em T.I.' },
    { label: 'Técnico em ADM', value: 'Tec. em ADM' },
    { label: 'Técnico em Edificações', value: 'Tec. em Edificações' },
    { label: 'Técnico em Meio Ambiente', value: 'Tec. em Meio Ambiente' },
    { label: 'Engenharia Civil', value: 'Engenharia Civil' },
    { label: 'Análise e Desenvolvimento de Sistemas', value: 'ADS' },
    { label: 'Física', value: 'Física' },
    { label: 'Química', value: 'Química' },
    { label: 'Processos Gerenciais', value: 'Processos Gerenciais' },
    { label: 'Matemática', value: 'Matemática' },
];

export default function InputPicker({ iconName, value, onValueChange }) {
    return (
        <View style={styles.containerBtn}>
            <Ionicons name={iconName} size={24} color={colors.blackColor} style={styles.icon} />
            <Picker selectedValue={value} onValueChange={onValueChange} style={styles.Picker}>
                {cursos.map((curso, idx) => (
                    <Picker.Item key={idx} {...curso} />
                ))}
            </Picker>
        </View>
    );
}
