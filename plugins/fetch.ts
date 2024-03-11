import { useUserStore } from "~/stores/user"
export default defineNuxtPlugin(()=>{
    const user = useUserStore()
    const config = useRuntimeConfig()
    const $api = $fetch.create({
        baseURL: config.public.baseURL,
        headers: {
            "Content-Type": 'application/json',
            "Authorization": "bearer " + user.token
        }
    })
    return {
        provide:{
            api: $api
        }
    }
})