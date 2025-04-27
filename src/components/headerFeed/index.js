import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, TouchableOpacity } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import { Image } from 'expo-image';

import { searchUserInfo } from '../../services/userService';
import Logo from '../Logo';
import styles from './styles';
import appConfig from '../../config/appConfig';

export default function HeaderFeed() {

    const [userNick, setUserNick] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await searchUserInfo();
                setUserNick(data);
            } catch (error) {
                console.error('Erro ao carregar os dados do usuário:', error);
            }
        };
        
        fetchData(); 
    }, []);

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <View style={styles.content}>
                    <Entypo name="menu" size={30} color="black" />

                    <TouchableOpacity>
                        <Logo width={130} height={70} />
                    </TouchableOpacity>

                    <Image
                        source={userNick?.usernick ? `${appConfig.URL_API}/image/${userNick.usernick}` : null}
                        style={styles.image}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}
