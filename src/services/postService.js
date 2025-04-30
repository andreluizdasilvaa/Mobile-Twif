import api from "../config/api";

export const getPost = async () => {
    try {
        const { data } = await api.get('/feed/posts')
        return data;
    } catch (error) {
        throw error;
    }
}

export const createPost = async (postData) => {
    // ...
};

export const likePost = async (postId) => {
    // ...
};