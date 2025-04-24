import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { Image } from 'expo-image';

import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import styles from './styles';

import profilePictures from '../../config/profilePictures';

export default function Post({ picture, nameUser, description, quantLike, quantComment }) {
    const [liked, setLiked] = useState(false);
    const [quantLikes, setQuantLikes] = useState(quantLike);

    const handleLike = () => {
        if (liked) {
            setQuantLikes(quantLikes - 1);
        } else {
            setQuantLikes(quantLikes + 1);
        }
        setLiked(!liked);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={profilePictures[picture] || profilePictures['defaultphoto.png']}
                    style={styles.imageUser}
                />
                <Text style={styles.nameUser}>{nameUser}</Text>
            </View>

            <View style={styles.content}>
                <Text>{description}</Text>
            </View>

            <View style={styles.footer}>
                <Pressable style={styles.containerIcon} onPress={handleLike}>
                    <Text>{quantLikes}</Text>
                    <AntDesign
                        name={liked ? 'heart' : 'hearto'}
                        size={18}
                        color={liked ? 'green' : 'black'}
                    />
                </Pressable>

                <Pressable style={styles.containerIcon}>
                    <Text>{quantComment}</Text>
                    <Feather name="message-circle" size={18} color="black" />
                </Pressable>
            </View>
        </View>
    );
}
