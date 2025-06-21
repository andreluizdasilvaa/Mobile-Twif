// InputText.js
import { View, TextInput } from 'react-native';
import styles from './styles';

export default function InputText({ placeholder, keyboardType, maxLength, value, onChangeText, secureTextEntry }) {
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                keyboardType={keyboardType}
                maxLength={maxLength}
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={secureTextEntry}
            />
        </View>
    );
}
