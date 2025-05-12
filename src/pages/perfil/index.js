import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useRoute } from '@react-navigation/native';
import styles from './styles';
import colors from '../../constants/colors';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { navigationRef } from '../../services/navigationService';
import appConfig from '../../config/appConfig';

export default function Perfil() {
    const route = useRoute();
    const { userNick } = route.params;

    useEffect(() => {
        // Aqui você pode usar o postId para buscar os dados do perfil, etc.
        console.log('ID do post:', userNick);
        alert(userNick)
    }, [userNick]);
    return (
        <SafeAreaView>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() =>
                        navigationRef.current?.goBack()
                    }
                >
                    <MaterialIcons name="arrow-back" size={30} color={colors.primaryColor} />
                </TouchableOpacity>
            </View>

            <View style={styles.containerInfo}>
                <Image
                    source={{
                        uri: `${appConfig.URL_API}/image/${userNick}`,
                    }}
                    style={styles.image}
                />
                <View style={styles.contentInfo}>
                    <Text style={[styles.textInfo, styles.nameUserText]}>Menino da silva</Text>
                    <Text style={styles.textInfo}>@{userNick}</Text>
                    <Text style={[styles.textInfo, styles.descUserText]}>
                        Um menino simples, estudando bastante
                    </Text>

                    <View style={styles.containerIconInfo}>
                        <View style={styles.infoIcon}>
                            <MaterialIcons name="date-range" size={24} color="black" />
                            <Text style={styles.infoIconText}>11/06/2002</Text>
                        </View>
                        <View style={styles.infoIcon}>
                            <MaterialIcons name="star-border" size={24} color="black" />
                            <Text style={styles.infoIconText}>Engen. Civil</Text>
                        </View>
                    </View>
                </View>
            </View>

            <View></View>

            <StatusBar style="light" backgroundColor={colors.backgroundDarkColor} />
        </SafeAreaView>
    );
}
