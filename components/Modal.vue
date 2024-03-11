<template>
  <div class="modal-overlay" @click="$emit('close-modal')">
    <div class="modal" @click.stop>
      <form @submit.prevent="updateProduct">

        <div class="m-4 flex flex-col space-y-2">
          <div>
            <label class="text-lg font-['kanit'] text-gray-500">ชื่อสินค้า</label>
            <input id="name" name="name" placeholder="Gundum RX78" v-model="newProduct.name"
              class="block w-full rounded font-['kanit'] border-gray-300 bg-gray-50 py-3 px-4 pr-10 text-base text-gray-500 placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-gray-300" />
          </div>
          <div class="relative">
            <label for="description" class="text-lg font-['kanit'] text-gray-500 mt-5">รายละเอียดสินค้า</label>
            <textarea id="description" name="description" placeholder="รายละเอียดสินค้า"
              v-model="newProduct.description"
              class="block w-full rounded font-['kanit'] border-gray-300 bg-gray-50 py-3 px-4 pr-10 text-base text-gray-500 placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-gray-300" />
          </div>
          <div>
            <label for="type" class="text-lg font-['kanit'] text-gray-500">ประเภท</label>
            <select v-model="newProduct.type" name="type" id="type"
              class="block w-full rounded font-['kanit'] border-gray-300 bg-gray-50 py-3 px-4 pr-10 text-base text-gray-500 placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-gray-300 ">
              <option value="" selected disabled>ประเภท</option>
              <option value="Gunpla">กันพลา</option>
              <option value="Tool">เครื่องมือ</option>
            </select>
          </div>
          <div v-if="newProduct.type == 'Gunpla'" class="mr-6 flex flex-wrap">
            <div class="mr-5">
              <label for="price" class="text-lg font-['kanit'] text-gray-500">ซีรี่ย์</label>
              <select v-model="newProduct.series" name="type" id="type"
                class="block w-full rounded font-['kanit'] border-gray-300 bg-gray-50 py-3 px-4 pr-10 text-base text-gray-500 placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-gray-300 ">
                <option value="" selected disabled>ซีรี่ย์</option>
                <option v-for="item in series.options" :key="item.value" :value="item.value">
                  {{ item.value }}</option>
              </select>
            </div>
            <div class="mr-5">
              <label for="stock" class="text-lg font-['kanit'] text-gray-500">เกรด</label>
              <select v-model="newProduct.grade" name="type" id="type"
                class="block w-full rounded font-['kanit'] border-gray-300 bg-gray-50 py-3 px-4 pr-10 text-base text-gray-500 placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-gray-300 ">
                <option value="" selected disabled>เกรด</option>
                <option v-for="item in grade.options" :key="item.value" :value="item.value">
                  {{ item.value }}</option>
              </select>
            </div>
            <div class="mr-5">
              <label for="price" class="text-lg font-['kanit'] text-gray-500">ขนาด</label>
              <select v-model="newProduct.scale" name="type" id="type"
                class="block w-full rounded font-['kanit'] border-gray-300 bg-gray-50 py-3 px-4 pr-10 text-base text-gray-500 placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-gray-300 ">
                <option value="" selected disabled>ขนาด</option>
                <option v-for="item in scale.options" :key="item.value" :value="item.value">
                  {{ item.value }}</option>
              </select>
            </div>
          </div>
          <div class=" flex flex-wrap">
            <div class="mr-5">
              <label for="price" class="text-lg font-['kanit'] text-gray-500">ยี่ห้อ</label>
              <input id="price" name="price" type="text" placeholder="Bandai" v-model="newProduct.brand"
                class="block w-64 rounded font-['kanit'] border-gray-300 bg-gray-50 py-3 px-4 pr-10 text-base text-gray-500 placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-gray-300 " />
            </div>
            <div class="mr-5">
              <label for="price" class="text-lg font-['kanit'] text-gray-500">ราคา</label>
              <input id="price" name="price" type="number" placeholder="100" v-model="newProduct.price"
                class="block w-32 rounded font-['kanit'] border-gray-300 bg-gray-50 py-3 px-4 pr-10 text-base text-gray-500 placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-gray-300 " />
            </div>
            <div class="mr-5">
              <label for="stock" class="text-lg font-['kanit'] text-gray-500">จำนวน</label>
              <input id="stock" name="stock" type="number" placeholder="25" v-model="newProduct.stock"
                class="block w-32 rounded font-['kanit'] border-gray-300 bg-gray-50 py-3 px-4 pr-10 text-base text-gray-500 placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-gray-300 " />
            </div>
            <div class="mr-5">
              <label for="images" class="text-lg font-['kanit'] text-gray-500">เพิ่มรูปภาพ</label>
              <input id="images" name="images" type="file" accept="image/*" multiple @change="onFileChange"
                class="block w-full rounded font-['kanit'] border-gray-300 bg-gray-50 py-3 px-4 pr-10 text-base text-gray-500 placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-gray-300" />
            </div>
          </div>

          <div class="mr-5">
            <button @click="updateProduct(), $emit('close-modal')"
              class="mt-4 inline-flex w-full items-center justify-center rounded bg-[#2c52b3] py-2.5 px-4 text-base font-semibold font-['kanit'] tracking-wide text-white text-opacity-80 outline-none ring-offset-2 transition hover:text-opacity-100 focus:ring-2 focus:ring-teal-500 sm:text-lg">อัปเดตสินค้า</button>
          </div>
        </div>

      </form>

    </div>
  </div>
</template>


<script setup>
import { defineProps } from 'vue';
import { useProductStore } from '@/stores/product';
import { useUserStore } from '@/stores/user';
const { $api } = useNuxtApp()
const config = useRuntimeConfig()
const userStore = useUserStore()
const productStore = useProductStore()
const props = defineProps({
  product: {
    type: Object,
    required: true,
  }
});
const newProduct = ref({
  productId: props.product.productId,
  name: props.product.name,
  description: props.product.description,
  type: props.product.type,
  brand: props.product.brand,
  series: props.product.series,
  scale: props.product.scale,
  grade: props.product.grade,
  price: props.product.price,
  stock: props.product.stock,
  images: []
})

var formData = new FormData();
const onFileChange = (event) => {
  formData = new FormData();
  // console.log(event.target.files)
  const files = event.target.files;
  for (let i = 0; i < files.length; i++) {
    formData.append('files', files[i]);
  }
}
const updateProduct = async () => {
  try {
    const res = await $fetch(`${config.public.baseURL}/s3/upload-image`, {
      body: formData,
      header: {
        'Content-Type': 'multipart/form-data'
      },
      method: "POST"
    })
    newProduct.value.images = res.imageUrls
    if (newProduct.value.type == "Gunpla") {
      console.log("ทำงาน1")
      await $api("/gunpla/updateGunpla", {
        body: newProduct.value,
        method: "PUT"
      }).then(res => console.log(res)).catch(err => console.log(err))
    }
    else if (newProduct.value.type == "Tool") {
      await $api("/tool/updateTool", {
        body: newProduct.value,
        method: "PUT"
      }).then(res => console.log(res)).catch(err => console.log(err))
    }
    formData = new FormData();
    const imagesInput = document.getElementById('images');
    if (imagesInput) {
      imagesInput.value = null;
    } else {
      console.log("Element with id 'images' not found.");
    }
    productStore.fetchProducts()
  }
  catch (err) {
    alert((err))
  }


}
const series = {
  id: 'seriesId',
  name: 'Series',
  options: [

    { value: 'Universal Century', checked: false },
    { value: 'Future Century', checked: false },
    { value: 'After Colony', checked: false },
    { value: 'After War', checked: false },
    { value: 'Correct Century', checked: false },
    { value: 'Cosmic Era', checked: false },
    { value: 'Anno Domini', checked: false },
    { value: 'Advanced Generation', checked: false },
    { value: 'Regild Century', checked: false },
    { value: 'Post Disaster', checked: false },
    { value: 'Ad Stella', checked: false },
    { value: 'Present', checked: false },
  ]
}

const grade = {
  id: 'gradeId',
  name: 'Grade',
  options: [
    { value: 'SD Super Deformed', checked: false },
    { value: 'Entry Grade', checked: false },
    { value: 'High Grade', checked: false },
    { value: 'Real Grade', checked: false },
    { value: 'Master Grade', checked: false },
    { value: 'Full Mechanic', checked: false },
    { value: 'Perfect Grade', checked: false },
    { value: 'Metal Build', checked: false },
    { value: 'Mega Size', checked: false },
  ],
}
const scale =
{
  id: 'scaleId',
  name: 'Scale',
  options: [

    { value: '1/144', checked: false },
    { value: '1/100', checked: false },
    { value: '1/60', checked: false },
    { value: '1/48', checked: false },
  ],
}

</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  background-color: #000000da;
}

.modal {
  text-align: center;
  background-color: white;
  height: 650px;
  width: 700px;
  margin-top: 10%;
  padding: 40px 0;
  border-radius: 20px;
}

.close {
  margin: 10% 0 0 16px;
  cursor: pointer;
}

.close-img {
  width: 25px;
}

.check {
  width: 150px;
}

h6 {
  font-weight: 500;
  font-size: 28px;
  margin: 20px 0;
}

p {
  font-size: 16px;
  margin: 20px 0;
}

button {
  background-color: #ac003e;
  width: 150px;
  height: 40px;
  color: white;
  font-size: 14px;
  border-radius: 16px;

}
</style>
