import React, { useState, useCallback } from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';
import { Drawer } from 'react-native-drawer-layout';
import { SafeAreaView } from 'react-native-safe-area-context';

import ContentDrawerBurguer from '../contentDrawerBurguer';

const { width } = Dimensions.get('window');

export default function DrawerBurguer({ children, navigation }) {
    const [isOpen, setIsOpen] = useState(false);

    const openDrawer = useCallback(() => {
        setIsOpen(true);
    }, []);

    const closeDrawer = useCallback(() => {
        setIsOpen(false);
    }, []);

    const toggleDrawer = useCallback(() => {
        setIsOpen(prevState => !prevState);
    }, []);

    // Adiciona os métodos do drawer ao primeiro filho (HeaderFeed)
    const modifiedChildren = React.Children.map(children, (child, index) => {
        if (index === 0 && child) {
            return React.cloneElement(child, { openDrawer });
        }
        return child;
    }); // Função para renderizar o conteúdo do drawer

    const renderDrawerContent = useCallback(() => {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <ContentDrawerBurguer navigation={navigation} closeDrawer={closeDrawer} />
            </SafeAreaView>
        );
    }, [navigation, closeDrawer]);

    return (
        <Drawer
            open={isOpen}
            onOpen={openDrawer}
            onClose={closeDrawer}
            drawerStyle={styles.drawer}
            drawerType="front"
            renderDrawerContent={renderDrawerContent}
        >
            {modifiedChildren}
        </Drawer>
    );
}

const styles = StyleSheet.create({
    drawer: {
        width: width * 0.7,
        height: '100%',
        backgroundColor: '#fff',
    },
});
