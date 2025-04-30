import { createNavigationContainerRef } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export const navigate = (name, params = {}) => {
    if (params.reset) {
        navigationRef.current?.reset({
            index: 0,
            routes: [{ name }],
        });
    } else {
        navigationRef.current?.navigate(name);
    }
};
