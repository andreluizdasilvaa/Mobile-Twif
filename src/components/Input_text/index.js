import { View, Text, TextInput  } from 'react-native';

import styles from './styles'

export default function InputText({ placeholder, keyboardType, maxLength }) {
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                keyboardType={keyboardType}
                maxLength={maxLength}
            />
        </View>
    );
}

