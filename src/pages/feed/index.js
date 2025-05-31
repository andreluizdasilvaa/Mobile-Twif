import { useEffect, useState, useCallback, useRef } from 'react';
import { StatusBar, FlatList, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import { useFocusEffect } from '@react-navigation/native';
import styles from './styles';

import HeaderFeed from '../../components/headerFeed';
import ModalInputPost from '../../components/modalInputPost';
import Post from '../../components/post';
import DrawerBurguer from '../../components/drawerBurguer';
import SkeletonPost from '../../components/SkeletonPost';
import SheetFormPost from '../../components/sheetFormPost';

import { getPost } from '../../services/postService';

export default function Feed({ navigation }) {
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const flatListRef = useRef(null);

    const [feedPosts, setFeedPosts] = useState([]);

    // Função para lidar com a deleção de posts
    const handlePostDelete = postId => {
        // Atualizar o estado local removendo o post deletado
        setFeedPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
    };

    // Função para rolar a lista para o topo
    const scrollToTop = () => {
        if (flatListRef.current) {
            flatListRef.current.scrollToOffset({ offset: 0, animated: true });
        }
    };
    const fetchPosts = async () => {
        try {
            setLoading(true);
            const data = await getPost();
            setFeedPosts(data);
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
    }, []);

    function handleUpdatePost(newPost) {
        fetchPosts();
    }

    // Este efeito será disparado sempre que a tela receber foco (quando o usuário voltar para ela)
    useFocusEffect(
        useCallback(() => {
            // Verificar se viemos da tela de perfil onde um post foi excluído
            const shouldRefreshFeed = navigation
                .getState()
                .routes.find(route => route.name === 'Home' && route.params?.shouldRefreshFeed);

            if (shouldRefreshFeed) {
                fetchPosts();
                // Limpar o parâmetro para não recarregar novamente se o usuário focar a tela por outras razões
                navigation.setParams({ shouldRefreshFeed: undefined });
            }
        }, [navigation]),
    );

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <StatusBar backgroundColor="white" barStyle="dark-content" />
            <SafeAreaView style={{ flex: 1 }}>
                <DrawerBurguer navigation={navigation}>
                    <HeaderFeed navigation={navigation} onLogoPress={scrollToTop} />
                    <FlatList
                        ref={flatListRef}
                        style={styles.containerPosts}
                        data={loading ? [1, 2, 3, 4] : feedPosts}
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
                                    navigation={navigation}
                                    onPostDelete={handlePostDelete}
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
                    <SheetFormPost handleUpdatePost={handleUpdatePost}/>
                </DrawerBurguer>
            </SafeAreaView>
        </GestureHandlerRootView>
    );
}
