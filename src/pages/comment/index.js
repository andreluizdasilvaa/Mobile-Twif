import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, FlatList } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { getCommentById } from '../../services/postService';
import HeaderComment from '../../components/headerComment';
import Post from '../../components/post';
import SkeletonPost from '../../components/SkeletonPost';
import styles from './styles';

export default function Comment({ navigation }) {
    const route = useRoute();
    const { userNick, postId, nameUser, description } = route.params;
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);

    // Função para remover um comentário da lista quando ele é deletado
    const handleCommentDelete = commentId => {
        setComments(prevComments => prevComments.filter(comment => comment.id !== commentId));
    };

    useEffect(() => {
        async function getComments() {
            try {
                setLoading(true);
                const data = await getCommentById(postId);
                // Garantir que comments sempre será um array, mesmo se data for null ou undefined
                setComments(data || []);
            } catch (error) {
                console.error('Erro ao carregar comentários:', error);
                // Definir como array vazio em caso de erro
                setComments([]);
            } finally {
                setLoading(false);
            }
        }

        getComments();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <HeaderComment navigation={navigation} />
            <Post
                userNick={userNick}
                nameUser={nameUser}
                description={description}
                postId={postId}
                navigation={navigation}
                isComment={true}
                isMainPost={true} // Indica que este é o post principal, não deve mostrar o botão de deletar
            />
            <View style={styles.ContainerTextComment}>
                <Text style={styles.textComment}>Comentarios:</Text>
            </View>
            <FlatList
                style={styles.containerComments}
                data={loading ? [1, 2, 3] : comments}
                renderItem={({ item }) =>
                    loading ? (
                        <SkeletonPost />
                    ) : (
                        <Post
                            style={styles.commentPost}
                            userNick={item.user.usernick}
                            nameUser={item.user.nome}
                            description={item.content}
                            postId={postId} // ID do post principal
                            commentId={item.id} // ID do comentário
                            likedByCurrentUser={item.likedByCurrentUser}
                            navigation={navigation}
                            isComment={true}
                            onPostDelete={handleCommentDelete} // Passar o callback para deletar comentários
                        />
                    )
                }
                keyExtractor={item => (loading ? item.toString() : item.id?.toString())}
                removeClippedSubviews={true}
                bounces={false}
                overScrollMode="never"
                ListEmptyComponent={
                    !loading && comments && comments.length === 0 ? (
                        <View style={styles.noCommentsContainer}>
                            <Text style={styles.noCommentsText}>Nenhum comentário ainda.</Text>
                        </View>
                    ) : null
                }
            />
        </SafeAreaView>
    );
}
