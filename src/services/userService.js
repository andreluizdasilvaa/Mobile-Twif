import appConfig from "../config/appConfig";
import api from "../config/api";

export const searchUserInfo = async () => {
    const { data } = await api.get(`${appConfig.URL_API}/user/me`)
    return data;
}
