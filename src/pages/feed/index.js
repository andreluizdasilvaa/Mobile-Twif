import { useEffect, useState, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, FlatList, RefreshControl } from 'react-native';
import styles from './styles';

import HeaderFeed from '../../components/headerFeed';
import ModalInputPost from '../../components/modalInputPost';
import Post from '../../components/post';

import appConfig from '../../config/appConfig';
import { getPost } from '../../services/postService';

export default function Feed({ navigation }) {
    const [posts, setPosts] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const fetchPosts = async () => {
        try {
            const data = await getPost();
            if (!data) {
                return;
            }
            setPosts(data);
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Erro ao carregar posts',
                text2: error.message || 'Tente novamente!',
                position: 'top',
            });
            if (error.status === 401) {
                navigation.replace('Home');
            }
        }
    };

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchPosts();
        setRefreshing(false);
    };

    useEffect(() => {
        fetchPosts();
    }, [navigation]);

    return (
        <>
            <HeaderFeed />
            <FlatList
                style={styles.containerPosts}
                data={posts}
                renderItem={({ item: post }) => (
                    <Post
                        userNick={post.user.usernick}
                        nameUser={post.user.nome}
                        description={post.content}
                        quantLike={post.likes.length}
                        quantComment={post.comments.length}
                    />
                )}
                keyExtractor={post => post.id}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            />
            <ModalInputPost />
            <StatusBar style="auto" />
        </>
    );
}
