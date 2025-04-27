import axios from 'axios';
import appConfig from './appConfig';
import { getItem } from '../services/storageService';

const api = axios.create({
    baseURL: appConfig.URL_API,
    timeout: 5000,
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
            throw { status: 401, message: 'Sessão expirada' };
        }
        throw error;
    }
);

export default api;
