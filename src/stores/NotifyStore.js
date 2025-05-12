import { create } from "zustand"; // Importa a função create da biblioteca Zustand para criar o store global

// Cria o store de notificações usando Zustand
export const useNotifyStore = create((set, get) => ({ // Função que define o estado e as ações do store
    notifications: [], // Estado inicial: array vazio de notificações
    
    // Função para atualizar as notificações no estado global
    setNotifications: (newNotifications) => {
        const currentNotifications = get().notifications; // Pega as notificações atuais do estado
        
        // Verifica se houve alguma mudança nas notificações (comparação profunda)
        const hasChanges = JSON.stringify(currentNotifications) !== JSON.stringify(newNotifications);
        
        if (hasChanges) { // Só atualiza se houver mudanças
            set({ notifications: newNotifications }); // Atualiza o estado com as novas notificações
        }
    },

    // Função para marcar uma notificação como lida
    markNotificationAsRead: (notificationId) => {
        set((state) => ({ // Atualiza o estado usando o estado anterior
            notifications: state.notifications.map(notification =>
                notification.id === notificationId // Se o id bater...
                    ? { ...notification, isViewed: true } // ...marca como lida
                    : notification // Senão, mantém igual
            )
        }));
    }
}));