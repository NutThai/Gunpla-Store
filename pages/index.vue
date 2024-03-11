<template>
  <div data-aos="fade-right" data-aos-delay="150"
    class="bg-[url('https://en.gundam.info/content/mgka/narrative/images/05research/point02obj.png')] h-full w-full bg-contain bg-no-repeat bg-left-top fixed z-[-99]">
  </div>
  <CarouselBanner />
  <!-- <div class="">
    <div data-aos="fade-up" data-aos-delay="100">
      <Carousel :settings="settings" :breakpoints="breakpoints">
        <Slide v-for="(image, index) in images" :key="index" class="transition duration-300 ease-in-out hover:scale-110 ">
          <NuxtLink :to="`category/products`">
            <img class="aspect-['2/2'] w-[150px] h-[150px] object-contain mix-blend-color-burn"
              :src="`/${image.image}.png`" alt="Image" />

          </NuxtLink>

        </Slide>
        <template #addons>
          <Navigation />
        </template>
</Carousel>
</div>
</div> -->
  <Carousel :settings="settings" :breakpoints="breakpoints">
    <Slide v-for="(item, index) in productStore.products" :key="index"
      class="transition duration-300 ease-in-out hover:scale-110">
      <div class="bg-transparent rounded-lg overflow-hidden border-4 border-orange-200 max-w-sm relative m-5"
        v-if="index !== productStore.products.length - 1">
        <!-- Render content for non-last items -->
        <Nuxt-link :to="`/product/${item.productId}`">
          <div class="background-gold text-center text-gray-900 font-bold font-['kanit']">{{ item.name }}</div>
          <div class="relative">
            <img v-if="item.images" class="object-cover object-center w-60 h-72 bottom-0" :src="item.images[0]"
              alt="Product Image">
            <img v-else class="object-cover object-center w-60 h-72 bottom-0" src="@/assets/image/placeholder.jpg"
              alt="Product Image">
            <div class="absolute flex justify-between left-0 p-1 bg-black bg-opacity-50 text-white bottom-6 w-full">
              <span class="font-bold font-['kanit'] text-lg">{{ item.price }} บาท</span>
            </div>
          </div>
        </Nuxt-link>
        <div class="p-2 bg-black bg-opacity-25 text-white">
          <!-- Render buttons for non-last items -->
          <div class="flex-col flex">
            <button
              class="w-2/3 bg-sky-900 hover:bg-sky-950 text-white font-bold font-['kanit'] py-2 px-4 absolute bottom-0 left-0 border-cyan-500 border-2 rounded-tr-lg">
              สั่งทันที
            </button>
            <button @click="cartStore.addProduct(item)"
              class="w-1/3 bg-sky-900 hover:bg-sky-950 text-white font-bold py-2 px-4 absolute bottom-0 right-0 border-cyan-500 border-2 rounded-tl-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.8-3H7.4M11 7H6.3M17 4v6m-3-3h6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <!-- Show View All after the last index -->
      <div v-else
        class="bg-transparent rounded-lg overflow-hidden border-4 border-orange-200 max-w-sm relative m-5 py-2 flex flex-col justify-center items-center">
        <!-- Render empty card for the last item with invisible content -->
        <NuxtLink :to="'/all-products'">
          <div class="background-gold text-center text-gray-900 font-bold font-['kanit'] opacity-0">0</div>
          <div class="relative w-60 h-72 bottom-6 left-0 p-1 flex justify-center items-center">
            <span
              class="psw-media-frame psw-fill-x psw-b-1 psw-r-2 psw-c-b-support psw-c-t-accent psw-c-t-interactive-1 psw-aspect-1-1">
              <span class="font-['kanit']">View All</span>
            </span>
          </div>
        </NuxtLink>

      </div>

    </Slide>

    <template #addons>
      <Navigation />
    </template>
  </Carousel>
  <div class="flex items-center justify-center md:mb-5 ">
    <div
      class="relative flex w-full max-w-[64rem] flex-row rounded-xl bg-white bg-clip-border text-gray-700 shadow-md ">
      <div
        class="relative m-0 w-2/5 shrink-0 overflow-hidden rounded-xl rounded-r-none bg-white bg-clip-border text-gray-700 ">
        <img src="https://en.gundam.info/content/mgka/narrative/images/05research/point01obj.png" alt="image"
          class="h-full w-full object-contain" />
      </div>
      <div class="px-6 ">

        <h6
          class="my-3 block font-sans text-base font-semibold uppercase leading-relaxed tracking-normal text-pink-500 antialiased">
          MESSAGE from Hajime Katoki
        </h6>
        <p class="mb-2 block font-sans text-base font-normal leading-relaxed text-gray-700 antialiased">
          The Narrative Gundam was originally developed as a machine to test Psycho-Frames. It was refurbished and
          deployed by Luio & Co. during Operation Phoenix Hunt. The C-Packs was a loadout hastily put together and was
          not
          part of its original plan. Jona took off on the Narrative Gundam equipped with the C-Packs to stop the II Neo
          Zeong that was going out of control at the Helium-3 Storage Base within Side 6, and engaged in combat
          alongside
          the Phenex.
        </p>
        <div class=" flex justify-end">
          <button
            class="flex select-none justify-end mb-3 gap-2 rounded-lg py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-pink-500 transition-all hover:bg-pink-500/10 active:bg-pink-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button">
            View Product
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
              stroke="currentColor" aria-hidden="true" class="h-4 w-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Carousel, Navigation, Slide } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'
import { useCartStore } from '~/stores/cart'
import { useProductStore } from '~/stores/product'
const productStore = useProductStore()
const cartStore = useCartStore()
// const filteredProduct = productStore.products.filter((item) => {
//   if (item.hasOwnProperty('grade')) {
//     return item.grade.split('(')[0].trim().replace(" ", "-").toLocaleLowerCase() == 'high-grade'
//   }
// })
// console.log(filteredProduct.length)
// const images = ref([{
//   "name": "high-grade",
//   "image": "hg"
// },
// {
//   "name": "real-grade",
//   "image": "rg"
// },
// {
//   "name": "master-grade",
//   "image": "mg"
// },
// {
//   "name": "master-grade-sd",
//   "image": "mgsd"
// },
// {
//   "name": "full-mechanic",
//   "image": "fm"
// },
// {
//   "name": "sd",
//   "image": "sdex"
// },
// {
//   "name": "perfect-grade",
//   "image": "pg2"
// },
// {
//   "name": "meatal-build",
//   "image": "mb"
// },
// {
//   "name": "metal-structure",
//   "image": "metalstructure"
// },
// {
//   "name": "mega-size",
//   "image": "mega"
// }
// ]);
const settings = ref({
  itemsToShow: 1,
  snapAlign: 'center',
});

const breakpoints = ref({
  // carousel settings for different screen sizes
  // breakpoints are mobile first
  // any settings not specified will fallback to the carousel settings
  // 700px and up
  700: {
    itemsToShow: 3.5,
    snapAlign: 'center',
  },
  // 1024 and up
  1024: {
    itemsToShow: 5,
    snapAlign: 'start',
  },
});
</script>