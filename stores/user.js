import { defineStore } from "pinia";

export const useUserStore = defineStore('user', {
    state: () => ({
        token: "",
        user: {}
    }),
    getters: {
        isAuthenticated() { return !!this.token },
        isAdmin() { return this.user.role == "admin" }
    },
    persist: {
        storage: persistedState.localStorage,
    },
    actions: {
        async login(email, password) {
            const { $api } = useNuxtApp()
            try {
                const requestBody = {
                    email: email,
                    password: password
                };
                const response = await $api('/user/authentication', {
                    method: 'POST',
                    body: requestBody
                });
                this.token = response.token;
                this.user = response.user
                const token = useCookie('token');
                token.value = response.token; 
            } catch (error) {
                console.error('Error logging in:', error);
                throw error;
            }
        },
        async register(email, password) {
            const { $api } = useNuxtApp()
            try {
                const requestBody = {
                    email: email,
                    password: password
                };
                const response = await $api('/user/newUser', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(requestBody)
                });
                 this.token = response.token;
                this.user = response.user
                const token = useCookie('token');
                token.value = response.token; 
            } catch (error) {
                console.error('Error logging in:', error);
                throw error;
            }
        },
        async signout() {
            const token = useCookie('token');
            token.value = null;
            this.token = "",
                this.user = {}
        }
    }

})