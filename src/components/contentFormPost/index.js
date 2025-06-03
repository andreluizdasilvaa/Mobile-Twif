import React, { useState, forwardRef } from 'react';
import { View, TextInput, Text, TouchableOpacity, ActivityIndicator, Keyboard } from 'react-native';
import Toast from 'react-native-toast-message';
import { Image } from 'expo-image';

import { useSheetFormStore } from '../../stores/SheetFormStore';
import { useUserStore } from '../../stores/userStore';
import { createPost, createComment } from '../../services/postService';
import appConfig from '../../config/appConfig';
import styles from './styles';

const ContentFormPost = forwardRef((props, inputRef) => {
    const { profilePicture } = useUserStore();
    const [loading, setLoading] = useState(false);
    const [text, setText] = useState('');

    let isComment = props.isComment || false;

    const handleTextChange = newText => {
        const lineBreaks = (newText.match(/\n/g) || []).length;
        if (lineBreaks > 10) {
            // Se houver mais de 10 quebras, mantém apenas as primeiras 10
            const lines = newText.split('\n').slice(0, 11);
            setText(lines.join('\n'));
        } else {
            setText(newText);
        }
    };
    async function submitPost() {
        if (loading) return;
        if (props.isComment) return;

        if (!text.trim()) {
            Toast.show({
                type: 'error',
                text1: 'Erro ao enviar post',
                text2: 'O texto não pode estar vazio!',
                position: 'top',
            });
            return;
        }

        setLoading(true);
        try {
            const response = await createPost(text);
            if (response.status === 201) {
                setText('');
                Toast.show({
                    type: 'success',
                    text1: 'Post enviado com sucesso!',
                    position: 'bottom',
                });
                props.handleUpdatePost()
            }
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Erro ao enviar post',
                text2: error.message || 'Tente novamente!',
                position: 'top',
            });
        } finally {
            setLoading(false);
            Keyboard.dismiss();
        }
    }

    async function submitComment() {
        if (!text.trim()) {
            Toast.show({
                type: 'error',
                text1: 'Erro ao enviar comentario',
                text2: 'O texto não pode estar vazio!',
                position: 'top',
            });
            return;
        }

        setLoading(true);
        try {
            const response = await createComment(props.postId, text);
            if (response.status === 201) {
                setText(''); 
                Toast.show({
                    type: 'success',
                    text1: 'Comentario enviado com sucesso!',
                    position: 'top',
                });
            }
            props.updateCommentList(response.data);
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Erro ao enviar comentario',
                text2: error.message || 'Tente novamente!',
                position: 'top',
            });
        } finally {
            setLoading(false);
            Keyboard.dismiss();
        }
    }

    return (
        <View style={[styles.container, isComment ? { marginTop: 12 } : null]}>
            <View style={styles.header}>
                <View style={styles.infoPostUser}>
                    <Image source={{ uri: `${appConfig.URL_API}/image/default/${profilePicture}`}} style={styles.image} />
                    <Text>{text.length}/190</Text>
                </View>
                <TouchableOpacity 
                    style={styles.btnSubmit} 
                    onPress={
                        isComment ? submitComment : submitPost
                    } 
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator size={'small'} color='#fff' />
                    ) : (
                        <Text style={styles.textBtnSubmit}>Enviar</Text>
                    )}
                    
                </TouchableOpacity>
            </View>

            <View style={styles.inputWrapper}>
                <TextInput
                    ref={inputRef}
                    multiline
                    value={text}
                    onChangeText={handleTextChange}
                    placeholder="O que está rolando?"
                    style={styles.textInput}
                    maxLength={190}
                    textAlignVertical="top"
                />
            </View>
        </View>
    );
});

export default ContentFormPost;
