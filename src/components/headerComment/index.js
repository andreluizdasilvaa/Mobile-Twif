import react from 'react';
import { Pressable, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './styles';
import { StatusBar } from 'expo-status-bar';
import Logo from '../Logo';
import colors from '../../constants/colors';

export default function HeaderComment({ navigation, onLogoPress }) {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Pressable
                    onPress={() => {
                        navigation.goBack();
                    }}
                >
                    <MaterialIcons name="arrow-back" size={30} color={colors.primaryColor} />
                </Pressable>

                <Pressable onPress={onLogoPress}>
                    <Logo width={130} height={70} />
                </Pressable>
            </View>
            <StatusBar style="dark" backgroundColor={colors.whiteColor} />
        </SafeAreaView>
    );
}
