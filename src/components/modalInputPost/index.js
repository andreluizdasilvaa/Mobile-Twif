import { TouchableOpacity } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { useSheetFormStore } from '../../stores/SheetFormStore';

import styles from './styles';

export default function ModalInputPost() {
    const { open, isVisible } = useSheetFormStore();

    return (
        !isVisible ? (
        <TouchableOpacity style={styles.container} onPress={open}>
            <Feather name="edit" size={28} color="black" />
        </TouchableOpacity>
    ) : null
    );
}