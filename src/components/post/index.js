import { memo, useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { Image } from 'expo-image';

import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import colors from '../../constants/colors';
import styles from './styles';

import appConfig from '../../config/appConfig';
import { likePost } from '../../services/postService';


function PostComponent({ navigation, postId, userNick, nameUser, description, quantLike, quantComment, likedByCurrentUser }) {
    const [liked, setLiked] = useState(likedByCurrentUser);
    const [quantLikes, setQuantLikes] = useState(quantLike);

    const handleLike = async () => {
        if (liked) {
            setQuantLikes(quantLikes - 1);
        } else {
            setQuantLikes(quantLikes + 1);
        }
        await likePost(postId);
        setLiked(!liked); 
    };

    return (
        <View style={styles.container}>
            <Pressable style={styles.header} onPress={() => navigation.navigate('Perfil', {
                userNick: userNick
            })}>
                <Image
                    source={{ uri: `${appConfig.URL_API}/image/${userNick}` }}
                    style={styles.imageUser}
                    contentFit="cover"
                    transition={100}
                />
                <View>
                    <Text numberOfLines={1} ellipsizeMode="tail" style={styles.nameUser}>
                        {nameUser}
                    </Text>
                    <Text numberOfLines={1} ellipsizeMode="tail" style={styles.userNick}>
                        @{userNick}
                    </Text>
                </View>
            </Pressable>

            <View style={styles.content}>
                <Text>{description}</Text>
            </View>

            <View style={styles.footer}>
                <Pressable style={styles.containerIcon} onPress={handleLike}>
                    <Text>{quantLikes}</Text>
                    <AntDesign
                        name={liked ? 'heart' : 'hearto'}
                        size={18}
                        color={liked ? colors.primaryColor : colors.blackColor}
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

const Post = memo(PostComponent);
export default Post;
