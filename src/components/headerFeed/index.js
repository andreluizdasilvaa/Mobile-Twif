import { memo } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, TouchableOpacity, Pressable } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import { Image } from 'expo-image';

import { useUserStore } from '../../stores/userStore';
import Logo from '../Logo';
import styles from './styles';
import appConfig from '../../config/appConfig';
import { useDrawerStore } from '../../stores/DrawerStore';

function HeaderFeed() {
    const { userNick } = useUserStore()
    const open = useDrawerStore((state) => state.open);

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <View style={styles.content}>
                    <Pressable onPress={open}>
                        <Entypo name="menu" size={30} color="black" />
                    </Pressable>
                    

                    <TouchableOpacity>
                        <Logo width={130} height={70} />
                    </TouchableOpacity>

                    <Image
                        source={`${appConfig.URL_API}/image/${userNick}`}
                        style={styles.image}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}

const headerFeed = memo(HeaderFeed)
export default headerFeed;