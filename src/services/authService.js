import api from '../config/api';
import appConfig from '../config/appConfig';
import { saveItem, getItem } from './storageService';
import { useUserStore } from '../stores/userStore';

export async function loginRequest(email, senha) {
    try {
        const { data } = await api.post('/auth/login', {
            email,
            senha,
        });

        if (data.token) {
            await saveItem(appConfig.TOKEN_KEY, data.token);
        }

        useUserStore.getState().setUserData({
            userNick: data.user.usernick,
            name: data.user.nome,
            isAdmin: data.isAdmin
        });

        return data;
    } catch (error) {
        const errorMessage = error.response?.data?.Erro || 'Erro ao fazer login';
        throw new Error(errorMessage);
    }
}

export async function verifySession() {
    try {
        const token = await getItem(appConfig.TOKEN_KEY); // Use getItem ao invés de deleteItem
        if (!token) {
            return { authenticated: false };
        }

        const { data } = await api.get(`${appConfig.URL_API}/auth/validate`);

        useUserStore.getState().setUserData({
            userNick: data.user.usernick,
            name: data.user.nome,
            isAdmin: data.isAdmin
        });

        return {
            authenticated: data.isAuthenticated,
            data: data,
        };
    } catch (error) {
        return {
            authenticated: false,
            error: error.response?.data?.Erro || 'Erro ao validar sessão',
        };
    }
}

export async function registerRequest() {
    
}