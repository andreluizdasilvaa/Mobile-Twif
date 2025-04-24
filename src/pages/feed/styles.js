import { StyleSheet } from 'react-native';
import { Platform } from 'react-native';

const styles = StyleSheet.create({
    containerPosts: {
        flex: 1,
        width: '100%',
        maxHeight: Platform.OS === 'web' ? '100vh' : null,
    },
});

export default styles;
