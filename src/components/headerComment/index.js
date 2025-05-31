import react from 'react';
import { Pressable, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './styles';
import { StatusBar } from 'expo-status-bar';
import Logo from '../Logo';
import colors from '../../constants/colors';
import { navigationRef } from '../../services/navigationService';

export default function HeaderComment({ navigation, onLogoPress, hasInteraction }) {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Pressable
                    onPress={() => {
                        if (hasInteraction) {
                                navigation.reset({
                                index: 0,
                                routes: [{ name: 'Home', params: { shouldRefreshFeed: true } }],
                            });
                        } else {
                            navigationRef.current?.goBack();
                        }
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
