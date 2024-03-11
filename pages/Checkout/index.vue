<template>
  <div class="relative mx-auto w-full bg-white">
    <div class="grid min-h-screen grid-cols-10">
      <div class="col-span-full py-6 px-4 sm:py-12 lg:col-span-6 lg:py-24">
        <div class="mx-auto w-full max-w-lg">
          <h1 class="relative text-2xl font-['kanit'] text-gray-700 sm:text-3xl">ยืนยันสินค้า<span
              class="mt-2 block h-1 w-10 bg-teal-600 sm:w-20"></span></h1>

          <div class="mt-10 flex flex-col space-y-4">
            <div>
              <label class="text-lg font-['kanit'] text-gray-500">ชื่อบนบัตร</label>
              <input id="name" name="name" placeholder="ชื่อบนบัตร" v-model="card.name"
                class="block w-full rounded font-['kanit'] border-gray-300 bg-gray-50 py-3 px-4 pr-10 text-base text-gray-500 placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-gray-300 " />
            </div>
            <div>
              <label for="card" class="text-lg font-['kanit'] text-gray-500">เลขบัตรเครดิต/เดบิต</label>
              <input id="card" name="card" placeholder="1234567890123456" v-model="card.number" maxlength="16"
                class="block w-full rounded font-['kanit'] border-gray-300 bg-gray-50 py-3 px-4 pr-10 text-base text-gray-500 placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-gray-300 " />
            </div>

            <div>
              <p class="text-lg font-['kanit']  text-gray-500">วันหมดอายุ</p>
              <div class="mr-6 flex flex-wrap">
                <div class="my-1">
                  <label for="month" class="sr-only">Select expiration month</label>
                  <select v-model="card.expirationMonth" name="month" id="month"
                    class="cursor-pointer rounded border-gray-300 bg-gray-50 py-3 px-2 text-sm font-['kanit'] shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500">
                    <option value="" selected disabled>เดือน</option>
                    <option v-for="i in 12" :key=i :value=i>{{ i }}</option>
                  </select>
                </div>
                <div class="my-1 ml-3 mr-6">
                  <label for="year" class="sr-only">Select expiration year</label>
                  <select v-model="card.expirationYear" name="year" id="year"
                    class="cursor-pointer rounded border-gray-300 bg-gray-50 py-3 px-2 text-sm font-['kanit'] shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500">
                    <option value="" selected disabled>ปี</option>
                    <option v-for="i in 30" :key=i :value="currentYear + i">{{ currentYear + i }}</option>
                  </select>
                </div>
                <div class="relative my-1">
                  <label for="security-code" class="sr-only">CVC</label>
                  <input v-model="card.cvc" type="text" id="security-code" name="security-code" maxlength="3"
                    placeholder="CVC"
                    class="block w-36 rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm font-['kanit'] placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500" />
                </div>
              </div>
            </div>
            <div class="relative">

              <label for="address" class="text-lg font-['kanit'] text-gray-500 mt-5">ที่อยู่</label>
              <textarea id="address" name="address" placeholder="ที่อยู่" v-model="order.address"
                class="block w-full rounded font-['kanit'] border-gray-300 bg-gray-50 py-3 px-4 pr-10 text-base text-gray-500 placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-gray-300" />
            </div>
          </div>

          <div class="pt-5" v-for="shipping in shippingMethod.option" :key="shipping.name">
            <div class="relative">
              <input class="peer hidden" :id="shipping.name" type="radio" name="radio" :value="shipping"
                :checked="shipping.checked" v-model="selectedShippingMethod" />
              <span
                class="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
              <label
                class="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                :for="shipping.name">

                <div class="ml-5">
                  <span class="mt-2 font-['kanit']">{{ shipping.name }} ({{ shipping.duraion }})</span>
                  <p class="text-slate-500 font-['kanit'] text-sm leading-6"> {{ shipping.cost }} บาท</p>
                  <!-- <p class="text-slate-500 font-['kanit'] text-sm leading-6"></p> -->
                </div>
              </label>
            </div>

          </div>

          <button @click="submitOrder()"
            class="mt-4 inline-flex w-full items-center justify-center rounded bg-[#2c52b3] py-2.5 px-4 text-base font-semibold font-['kanit'] tracking-wide text-white text-opacity-80 outline-none ring-offset-2 transition hover:text-opacity-100 focus:ring-2 focus:ring-teal-500 sm:text-lg">ยืนยันการสั่งซื้อ</button>
        </div>
      </div>
      <div class="relative col-span-full flex flex-col py-6 pl-8 pr-4 sm:py-12 lg:col-span-4 lg:py-24">

        <div>
          <img src="@/assets/image/Logo.png" alt="" class="absolute inset-0 h-full w-full object-cover" />
          <div class="absolute inset-0 h-full w-full bg-gradient-to-t from-[#2c52b3] to-[#4370e4] opacity-95"></div>
        </div>
        <div class="relative">
          <div class="bg-transparent rounded-lg overflow-hidden bg-white border-4 border-orange-200 max-w-sm relative m-5"
            v-for="item in cartStore.cart" :key="item.name">
            <!-- รอ Product Cart -->
            <div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 ">
              <img v-if="item.images" class="h-full w-full object-cover object-center" :src="item.images[0]"
                alt="Product Image">
              <img v-else class="h-full w-full object-cover object-center" src="@/assets/image/placeholder.jpg"
                alt="Product Image">
            </div>
            <div class="ml-4 bg-white flex flex-1 flex-col ">
              <div>
                <div class="flex justify-between text-base font-['kanit'] text-gray-900">
                  <h3 class="font-['kanit']">
                    <a>{{ item.name }}</a>
                  </h3>
                  <p class="ml-4 font-['kanit']">{{ item.price }} บาท</p>
                </div>
              </div>
              <div class="flex flex-1 items-end justify-between text-sm">
                <p class="font-['kanit'] text-gray-500">จำนวน {{ item.quantity }} x {{ item.price }} =
                  {{ item.quantity * item.price }} บาท</p>

              </div>
            </div>
          </div>
          <div class="my-5 h-0.5 w-full bg-white bg-opacity-30"></div>
          <div class="space-y-2">
            <p class="flex justify-between text-lg font-['kanit'] text-white"><span>ราคารวม:</span><span>{{
                cartStore.totalPrice }}+{{ selectedShippingMethod.cost }} = {{ (cartStore.totalPrice +
                selectedShippingMethod.cost).toFixed(2) }} </span></p>
          </div>
        </div>
        <div class="relative mt-10 text-white">
          <!-- {{ order }} -->
          <!-- {{ currentYear }} -->
          <!-- <h3 class="mb-5 text-lg font-bold">HERERERERERE {{ address }} {{ selectedShippingMethod }}</h3>
          <p class="text-sm font-semibold">+01 653 235 211 <span class="font-light">(International)</span></p>
          <p class="mt-1 text-sm font-semibold">support@nanohair.com <span class="font-light">(Email)</span></p>
          <p class="mt-2 text-xs font-medium">Call us now for payment related issues</p>
        </div>
        <div class="relative mt-10 flex">
          <p class="flex flex-col"><span class="text-sm font-bold text-white">Money Back Guarantee</span><span
              class="text-xs font-medium text-white">within 30 days of purchase</span></p> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '@/stores/cart'
import { ref } from 'vue';
import { useUserStore } from '@/stores/user';
const { $api } = useNuxtApp()
const currentYear = new Date().getFullYear() - 1
const userStore = useUserStore()
const shippingMethod = {
  id: "shippingId",
  name: "shippingMethod",
  option: [
    {
      name: "ปกติ",
      duraion: "3-4 วัน",
      cost: 45,
      checked: true
    },
    {
      name: "ด่วนพิเศษ",
      duraion: "1-2 วัน",
      cost: 75,
      checked: false
    }
  ]
}
const selectedShippingMethod = ref({
  name: "ปกติ",
  duraion: "3-4 วัน",
  cost: 45,
  checked: true
})

const card = ref({
  name: userStore.user.name, number: "4242424242424242", expirationMonth: "", expirationYear: "", cvc: ""
})

const cartStore = useCartStore()
const config = useRuntimeConfig()
const order = ref({
  email: userStore.user.email,
  cart: cartStore.cart,
  totalPrice: cartStore.totalPrice + selectedShippingMethod.value.cost,
  shippingMethod: selectedShippingMethod.value.name,
  address: userStore.user.address,
  token: ""
})
const submitOrder = async () => {
  const token = useCookie("token");
  // const { data: res, error: error } = await useFetch(`${config.public.baseURL}/gunpla`, {
  //   method: "GET",
  // },)
  // const newCard = { name: card.value.name, "number": card.value.number, "expirationMonth": card.value.expirationMonth, "expirationYear": card.value.expirationYear, "cvc": card.value.cvc }
  // console.log(newCard)
  try {
    const res = await $api(`/order/createPaymentToken`, {
      headers: {
        "Content-Type": 'application/json',
        "Authorization": "bearer " + token.value
      },
      method: 'POST',
      body: card.value
    })
    console.log(res)
    order.value.token = res
    await $api('/order/addOrder', {
      headers: {
        "Content-Type": 'application/json',
        "Authorization": "bearer " + token.value
      },
      method: "POST",
      body: order.value
    })
    alert("ทำรายการสำเร็จ")
    cartStore.clearCart()
    navigateTo("/")

  }
  catch (error) {
    alert(error)
  }
  // const { data: res, error: error } = await useLazyFetch(`${config.public.baseURL}/order/createPaymentToken`, {
  //   method: "POST",
  //   body: card
  // },)
  // const { data: post, refresh } = await useAsyncData('post', () => $fetch(`${config.public.baseURL}/order/createPaymentToken`) )
}

// const submitOrder = async () => {
//   try {
//     const response = await fetch(`${config.public.baseURL}/order/createPaymentToken`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify(card.value) // Sending the card object as JSON
//     });

//     if (!response.ok) {
//       throw new Error('Failed to create payment token');
//     }

//     console.log(response);
//     const responseData = await response.json();
//     console.log(responseData);
//   } catch (error) {
//     console.error('Error creating payment token:', error);
//   }
// }
</script>
