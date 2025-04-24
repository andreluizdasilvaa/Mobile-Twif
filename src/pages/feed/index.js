import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, FlatList } from 'react-native';
import styles from './styles';

import HeaderFeed from '../../components/headerFeed';
import ModalInputPost from '../../components/modalInputPost';
import Post from '../../components/post';

import appConfig from '../../config/appConfig';

export default function Feed({ navigation }) {
    const [posts, setPosts] = useState([]);

    // Api para teste
    useEffect(() => {
        try {
            fetch(`${appConfig.URL_API}/feed/posts`)
                .then(r => r.json())
                .then(resp => {
                    setPosts(resp);
                });
        } catch (error) {
            console.log(error);
        }
    }, []);

    return (
        <>
            <HeaderFeed />
            <FlatList
                style={styles.containerPosts}
                data={posts}
                renderItem={({ item: post }) => (
                    <Post
                        picture={post.user.profilePicture}
                        nameUser={post.user.nome}
                        description={post.content}
                        quantLike={post.likes.length}
                        quantComment={post.comments.length}
                    />
                )}
                keyExtractor={post => post.id}
            />
            <ModalInputPost />
            <StatusBar style="auto" />
        </>
    );
}
