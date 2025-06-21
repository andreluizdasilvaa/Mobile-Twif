import { memo, useState } from 'react';
import { View, Text, Pressable, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';

import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import colors from '../../constants/colors';
import styles from './styles';

import { useUserStore } from '../../stores/userStore';
import appConfig from '../../config/appConfig';
import {
    likePost,
    deletePost as deletePostService,
    deleteComment,
} from '../../services/postService';
import DefaultModal from '../DefaultModal';
import Toast from 'react-native-toast-message';

function PostComponent({
    navigation,
    postId,
    commentId,
    userNick,
    nameUser,
    description,
    quantLike,
    quantComment,
    likedByCurrentUser,
    profilePicture,
    isUserProfile = false,
    onPostDelete, // prop para notificar o componente pai sobre a deleção
    isComment = false,
    isMainPost = false, // Indica se é o post principal na página de comentários
    style = {},
}) {
    const [liked, setLiked] = useState(likedByCurrentUser);
    const [quantLikes, setQuantLikes] = useState(quantLike);
    const [showModal, setShowModal] = useState(false);
    const [isLikeLoading, setIsLikeLoading] = useState(false); // Novo estado para controlar o carregamento da curtida
    const { userNick: currentUserNick, isAdmin } = useUserStore();

    const handleLike = async () => {
        // Se já estiver processando um like, não permitir outro clique
        if (isLikeLoading) return;

        try {
            setIsLikeLoading(true);

            // Armazena os valores atuais antes da chamada à API
            const willBeLiked = !liked;
            const newQuantLikes = willBeLiked ? quantLikes + 1 : quantLikes - 1;

            // Chamada para o backend
            await likePost(postId);

            // Atualiza o estado somente após sucesso da operação
            setLiked(willBeLiked);
            setQuantLikes(newQuantLikes);
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Erro ao curtir',
                text2: 'Não foi possível atualizar a curtida',
                position: 'bottom',
            });
        } finally {
            setIsLikeLoading(false);
        }
    };
    async function handleDeletePost() {
        try {
            if (isComment === false) {
                await deletePostService(postId);
                Toast.show({
                    type: 'success',
                    text1: 'Sucesso',
                    text2: 'Post deletado com sucesso!',
                    position: 'bottom',
                });

                // Notifica o componente pai que o post foi deletado (para atualizações locais)
                if (onPostDelete) {
                    onPostDelete(postId);
                }
            } else {
                await deleteComment(postId, commentId);

                Toast.show({
                    type: 'success',
                    text1: 'Sucesso',
                    text2: 'Comentario deletado com sucesso!',
                    position: 'bottom',
                });

                // Notifica o componente pai que o comentário foi deletado (para atualizações locais)
                if (onPostDelete) {
                    onPostDelete(commentId);
                }
            }
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Erro ao deletar',
                text2: error.message || 'Fale com o suporte!',
                position: 'top',
            });
        }
    }

    function handleModal() {
        setShowModal(true);
    }

    // Função para truncar o nome do usuário
    function getTruncatedName(name) {
        if (!name) return '';
        return name.length > 15 ? name.slice(0, 15) + '...' : name;
    }

    return (
        <View style={[styles.container, style]}>
            <Pressable
                style={styles.header}
                onPress={() =>
                    navigation.navigate('Perfil', {
                        userNick: userNick,
                    })
                }
            >
                <Image
                    source={{ uri: `${appConfig.URL_API}/image/default/${profilePicture}` }}
                    style={styles.imageUser}
                    contentFit="cover"
                    transition={100}
                />
                <View>
                    <Text style={styles.nameUser}>{getTruncatedName(nameUser)}</Text>
                    <Text style={styles.userNick}>@{userNick}</Text>
                </View>
            </Pressable>
            <View style={styles.content}>
                <Text>{description}</Text>
            </View>
            <DefaultModal
                title={
                    isComment ? 'Deletar comentário' : isUserProfile ? 'Deletar post' : 'Deletar'
                }
                message={
                    isComment
                        ? 'Tem certeza que quer deletar esse comentario?'
                        : 'Tem certeza que quer deletar esse post?'
                }
                showModal={showModal}
                setShowModal={setShowModal}
                handleConfirm={handleDeletePost}
            />
            <View style={styles.footer}>
                {/* Mostrar botão de deletar apenas se:
                   - Estiver na tela de perfil OU for um comentário (mas não o post principal)
                   - O post pertencer ao usuário atual OU o usuário for admin
                */}
                {(isUserProfile === true || (isComment === true && !isMainPost)) &&
                (currentUserNick === userNick || isAdmin === true) ? (
                    <TouchableOpacity style={styles.btnDeletePostFooter} onPress={handleModal}>
                        <Text style={styles.textBtnDelete}>
                            {isComment ? 'Deletar comentário' : 'Deletar post'}
                        </Text>
                    </TouchableOpacity>
                ) : (
                    <View />
                )}
                {isComment === false ? (
                    <View style={styles.btnsFooter}>
                        <Pressable
                            style={[styles.containerIcon, isLikeLoading && { opacity: 0.7 }]}
                            onPress={handleLike}
                            disabled={isLikeLoading}
                        >
                            <Text>{quantLikes}</Text>
                            <AntDesign
                                name={liked ? 'heart' : 'hearto'}
                                size={18}
                                color={liked ? colors.primaryColor : colors.blackColor}
                            />
                        </Pressable>
                        <Pressable
                            style={styles.containerIcon}
                            onPress={() =>
                                navigation.navigate('Comment', {
                                    userNick,
                                    nameUser,
                                    description,
                                    postId,
                                    profilePicture,
                                })
                            }
                        >
                            <Text>{quantComment}</Text>
                            <Feather name="message-circle" size={18} color="black" />
                        </Pressable>
                    </View>
                ) : null}
            </View>
        </View>
    );
}

const Post = memo(PostComponent);
export default Post;
