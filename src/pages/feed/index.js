import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { FlatList, RefreshControl } from 'react-native';
import styles from './styles';

import HeaderFeed from '../../components/headerFeed';
import ModalInputPost from '../../components/modalInputPost';
import Post from '../../components/post';

import { getPost } from '../../services/postService';

export default function Feed({ navigation }) {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const fetchPosts = async () => {
        try {
            setLoading(true);
            const data = await getPost();
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
        } finally {
            setLoading(false);
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
