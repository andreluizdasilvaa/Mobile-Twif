import React, { useCallback, useMemo, useRef, useEffect } from 'react';
import { View, StyleSheet, Keyboard, KeyboardAvoidingView, Platform } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import ContentFormPost from '../contentFormPost';
import { useSheetFormStore } from '../../stores/SheetFormStore';

export default function SheetFormPost() {
    const { isVisible, close } = useSheetFormStore();
    const bottomSheetRef = useRef(null);
    const inputRef = useRef(null);

    const snapPoints = useMemo(() => ['30%', '50%'], []);

    const handleSheetChanges = useCallback(
        index => {
            if (index === -1) {
                Keyboard.dismiss();
                close();
            }
        },
        [close],
    );

    useEffect(() => {
        if (isVisible) {
            bottomSheetRef.current?.expand();
            setTimeout(() => {
                inputRef.current?.focus();
            }, 200);
        } else {
            bottomSheetRef.current?.close();
        }
    }, [isVisible]);

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 24}
            >
                <BottomSheet
                    ref={bottomSheetRef}
                    index={-1}
                    snapPoints={snapPoints}
                    onChange={handleSheetChanges}
                    enablePanDownToClose={true}
                >
                    <BottomSheetView style={{ flex: 1 }}>
                        <ContentFormPost ref={inputRef} />
                    </BottomSheetView>
                </BottomSheet>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: 'transparent',
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
    },
});
