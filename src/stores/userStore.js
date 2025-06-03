import { create } from 'zustand';

export const useUserStore = create(set => ({
    userNick: '',
    name: '',
    isAdmin: false,
    profilePicture: '',
    darkMode: false,

    toggleDarkMode: () => {
        const current = get().darkMode;
        set({ darkMode: !current });
    },

    // Adicionar ação para atualizar os dados do usuário
    setUserData: userData =>
        set({
            userNick: userData.userNick,
            name: userData.name,
            isAdmin: userData.isAdmin,
            profilePicture: userData.profilePicture,
        }),

    // Ação para atualizar apenas a foto de perfil
    updateProfilePicture: newPicture =>
        set(state => ({
            ...state,
            profilePicture: newPicture,
        })),

    // Ação para limpar os dados (útil para logout)
    clearUserData: () =>
        set({
            userNick: '',
            name: '',
            isAdmin: false,
            profilePicture: '',
        }),
}));
