import api from '../config/api';

export const getAllImages = async () => {
    try {
        const { data } = await api.get('/image');
        return data;
    } catch (error) {
        throw error;
    }
}

export const replaceProfile = async (profileSelect, usernick) => {
    try {
        const { data } = await api.patch(`/user/troca/avatar/${profileSelect}`, {
            usernick
        })
        return data;
    } catch (error) {
        throw error;
    }
}