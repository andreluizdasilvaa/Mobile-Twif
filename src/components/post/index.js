import { memo, useState } from 'react';
import { View, Text, Pressable, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';

import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import colors from '../../constants/colors';
import styles from './styles';

import { useUserStore } from '../../stores/userStore';
import { usePostStore } from '../../stores/postStore';
import appConfig from '../../config/appConfig';
import { likePost } from '../../services/postService';
import { deletePost as deletePostService } from '../../services/postService';
import DefaultModal from '../DefaultModal';
import Toast from 'react-native-toast-message';

function PostComponent({
    navigation,
    postId,
    userNick,
    nameUser,
    description,
    quantLike,
    quantComment,
    likedByCurrentUser,
    isUserProfile = false,
    onPostDelete, // prop para notificar o componente pai sobre a deleção
}) {
    const [liked, setLiked] = useState(likedByCurrentUser);
    const [quantLikes, setQuantLikes] = useState(quantLike);
    const [showModal, setShowModal] = useState(false);
    const { userNick: currentUserNick } = useUserStore();
    const { removePost } = usePostStore();

    const handleLike = async () => {
        if (liked) {
            setQuantLikes(quantLikes - 1);
        } else {
            setQuantLikes(quantLikes + 1);
        }
        await likePost(postId);
        setLiked(!liked);
    };

    async function deletePost() {
        try {
            const data = await deletePostService(postId);
            Toast.show({
                type: 'success',
                text1: 'Sucesso',
                text2: 'Post deletado com sucesso!',
                position: 'bottom',
            });

            // Remover o post da store global
            removePost(postId);

            // Notifica o componente pai que o post foi deletado (para atualizações locais)
            if (onPostDelete) {
                onPostDelete(postId);
            }
        } catch (error) {
            console.log(error);
            Toast.show({
                type: 'error',
                text1: 'Erro ao deletar post',
                text2: error.message || 'Fale com o suporte!',
                position: 'top',
            });
        }
    }

    function handleModal() {
        setShowModal(true);
    }

    return (
        <View style={styles.container}>
            <Pressable
                style={styles.header}
                onPress={() =>
                    navigation.navigate('Perfil', {
                        userNick: userNick,
                    })
                }
            >
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

            <DefaultModal
                showModal={showModal}
                setShowModal={setShowModal}
                handleConfirm={deletePost}
            />

            <View style={styles.footer}>
                {isUserProfile == true && currentUserNick === userNick ? (
                    <TouchableOpacity style={styles.btnDeletePostFooter} onPress={handleModal}>
                        <Text style={styles.textBtnDelete}>Deletar</Text>
                    </TouchableOpacity>
                ) : (
                    <View />
                )}

                <View style={styles.btnsFooter}>
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
        </View>
    );
}

const Post = memo(PostComponent);
export default Post;
