import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Drawer } from 'react-native-drawer-layout';
import { useDrawerStore } from '../../stores/DrawerStore';
import { SafeAreaView } from 'react-native-safe-area-context'

const { width, } = Dimensions.get('window');
import ContentDrawerBurguer from '../contentDrawerBurguer';

export default function DrawerBurguer({ children, navigation }) {
  const { isOpen, open, close } = useDrawerStore();

  return (
    <Drawer
      open={isOpen}
      onOpen={open}
      onClose={close}
      drawerStyle={styles.drawer}
      drawerWidth={width * 0.7} 
      renderDrawerContent={() => {
        return (
          <SafeAreaView>
            <ContentDrawerBurguer navigation={navigation}/>
          </SafeAreaView>
      )
      }}
    >
      {children}
    </Drawer>
  );
}

const styles = StyleSheet.create({
  drawer: {
    flex: 1,
    width: '70%',
    height: '100%',
    backgroundColor: '#fff',
  },
});