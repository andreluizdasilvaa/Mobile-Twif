import api from '../config/api';
import { saveItem } from './storageService'

export async function loginRequest(email, senha) {
    try {
        const { data } = await api.post('/auth/login', {
            email,
            senha
        })

        // Se der tudo certo, salva o token
        if (data.token) {
            await saveItem('your-session-token', data.token);
        }

        return data;
    } catch (error) {
        const errorMessage = error.response?.data?.Erro || 'Erro ao fazer login';
        throw new Error(errorMessage);
    }
}
