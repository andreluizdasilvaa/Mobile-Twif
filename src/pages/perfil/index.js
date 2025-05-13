import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Image } from 'expo-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useRoute } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import styles from './styles';
import colors from '../../constants/colors';

// Importações de serviços e stores
import { userByNick } from '../../services/userService';
import { useUserStore } from '../../stores/userStore';
import { usePostStore } from '../../stores/postStore';
import Post from '../../components/post';
import ScreenLoader from '../../components/ScreenLoader';
import appConfig from '../../config/appConfig';
import { navigationRef } from '../../services/navigationService';

export default function Perfil() {
    const route = useRoute();
    const { userNick } = route.params;

    const [infoUser, setInfoUser] = useState({});
    const [loading, setLoading] = useState(false);
    const { userNick: currentUserNick } = useUserStore();

    useEffect(() => {
        async function searchUserInfo() {
            setLoading(true);
            try {
                const data = await userByNick(userNick);
                setInfoUser(data);
            } catch (error) {
                console.error('Erro ao buscar informações do usuário:', error);
            } finally {
                setLoading(false);
            }
        }

        searchUserInfo();
    }, [userNick]);

    // Função para lidar com a deleção de posts
    const handlePostDelete = postId => {
        // Atualizar o estado local removendo o post deletado
        setInfoUser(prevInfo => ({
            ...prevInfo,
            posts: prevInfo.posts.filter(post => post.id !== postId),
        }));
    };

    if (loading) {
        return <ScreenLoader color="#000" size={36} />;
    }

    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigationRef.current?.goBack()}>
                        <MaterialIcons name="arrow-back" size={30} color={colors.primaryColor} />
                    </TouchableOpacity>
                </View>
                <View style={styles.containerInfo}>
                    <Image
                        source={{
                            uri: `${appConfig.URL_API}/image/${userNick}`,
                        }}
                        style={styles.image}
                    />
                    <View style={styles.contentInfo}>
                        <Text style={[styles.textInfo, styles.nameUserText]}>{infoUser.nome}</Text>
                        <Text style={styles.textInfo}>@{userNick}</Text>
                        <Text style={[styles.textInfo, styles.descUserText]}>
                            {infoUser.bio ? infoUser.bio : `${infoUser.nome} não tem uma bio.`}
                        </Text>

                        <View style={styles.containerIconInfo}>
                            {!infoUser.nascimento ? null : (
                                <View style={styles.infoIcon}>
                                    <MaterialIcons name="date-range" size={24} color="black" />
                                    <Text style={styles.infoIconText}>{infoUser.nascimento}</Text>
                                </View>
                            )}

                            {!infoUser.course ? null : (
                                <View style={styles.infoIcon}>
                                    <MaterialIcons name="star-border" size={24} color="black" />
                                    <Text style={styles.infoIconText}>{infoUser.course}</Text>
                                </View>
                            )}
                        </View>
                    </View>
                </View>
                <View style={styles.containerPosts}>
                    {infoUser.posts && infoUser.posts.length > 0 ? (
                        infoUser.posts.map(item => (
                            <Post
                                key={item.id?.toString()}
                                userNick={userNick}
                                nameUser={infoUser.nome}
                                description={item.content}
                                quantLike={item.likes.length}
                                quantComment={item.comments.length}
                                postId={item.id}
                                likedByCurrentUser={item.likedByCurrentUser}
                                isUserProfile={currentUserNick === userNick ? true : false}
                                onPostDelete={handlePostDelete}
                                navigation={navigationRef.current}
                            />
                        ))
                    ) : (
                        <Text>{infoUser.nome} não tem nenhum post</Text>
                    )}
                </View>
                <StatusBar style="light" backgroundColor={colors.backgroundDarkColor} />
            </ScrollView>
        </SafeAreaView>
    );
}
