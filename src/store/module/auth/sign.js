import { computed, ref } from 'vue';
import { defineStore } from 'pinia';


export const useSignStore = defineStore('sign', () => {

    const token = ref('');

    const isAuthenticated = computed(() => {
        return token.value !== '';
    });

    const setToken = (auth) => {
        if (typeof auth === 'string' && auth !== '') {
            token.value = auth;
        }
    };

    return { token, isAuthenticated, setToken };
}, {
    persist: true
});
