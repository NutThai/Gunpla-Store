<template>
  <div class="bg-[url('https://th.gundam.info/content/mgka/narrative/images/02about/bg.jpg')]  flex justify-center items-center h-screen">

    <!-- Left: Image -->
    <div class="w-1/2 h-screen hidden lg:block">
      <img src="https://cdn.donmai.us/original/a1/b7/a1b7ffbe3d20fef54d34a1f158db9e8d.png" alt="Placeholder Image"
        class="object-cover w-full h-full">
    </div>
    <!-- Right: Login Form -->
    <div class="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
      <h1 class="text-2xl font-semibold mb-4">Login</h1>
      <form @submit.prevent="login">
        <!-- Email Input -->
        <div class="mb-4">
          <label for="Email" class="block text-gray-700 mb-2">Email</label>
          <input type="text" id="Email" v-model="email" name="Email" required
            class="text-gray-700 w-full border border-gray-400 rounded-md py-2 px-3 focus:outline-none bg-white"
            autocomplete="off">
        </div>
        <!-- Password Input -->
        <div class="mb-4">
          <label for="password" class="block text-gray-700 mb-2">Password</label>
          <input type="password" id="password" v-model="password" name="password" required
            class="text-gray-700 w-full border border-gray-400 rounded-md py-2 px-3 focus:outline-none bg-white"
            autocomplete="off">
        </div>
        <!-- Remember Me Checkbox -->
        <div class="mb-4 flex items-center">
          <input type="checkbox" id="remember" name="remember" class="text-blue-500">
          <label for="remember" class="text-gray-600 ml-2">Remember Me</label>
        </div>
        <!-- Forgot Password Link -->
        <div class="mb-6 text-blue-500">
          <a href="#" class="hover:underline">Forgot Password?</a>
        </div>
        <!-- Login Button -->
        <button type="submit"
          class="border-cyan-500 bg-sky-900 hover:bg-sky-950 border-2 text-white font-semibold rounded-md py-2 px-4 w-full">Login</button>
      </form>
      <!-- Sign up  Link -->
      <nuxt-link to="/register">
        <div class="mt-6 text-blue-500 text-center">
          <a href="#" class="hover:underline">Sign up Here</a>
        </div>
      </nuxt-link>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "loginlayout"
});
import { useUserStore } from '~/stores/user';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const user = useUserStore()
const email = ref('');
const password = ref('');
const router = useRouter();
const login = async () => {
  try {
    await user.login(email.value, password.value);
    router.push('/'); 
  } catch (error) {
    console.error('Error logging in:', error);
  }
};
</script>
