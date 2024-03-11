<template>
    <div class="container min-h-screen mx-auto mt-5">
        <!-- Forum header -->
        <div class=" p-4 mb-8 rounded-lg">
            <h2 class="text-xl font-['kanit'] font-bold">{{ forum.title }}</h2>
            <h4 class="text-xl font-['kanit'] ">{{ forum.content }}</h4>
            <div class="mt-2 flex items-center justify-between">
                <div class="flex items-center">
                    <span class="text-gray-500 font-['kanit']">{{ forum.author }}</span>
                    <span class="mx-2 text-gray-500 font-['kanit']">•</span>
                    <span class="text-gray-500 font-['kanit']">{{ forum.createdAt }}</span>
                </div>

            </div>
            <!-- <h2 class="text-xl font-['kanit'] font-bold">forum.title</h2>
            <div class="mt-2 flex items-center justify-between">
                <div class="flex items-center">
                    <span class="text-gray-500 font-['kanit']">forum.author</span>
                    <span class="mx-2 text-gray-500 font-['kanit']">•</span>
                    <span class="text-gray-500 font-['kanit']">forum.createdAt</span>
                </div>

            </div> -->
        </div>

        <!-- Forum threads -->
        <div>
            <!-- Thread list -->
            <div class="mb-5  flex ">
                <div class="mr-5 w-full">
                    <label for="forum" class="text-lg font-['kanit'] text-gray-500">เพิ่มความคิดเห็น</label>
                    <input type="text" name="forum" id="forum" placeholder="ความคิดเห็น..." v-model="newComment.content"
                        class="block w-full rounded font-['kanit'] border-gray-300 bg-gray-50 py-3 px-4 pr-10 text-base text-gray-500 placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-gray-300 " />

                </div>
                <button @click="addComment()"
                    class="mt-4 inline-flex w-1/5 items-center justify-center rounded bg-[#2c52b3] py-2.5 px-4 text-base font-semibold font-['kanit'] tracking-wide text-white text-opacity-80 outline-none ring-offset-2 transition hover:text-opacity-100 focus:ring-2 focus:ring-teal-500 sm:text-lg">
                    โพส</button>
            </div>
            <div v-for="comment in comments" :key="comment.commentId" class="bg-white p-4 mb-4 shadow-md rounded-lg">
                <h2 class="text-xl font-['kanit'] font-bold">{{ comment.content }}</h2>
                <div class="mt-2 flex items-center justify-between">
                    <div class="flex items-center">
                        <span class="text-gray-500 font-['kanit']">{{ comment.author }}</span>
                        <span class="mx-2 text-gray-500 font-['kanit']">•</span>
                        <span class="text-gray-500 font-['kanit']">{{ comment.createdAt }}</span>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useUserStore } from '@/stores/user'
const { $api } = useNuxtApp()
const userStore = useUserStore()
const forum = ref({})
const comments = ref([])
const route = useRoute()
const fetchForum = async () => {
    try {
        const res = await $api(`/forum/comment/${route.params.forumId}`, {
            method: "GET"
        })
        forum.value = res.forum
        comments.value = res.comments
        newComment.value.forumId = res.forum.forumId
        sorted()
    }
    catch (error) {
        alert(error)
    }
}
fetchForum()
const addComment = async () => {
    try {
        await $api('/forum/addComment', {
            method: "POST",
            body: newComment.value
        })
        newComment.value = {
            forumId: "",
            content: "",
            author: userStore.user.email || "Unknown"
        }
        fetchForum()
    }
    catch (error) {
        alert(error)
    }
}
const newComment = ref({
    forumId: "",
    content: "",
    author: userStore.user.email || "Unknown"
})
const sorted = () => {
    // Sort comments by createdAt in ascending order
    if (comments.value) {
        return comments.value.sort((a, b) =>  new Date(b.createdAt) - new Date(a.createdAt));
    }
}
</script>

<style>
/* Any custom styles can be added here */
</style>