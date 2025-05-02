import { create } from "zustand";

export const useUserStore = create((set) => ({
    userNick: '',
    name: '',
    isAdmin: false,
    
    // Adicionar ação para atualizar os dados do usuário
    setUserData: (userData) => set({
        userNick: userData.userNick,
        name: userData.name,
        isAdmin: userData.isAdmin
    }),

    // Ação para limpar os dados (útil para logout)
    clearUserData: () => set({
        userNick: '',
        name: '',
        isAdmin: false
    })
}))