import { memo } from 'react';
import { View, TouchableOpacity, Pressable } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import { Image } from 'expo-image';

import { useUserStore } from '../../stores/userStore';
import Logo from '../Logo';
import styles from './styles';
import appConfig from '../../config/appConfig';

function HeaderFeed({ navigation, openDrawer, onLogoPress }) {
    const { userNick } = useUserStore();

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Pressable onPress={openDrawer}>
                    <Entypo name="menu" size={30} color="black" />
                </Pressable>
                <Pressable onPress={onLogoPress}>
                    <Logo width={130} height={70} />
                </Pressable>
                <Pressable
                    onPress={() =>
                        navigation.navigate('Perfil', {
                            userNick: userNick,
                        })
                    }
                >
                    <Image source={`${appConfig.URL_API}/image/${userNick}`} style={styles.image} />
                </Pressable>
            </View>
        </View>
    );
}

const headerFeed = memo(HeaderFeed);
export default headerFeed;
