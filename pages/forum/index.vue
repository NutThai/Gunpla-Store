<template>
    <div class="container min-h-screen mx-auto mt-5">
        <!-- Forum header -->
        <div class=" p-4 mb-8 rounded-lg">
            <h1 class="text-4xl font-['kanit'] font-bold">Welcome to the Forum Page!</h1>
        </div>

        <!-- Forum threads -->
        <div>
            <!-- Thread list -->
            <div class="mb-5  flex ">
                <div class="mr-5 w-full">
                    <label for="forum" class="text-lg font-['kanit'] text-gray-500">สร้างฟอรั่ม</label>
                    <input type="text" name="forum" id="forum" placeholder="หัวข้อ" v-model="newForum.title"
                        class="block w-full rounded font-['kanit'] border-gray-300 bg-gray-50 py-3 px-4 pr-10 text-base text-gray-500 placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-gray-300 " />
                    <label for="content" class="text-lg font-['kanit'] text-gray-500 mt-5">รายละเอียดฟอรั่ม</label>
                    <textarea id="content" name="content" placeholder="รายละเอียดสินค้า"
                        v-model="newForum.content"
                        class="block w-full rounded font-['kanit'] border-gray-300 bg-gray-50 py-3 px-4 pr-10 text-base text-gray-500 placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-gray-300" />
                </div>
                <button @click="addForum()"
                    class="mt-4 inline-flex w-2/10 items-center justify-center rounded bg-[#2c52b3] py-2.5 px-4 text-base font-semibold font-['kanit'] tracking-wide text-white text-opacity-80 outline-none ring-offset-2 transition hover:text-opacity-100 focus:ring-2 focus:ring-teal-500 sm:text-lg">
                    โพส</button>
            </div>
            <div v-for="forum in forums" :key="forum.forumId" class="bg-white p-4 mb-4 shadow-md rounded-lg">
                <Nuxt-link :to="`/forum/${forum.forumId}`">
                    <h2 class="text-xl font-['kanit'] font-bold">{{ forum.title }}</h2>
                    <h4 class="text-xl font-['kanit'] ">{{ forum.content }}</h4>
                    <div class="mt-2 flex items-center justify-between">
                        <div class="flex items-center">
                            <span class="text-gray-500 font-['kanit']">{{ forum.author }}</span>
                            <span class="mx-2 text-gray-500 font-['kanit']">•</span>
                            <span class="text-gray-500 font-['kanit']">{{ forum.createdAt }}</span>
                        </div>

                    </div>
                </Nuxt-link>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useUserStore } from '@/stores/user'
const { $api } = useNuxtApp()
const userStore = useUserStore()
const forums = ref([])

const fetchForum = async () => {
    try {
        const res = await $api('/forum', {
            method: "GET"
        })
        forums.value = res
        sorted()
    }
    catch (error) {
        alert(error)
    }
}
fetchForum()
const addForum = async () => {
    try {
        await $api('/forum/addForum', {
            method: "POST",
            body: newForum.value
        })
        fetchForum()
    }
    catch (error) {
        alert(error)
    }
}
const sorted = () => {
    // Sort comments by createdAt in ascending order
    if (forums.value) {
        return forums.value.sort((a, b) =>  new Date(b.createdAt) - new Date(a.createdAt));
    }
}
const newForum = ref({
    title: "",
    content:"",
    author: userStore.user.email || "Unknown"
})

</script>

<style>
/* Any custom styles can be added here */
</style>