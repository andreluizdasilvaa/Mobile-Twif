import api from "../config/api";

export const getPost = async () => {
    try {
        const { data } = await api.get('/feed/posts')
        return data;
    } catch (error) {
        if (error.status === 401) {
            throw error; // Repassando o erro com status 401
        }
        throw new Error('Erro ao buscar posts: ' + error.message);
    }
}

export const createPost = async (postData) => {
    // ...
};

export const likePost = async (postId) => {
    // ...
};