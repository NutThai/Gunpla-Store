import { defineStore } from "pinia";
import products from '../assets/product/product.json'

export const useProductStore = defineStore('products', {
    state: () => ({
        products: [],
        filteredProducts: []
    }),
    getters: {
    },
    actions: {
        async fetchProducts() {
            // this.products = products
            const { $api } = useNuxtApp()
            const [gunpla, tool] = await Promise.all([
                $api("/gunpla", { method: "GET" }),
                $api("/tool", { method: "GET" })
            ])
            this.products = (gunpla ? gunpla : []).concat(tool ? tool : [])
        }
    }

})