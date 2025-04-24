import { View, Text, Pressable } from 'react-native';
import Feather from '@expo/vector-icons/Feather';

import styles from './styles';

export default function ModalInputPost() {
    return (
        <Pressable style={styles.container}>
            <Feather name="edit" size={28} color="black" />
        </Pressable>
    );
}
