<template>
    <div v-if="product" class="bg-white">
        <div class="bg-white">
            <div class="pt-6">
                <!-- Image gallery -->
                <div class="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
                    <div v-if="product.images">
                        <Carousel id="gallery" :items-to-show="1" :wrap-around="false" v-model="currentSlide">
                            <Slide v-for="(image, index) in product.images" :key="index">
                                <img :src=image alt="product" class="h-full w-full object-cover object-center" />
                            </Slide>
                        </Carousel>
                        <Carousel id="thumbnails" :items-to-show="3" :wrap-around="true" v-model="currentSlide"
                            ref="carousel">
                            <Slide v-for="(image, index) in product.images" :key="index">
                                <img :src=image alt="product" class="h-full w-full object-cover object-center "
                                    @click="slideTo(index)" />
                            </Slide>
                        </Carousel>
                    </div>
                    <div v-else>
                        <img src='@/assets/image/placeholder.jpg' alt="product" class="h-full w-full object-cover object-center" />
                    </div>

                    <!-- Product info Gunpla-->
                    <div
                        class="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:flex-row lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16 lg:border-l lg:border-gray-200">
                        <div>
                            <div class="lg:col-span-2  lg:pl-8">
                                <h1 class="font-['kanit'] text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                                    {{
        product.name }}</h1>
                            </div>

                            <!-- Options -->
                            <div class="mt-4 lg:row-span-3 lg:mt-0 ">
                                <h2 class="sr-only">Product information</h2>
                                <p class="font-['kanit'] text-3xl tracking-tight text-gray-900 lg:pl-8 pt-2">{{
        product.price }}
                                    บาท
                                </p>
                                <p class="font-['kanit'] text-2xl tracking-tight text-gray-500 lg:pl-8 ">คงเหลือ {{
        product.stock }} ea
                                </p>
                                <div class="py-10 lg:col-span-2 lg:col-start-1  lg:pb-16 lg:pl-8 lg:pt-6">
                                    <!-- Description and details -->
                                    <div>
                                        <h3 class="sr-only">Description</h3>
                                        <div class="space-y-6">
                                            <p class="text-base font-['kanit'] text-gray-900">{{ product.description }}
                                            </p>
                                        </div>
                                    </div>
                                    <div class="mt-10">
                                        <h3 class="text-sm font-['kanit'] text-gray-900">รายละเอียดสินค้า</h3>

                                        <div class="mt-4">
                                            <ul v-if="product.type == 'Gunpla'" role="list"
                                                class="list-disc space-y-2 pl-4 text-sm">
                                                <li class="font-['kanit'] text-gray-900"><span
                                                        class="font-['kanit'] text-gray-900">ยี่ห้อ: {{ product.brand
                                                        }}</span></li>

                                                <li class="font-['kanit'] text-gray-900"><span
                                                        class="font-['kanit'] text-gray-900">ขนาด: {{ product.scale
                                                        }}</span></li>
                                                <li class="font-['kanit'] text-gray-900"><span
                                                        class="font-['kanit'] text-gray-900">เกรด: {{ product.grade
                                                        }}</span></li>
                                            </ul>
                                            <ul v-if="product.type == 'Tool'" role="list"
                                                class="list-disc space-y-2 pl-4 text-sm">
                                                <li class="font-['kanit'] text-gray-900"><span
                                                        class="font-['kanit'] text-gray-900">ยี่ห้อ: {{ product.brand
                                                        }}</span></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <!-- <div class="flex items-center">
                            <span class="font-['kanit'] text-gray-900 pr-4">จำนวน: </span>
                            <button @click="decrementQuantity()"
                                class="bg-gray-300 text-gray-600 font-bold py-2 px-4 rounded-l">-</button>
                            <input type="text" v-model="quantity"
                                class="text-center w-16 bg-gray-100 text-gray-800 py-2 px-4" @input="validateNumber()" />
                            <button @click="incrementQuantity()"
                                class="bg-gray-300 text-gray-600 font-bold py-2 px-4 rounded-r">+</button>
                        </div> -->
                        <button @click="cartStore.addProduct(product)"
                            class="font-['kanit'] mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                            เพิ่มลงตะกร้า</button>
                    </div>

                </div>



            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { StarIcon } from '@heroicons/vue/20/solid'
import { RadioGroup, RadioGroupLabel, RadioGroupOption } from '@headlessui/vue'
import { Carousel, Slide } from 'vue3-carousel'
import { useProductStore } from '@/stores/product'
import { useCartStore } from '@/stores/cart'
import 'vue3-carousel/dist/carousel.css'
const route = useRoute()
const productStore = useProductStore()
const cartStore = useCartStore()

var product = ref(null)
setTimeout(() => {
    findProduct();
}, 500);
const findProduct = () => {
    console.log('Product Store Data:', productStore.products)
    console.log('Route Product ID:', route.params.productId)

    const foundProduct = productStore.products.find((item) => item.productId == route.params.productId)
    console.log('Found Product:', foundProduct)

    product.value = foundProduct
}
const currentSlide = ref(0)
// const quantity = ref(1)
// function decrementQuantity() {
//     if (this.quantity > 1) {
//         this.quantity--;
//     }
// }
// function incrementQuantity() {
//     if (this.quantity < product.stock) {
//         this.quantity++;
//     }

// }
function slideTo(val) {
    this.currentSlide = val
}
function validateNumber() {
    if (this.quantity > product.stock) {
        this.quantity = product.stock
    }
    else if (this.quantity < 0) {
        this.quantity = 0
    }
}
</script>