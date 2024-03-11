import { defineStore } from "pinia";
import products from '../assets/product/product.json'
import { useProductStore } from '@/stores/product'
import { useUserStore } from "@/stores/user"
export const useCartStore = defineStore('cart', {
    state: () => ({
        cart: [],
    }),
    persist: {
        storage: persistedState.localStorage,
    },
    getters: {
        itemCount() {
            return this.cart.length;
        },
        totalPrice() {
            return this.cart.reduce((total, item) => total + item.price * item.quantity, 0);
        },
    },
    actions: {
        addProduct(item) {
            const userStore = useUserStore() 
            if (!userStore.token) {
                navigateTo("/login")
            }
            const productStore = useProductStore();
                const existingItem = this.cart.find((i) => i.productId === item.productId);
                const productInDatabase = productStore.products.find((i) => i.productId === item.productId);
                if (existingItem) {
                    if (existingItem.quantity < productInDatabase.stock) {
                        existingItem.quantity++;
                    } else {
                        alert("สินค้าหมดแล้ว");
                    }
                } else {
                    this.cart.push({ ...item, quantity: 1 });
                }
        },
        removeProduct(productId) {
            const index = this.cart.findIndex((item) => item.productId === productId);
            if (index !== -1) {
                this.cart.splice(index, 1);
            }
        },
        reduceProduct(item) {
            const existingItem = this.cart.find((i) => i.productId === item.productId);
            console.log(existingItem.quantity)
            if (existingItem.quantity >= 2) {
                existingItem.quantity--;
            }
            else {
                this.removeProduct(existingItem.productId);
            }
        },
        clearCart() {
            this.cart = [];
        },
    }
})
