import { View, Text, TextInput  } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import styles from './styles'
import colors from '../../../constants/colors';

export default function InputTextIcon({ iconName, placeholder, keyboardType, maxLength, onChangeText, secureTextEntry }) {
    return (
        <View style={styles.containerBtn}>
            <Ionicons name={iconName} size={24} color={colors.blackColor} style={styles.icon} />
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                keyboardType={keyboardType}
                maxLength={maxLength}
                minLength={8}
                onChangeText={onChangeText}
                secureTextEntry={secureTextEntry}
            />
        </View>
    );
}

