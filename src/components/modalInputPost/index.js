import { View, Text, TouchableOpacity } from 'react-native';
import Feather from '@expo/vector-icons/Feather';

import styles from './styles';

export default function ModalInputPost() {
    return (
        <TouchableOpacity style={styles.container}>
            <Feather name="edit" size={28} color="black" />
        </TouchableOpacity>
    );
}
