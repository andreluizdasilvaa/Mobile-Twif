import { useEffect, useState } from 'react';
import { StatusBar, FlatList, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import styles from './styles';

import HeaderFeed from '../../components/headerFeed';
import ModalInputPost from '../../components/modalInputPost';
import Post from '../../components/post';
import DrawerBurguer from '../../components/drawerBurguer';
import SkeletonPost from '../../components/SkeletonPost';
import SheetFormPost from '../../components/sheetFormPost';

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
        <GestureHandlerRootView style={{ flex: 1 }}>
            <StatusBar backgroundColor="white" barStyle="dark-content" />
            <SafeAreaView style={{ flex: 1 }}>
                <DrawerBurguer navigation={navigation}>
                    <HeaderFeed />
                    <FlatList
                        style={styles.containerPosts}
                        data={loading ? [1, 2, 3, 4] : posts}
                        renderItem={({ item }) =>
                            loading ? (
                                <SkeletonPost />
                            ) : (
                                <Post
                                    userNick={item.user.usernick}
                                    nameUser={item.user.nome}
                                    description={item.content}
                                    quantLike={item.likes.length}
                                    quantComment={item.comments.length}
                                    postId={item.id}
                                    likedByCurrentUser={item.likedByCurrentUser}
                                />
                            )
                        }
                        keyExtractor={item => (loading ? item.toString() : item.id?.toString())}
                        removeClippedSubviews={true}
                        refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                        }
                    />
                    <ModalInputPost />
                    <SheetFormPost />
                </DrawerBurguer>
            </SafeAreaView>
        </GestureHandlerRootView>
    );
}
