import api from '../config/api';

export const getCountUser = async () => {
    try {
        const { data } = await api.get('relatorios/usuarios');
        return data;
    } catch (error) {
        throw error;
    }
};

export const getCountAdminsUser = async () => {
    try {
        const { data } = await api.get('relatorios/usuarios/admins');
        return data;
    } catch (error) {
        throw error;
    }
};

export const getCountLikesInPosts = async () => {
    try {
        const { data } = await api.get('relatorios/curtidas');
        return data;
    } catch (error) {
        throw error;
    }
};

export const getCountCommentsInPosts = async () => {
    try {
        const { data } = await api.get('relatorios/comentarios');
        return data;
    } catch (error) {
        throw error;
    }
};

export const getCountPosts = async () => {
    try {
        const { data } = await api.get('relatorios/posts');
        return data;
    } catch (error) {
        throw error;
    }
};

export const getReportData = async () => {
    try {
        const [users, usersAdm, posts, likesInPost, commentsInPost] = await Promise.all([
            getCountUser(),
            getCountAdminsUser(),
            getCountPosts(),
            getCountLikesInPosts(),
            getCountCommentsInPosts(),
        ]);
        
        const normalUsers = users.quantidade - usersAdm.quantidade;
        const avgLikesPerPost = posts.quantidade > 0 ? likesInPost.quantidade / posts.quantidade : 0;
        const avgCommentPerPost = !Number.isNaN(commentsInPost.quantidade / posts.quantidade) ? (commentsInPost.quantidade / posts.quantidade) : 0;

        return [
            {
                allUsers: users.quantidade,
                allPosts: posts.quantidade,
                avgLikesPerPost,
                avgCommentPerPost,
            },
            {
                normalUsers,
                adminUsers: usersAdm.quantidade,
            }
    ];
    } catch (error) {
        throw error;
    }
};
