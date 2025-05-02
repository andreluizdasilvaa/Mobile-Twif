import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { FlatList, RefreshControl } from 'react-native';
import styles from './styles';

import HeaderFeed from '../../components/headerFeed';
import ModalInputPost from '../../components/modalInputPost';
import Post from '../../components/post';
import DrawerBurguer from '../../components/drawerBurguer';

import { getPost } from '../../services/postService';
import SkeletonPost from '../../components/SkeletonPost';

export default function Feed({ navigation }) {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const fetchPosts = async () => {
        try {
            setLoading(true);
            await new Promise(resolve => setTimeout(resolve, 2000)); // simulando o tempo de resp do server
            const data = await getPost();
            setPosts(data);
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Erro ao carregar posts',
                text2: error.message || 'Tente novamente!',
                position: 'top',
            });
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
        <DrawerBurguer navigation={navigation}>
            <HeaderFeed />
            <FlatList
                style={styles.containerPosts}
                data={loading ? [1, 2, 3, 4] : posts}
                renderItem={({ item }) => (
                    loading ? (
                        <SkeletonPost />
                    ) : (
                        <Post
                            userNick={item.user.usernick}
                            nameUser={item.user.nome}
                            description={item.content}
                            quantLike={item.likes.length}
                            quantComment={item.comments.length}
                        />
                    )
                )}
                keyExtractor={item => loading ? item.toString() : item.id}
                removeClippedSubviews={true}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            />
            <ModalInputPost />
            <StatusBar style="auto" />
        </DrawerBurguer>
    );
}
