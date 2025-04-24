import { View, SafeAreaView } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import { Image } from 'expo-image';

import Logo from '../Logo';
import styles from './styles';

export default function HeaderFeed() {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Entypo name="menu" size={30} color="black" />

                <Logo width={130} height={70} />

                <Image 
                    source={'https://cdn-icons-png.flaticon.com/512/1503/1503151.png'}
                    style={styles.image}
                />
            </View>
        </View>
    );
}
