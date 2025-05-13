import { create } from 'zustand';

export const usePostStore = create(set => ({
    feedPosts: [],

    // Função para definir posts
    setFeedPosts: posts => set({ feedPosts: posts }),

    // Função para remover um post
    removePost: postId =>
        set(state => ({
            feedPosts: state.feedPosts.filter(post => post.id !== postId),
        })),

    // Função para adicionar um novo post ao feed
    addNewPost: post =>
        set(state => ({
            feedPosts: [post, ...state.feedPosts],
        })),

    // Função para atualizar um post existente
    updatePost: (postId, updatedData) =>
        set(state => ({
            feedPosts: state.feedPosts.map(post =>
                post.id === postId ? { ...post, ...updatedData } : post,
            ),
        })),
}));
