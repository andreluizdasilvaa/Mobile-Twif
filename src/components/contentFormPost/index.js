import react, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import Toast from 'react-native-toast-message';
import { Image } from 'expo-image';

import { useSheetFormStore } from '../../stores/SheetFormStore';
import { useUserStore } from '../../stores/userStore';
import { createPost } from '../../services/postService';
import appConfig from '../../config/appConfig';
import styles from './styles';

export default function ContentFormPost() {
    const { close } = useSheetFormStore();
    const { userNick } = useUserStore();
    const [loading, setLoading] = useState(false);
    const [text, setText] = useState('');

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
                setText(''); // Limpa o campo após sucesso
                Toast.show({
                    type: 'success',
                    text1: 'Post enviado com sucesso!',
                    position: 'top',
                });
                close();
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
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.infoPostUser}>
                    <Image source={`${appConfig.URL_API}/image/${userNick}`} style={styles.image} />
                    <Text>{text.length}/190</Text>
                </View>
                <TouchableOpacity style={styles.btnSubmit} onPress={submitPost} disabled={loading}>
                    <Text style={styles.textBtnSubmit}>Enviar</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.inputWrapper}>
                <TextInput
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
}
