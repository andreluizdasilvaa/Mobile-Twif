import api from '../config/api';

export const getPost = async () => {
    try {
        const { data } = await api.get('/feed/posts');
        return data;
    } catch (error) {
        throw error;
    }
};

export const createPost = async postData => {
    try {
        const response = await api.post('/feed/create/post', {
            conteudo: postData,
        });
        return {
            data: response.data,
            status: response.status,
        };
    } catch (error) {
        throw error;
    }
};

export const likePost = async postId => {
    try {
        const { data } = await api.post(`/feed/posts/${postId}/like`);
        return data;
    } catch (error) {
        throw error;
    }
};

export const deletePost = async postId => {
    try {
        const { data } = await api.delete('/feed/delete/post', {
            // Quando o metodo é 'DELETE', É assim que passa dados no body
            data: { 
                idPost: postId,
            },
        });
        return data;
    } catch (error) {
        throw error;
    }
};

export const getCommentById = async postId => {
    try {
        const { data } = await api.get(`/comments/posts/${postId}/comments`)
        return data;
    } catch (error) {
        throw error;
    }
}

export const deleteComment = async (postId, commentId) => {
    try {
        const { data } = await api.delete(`/comments/posts/${postId}/comments/${commentId}`);
        return data;
    } catch (error) {
        throw error;
    }
}

export const createComment = async (commentId, content) => {
    try {
        const response = await api.post(`comments/posts/${commentId}/comments`, {
            content
        })
        return {
            data: response.data,
            status: response.status,
        };
    } catch (error) {
        throw error;
    }
}