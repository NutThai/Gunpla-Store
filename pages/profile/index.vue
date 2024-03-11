<template>
  <div class="container min-h-screen mx-auto mt-5">
    <!-- Header Section -->
    <div class="bg-gray-800 text-white p-4 rounded-md flex justify-between">
      <h1 class="text-2xl font-kanit font-bold">User Profile</h1>
      <a href="#" @click="isEditing = !isEditing">
        <PencilSquareIcon class="h-6 w-6" aria-hidden="true" />
      </a>
    </div>

    <!-- Profile Information Section -->
    <div class="flex flex-col md:flex-row mt-8 p-4 bg-white shadow-md rounded-md ">
      <div class="flex flex-col items-center justify-center md:w-1/4">
        <a href="#">
          <!-- <img v-if="user.image"
            class="border-2 border-gray-500 rounded-full hover:border-teal-500 hover:border-4 transition duration-300 ease-in-out"
            :src="user.image" alt="Profile Picture" @click="isImageEditing = !isImageEditing, isUploadImage = 0"> -->
          <img 
            class="border-2 border-gray-500 rounded-full hover:border-teal-500 hover:border-4 transition duration-300 ease-in-out"
            src="@/assets/image/mascot.png" alt="Profile Picture" @click="isImageEditing = !isImageEditing, isUploadImage = 0">
        </a>
        <input v-if="isImageEditing" id="images" name="images" type="file" accept="image/*" @change="onFileChange"
          class="block w-full rounded font-kanit border-gray-300 bg-gray-50 py-3 px-4 pr-10 text-base text-gray-500 placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-gray-300 mt-4 md:mt-0" />
        <button v-if="isUploadImage" @click="saveImage()"
          class="mt-4 inline-flex w-fit items-center justify-center rounded bg-[#2c52b3] py-2.5 px-4 text-base font-semibold font-['kanit'] tracking-wide text-white text-opacity-80 outline-none ring-offset-2 transition hover:text-opacity-100 focus:ring-2 focus:ring-teal-500 sm:text-lg">บันทึกรูปภาพ</button>
      </div>

      <!-- Additional Information -->
      <div class="flex flex-col md:w-3/4 md:ml-10 ">
        <label for="email" class="text-lg font-kanit text-gray-700">อีเมล</label>
        <input disabled="" id="email" name="email" placeholder="" v-model="user.email"
          class="block mb-4 w-full pointer-events-none opacity-50 rounded font-kanit border-gray-300 bg-gray-150 py-3 px-4 pr-10 text-base text-gray-700 placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-gray-300 " />
        <label for="name" class="text-lg font-kanit text-gray-700">ชื่อ-นามสกุล</label>
        <input :disabled="!isEditing" id="name" name="name" placeholder="" v-model="user.name"
          :class="{ 'pointer-events-none opacity-50': !isEditing }"
          class="block mb-4 w-full rounded font-kanit border-gray-300 bg-gray-150 py-3 px-4 pr-10 text-base text-gray-700 placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-gray-300 " />
        <label for="address" class="text-lg font-kanit text-gray-700">ที่อยู่</label>
        <textarea :disabled="!isEditing" id="address" name="address" placeholder="" v-model="user.address"
          :class="{ 'pointer-events-none opacity-50': !isEditing }"
          class="block mb-4 w-full rounded font-kanit border-gray-300 bg-gray-150 py-3 px-4 pr-10 text-base text-gray-500 placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-gray-300 " />
        <!-- Add more profile information here -->
        <button v-if="isEditing" @click="saveEdit()"
          class="mt-4 inline-flex w-fit items-center justify-center rounded bg-[#2c52b3] py-2.5 px-4 text-base font-semibold font-['kanit'] tracking-wide text-white text-opacity-80 outline-none ring-offset-2 transition hover:text-opacity-100 focus:ring-2 focus:ring-teal-500 sm:text-lg">บันทึกการเปลี่ยนแปลง</button>

      </div>
    </div>
  </div>
</template>


<script setup>
import { PencilSquareIcon } from '@heroicons/vue/24/outline'
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()
const user = ref({
  image: "../../assets/image/mascot.png",
  email: "nutthai1771@gmail.com",
  name: "",
  address: ""
})
const isImageEditing = ref(0)
const isUploadImage = ref(0)
const isEditing = ref(0)
const saveEdit = async () => {
  try {
    await $api('/user/updateUser', { method: "PUT", body: user.value })
  }
  catch (error) {
    alert(error)
  }
}
const saveImage = async () => {
  try {
    await $api('/user/updateUser', { method: "PUT", body: user.value })
    isImageEditing.value = 0
    isUploadImage.value = 0
  }
  catch (error) {
    alert(error)
  }
}
var formData = new FormData();
const onFileChange = (event) => {
  formData = new FormData();
  // console.log(event.target.files)
  const files = event.target.files[0];
  formData.append('files', files);

  isUploadImage.value = !isUploadImage.value
}
</script>