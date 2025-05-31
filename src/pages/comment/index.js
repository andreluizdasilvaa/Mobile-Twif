import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    FlatList,
    Modal,
    TouchableWithoutFeedback,
    Keyboard,
    Dimensions,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { getCommentById } from '../../services/postService';
import HeaderComment from '../../components/headerComment';
import Post from '../../components/post';
import SkeletonPost from '../../components/SkeletonPost';
import styles from './styles';
import { StatusBar } from 'expo-status-bar';

import ModalInputPost from '../../components/modalInputPost';
import ContentFormPost from '../../components/contentFormPost';

export default function Comment({ navigation }) {
    const route = useRoute();
    const { userNick, postId, nameUser, description } = route.params;
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [hasInteractionPost, setHasInteractionPost] = useState(false);
    
    const flatListRef = useRef(null); // Função para remover um comentário da lista quando ele é deletado
    const handleCommentDelete = commentId => {
        setComments(prevComments => prevComments.filter(comment => comment.id !== commentId));
        setHasInteractionPost(true);
    };

    // Função para rolar a lista para o topo
    const scrollToTop = () => {
        if (flatListRef.current) {
            flatListRef.current.scrollToOffset({ offset: 0, animated: true });
        }
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

    function handleModal() {
        setModalVisible(!modalVisible);
    }

    function handleUpdateComment(newComment) {
        setComments(prevComments => [newComment, ...prevComments]);
        setModalVisible(false);
        setHasInteractionPost(true);
    }

    return (
        <SafeAreaView style={styles.container}>
            <HeaderComment hasInteraction={hasInteractionPost} navigation={navigation} onLogoPress={scrollToTop} />
            <FlatList
                ref={flatListRef}
                style={styles.containerComments}
                data={loading ? [1, 2, 3] : comments}
                renderItem={({ item }) =>
                    loading ? (
                        <SkeletonPost />
                    ) : comments.length > 0 ? (
                        <Post
                            style={styles.commentPost}
                            userNick={item.user.usernick}
                            nameUser={item.user.nome}
                            description={item.content}
                            postId={postId}
                            commentId={item.id}
                            likedByCurrentUser={item.likedByCurrentUser}
                            navigation={navigation}
                            isComment={true}
                            onPostDelete={handleCommentDelete}
                        />
                    ) : null
                }
                keyExtractor={item => (loading ? item.toString() : item.id?.toString())}
                removeClippedSubviews={true}
                bounces={false}
                overScrollMode="never"
                ListHeaderComponent={
                    <>
                        <Post
                            userNick={userNick}
                            nameUser={nameUser}
                            description={description}
                            postId={postId}
                            navigation={navigation}
                            isComment={true}
                            isMainPost={true}
                        />
                        <View style={styles.ContainerTextComment}>
                            <Text style={styles.textComment}>Comentarios:</Text>
                        </View>
                        {!loading && comments.length === 0 && (
                            <View style={styles.noCommentsContainer}>
                                <Text style={styles.noCommentsText}>Nenhum comentário.</Text>
                            </View>
                        )}
                    </>
                }
            />

            <Modal
                animationType="fade"
                visible={modalVisible}
                transparent={true}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                    <View style={styles.modalBackground}>
                        <TouchableWithoutFeedback onPress={() => {}}>
                            <View style={styles.modalContent}>
                                <ContentFormPost
                                    isComment={true}
                                    postId={postId}
                                    setModalVisible={setModalVisible}
                                    updateCommentList={handleUpdateComment}
                                />
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>

            <ModalInputPost isComment={true} callback={handleModal} />
            <StatusBar backgroundColor={modalVisible ? 'rgba(0,0,0,0.5)' : '#ffffff'} />
        </SafeAreaView>
    );
}
