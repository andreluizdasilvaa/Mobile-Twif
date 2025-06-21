import appConfig from "../config/appConfig";
import api from "../config/api";

export const searchUserInfo = async () => {
    const { data } = await api.get(`${appConfig.URL_API}/user/me`)
    return data;
}

export const notifications = async () => {
    const { data } = await api.get(`${appConfig.URL_API}/user/notifications`)
    return data;
}

export const markNotification = async (notifyId) => {
    const { data } = await api.patch(`${appConfig.URL_API}/user/notifications/read`, {
        notificationId: notifyId
    })
    return data;
}

export const userByNick = async (userNick) => {
    const { data } = await api.get(`${appConfig.URL_API}/user/perfil/${userNick}`)
    return data;
}

export const editInfoUser = async (name, course, nascimento, bio) => {
    const { data } = await api.patch(`${appConfig.URL_API}/user/troca/info`, {
        nome: name, course, nascimento, bio
    })
    return data;
}