import api from '../config/api';
import { useUserStore } from '../stores/userStore';

export const getAllImages = async () => {
    try {
        const { data } = await api.get('/image');
        return data;
    } catch (error) {
        throw error;
    }
};

export const replaceProfile = async (profileSelect, usernick) => {
    try {
        const { data } = await api.patch(`/user/troca/avatar/${profileSelect}`, {
            usernick,
        });

        // Atualiza o store com a nova imagem
        useUserStore.getState().updateProfilePicture(profileSelect);

        return data;
    } catch (error) {
        throw error;
    }
};
