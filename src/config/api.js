import axios from 'axios';
import appConfig from './appConfig';
import { getItem, deleteItem } from '../services/storageService';
import { navigate } from '../services/navigationService';
import Toast from 'react-native-toast-message';

const api = axios.create({
    baseURL: appConfig.URL_API,
    timeout: appConfig.API_TIMEOUT, // Se a requisição não receber uma resposta dentro desse tempo, ela será automaticamente cancelada e gerará um erro
    headers: {
        'Content-Type': 'application/json'
    }
});

// Interceptador para adicionar token automaticamente
api.interceptors.request.use(async (config) => {
    const token = await getItem('your-session-token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Interceptador para tratar erros
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
            // Token expirado
            await deleteItem('your-session-token');
            
            Toast.show({
                type: 'error', 
                text1: 'Sessão expirada',
                text2: 'Por favor, faça login novamente',
                position: 'top',
            });

            navigate('Login', { reset: true });
            
            throw { status: 401, message: 'Sessão expirada' };
        }
        throw error;
    }
);

export default api;
