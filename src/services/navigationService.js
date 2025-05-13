import { createNavigationContainerRef } from '@react-navigation/native';

// Cria e exporta a referência de navegação
export const navigationRef = createNavigationContainerRef();

// Exporta um objeto navigation para facilitar o uso
export const navigation = {
    get current() {
        return navigationRef.current;
    },
};

// Mantém apenas algumas funções helper essenciais para compatibilidade com código existente ( remover futuramente )
export const navigate = (name, params = {}) => {
    if (navigationRef.current) {
        navigationRef.current.navigate(name, params);
    }
};

export const goBack = () => {
    if (navigationRef.current && navigationRef.current.canGoBack()) {
        navigationRef.current.goBack();
    }
};