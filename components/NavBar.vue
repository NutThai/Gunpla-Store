<template>
  <Disclosure as="nav" class="bg-gray-800 sticky top-0 z-[100]" v-slot="{ open }">
    <div class="mx-auto  px-2 sm:px-6 lg:px-8">
      <div class="relative flex h-16 items-center justify-between">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <!-- Mobile menu button-->
          <DisclosureButton
            class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
            <span class="absolute -inset-0.5" />
            <span class="sr-only">Open main menu</span>
            <Bars3Icon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
            <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
          </DisclosureButton>
        </div>
        <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
          <NuxtLink to="/">
            <div class="flex flex-shrink-0 items-center">
              <img class="h-10 w-auto" src="@/assets/image/Logo.png" alt="Gunpla Store Logo" />
            </div>
          </NuxtLink>
          <div class="hidden sm:ml-6 sm:block">
            <div class="flex space-x-4">
              <NuxtLink v-for="item in navigation" :key="item.name" :to="item.linkTo"
                :class="[item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'block rounded-md px-3 py-2 text-base', 'font-kanit']">
                {{ item.name }}</NuxtLink>
            </div>
          </div>
        </div>
        <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

          <button v-if="route.path !== '/checkout'" type="button" @click="handleCart"
            class="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
            <span class="absolute -inset-1.5" />
            <span class="sr-only">View notifications</span>
            <ShoppingCartIcon class="h-6 w-6" aria-hidden="true" />
          </button>
          <!-- Profile dropdown -->
          <Menu as="div" class="relative ml-3">
            <div>
              <MenuButton
                class="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                <span class="absolute -inset-1.5" />
                <span class="sr-only">Open user menu</span>
                <img v-if="userStore.user.image" class="h-8 w-8 rounded-full" :src="userStore.user.image"
                  alt="user image" />
                <img v-else class="h-8 w-8 rounded-full" src="@/assets/image/profileImage.png" alt="placeholder" />
              </MenuButton>
            </div>
            <transition enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95">
              <MenuItems
                class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div v-if='userStore.isAuthenticated'>
                  <MenuItem v-slot="{ active }">
                  <Nuxt-link to="/profile">
                    <a href="#"
                      :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700', 'font-kanit']">โปรไฟล์</a>

                  </Nuxt-link>
                  </MenuItem>
                  <MenuItem v-slot="{ active }">
                  <Nuxt-link to="/order-history">
                    <a href="#"
                      :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700', 'font-kanit']">ประวัติการสั่งซื้อ</a>
                  </Nuxt-link>
                  </MenuItem>
                  <MenuItem v-slot="{ active }">
                  <a @click="userStore.signout(); navigateTo('/Login')" href="#"
                    :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700', 'font-kanit']">ออกจากระบบ</a>
                  </MenuItem>
                </div>
                <div v-else>
                  <MenuItem v-slot="{ active }">
                  <Nuxt-link to="/login">
                    <a href="#"
                      :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700', 'font-kanit']">เข้าสู่ระบบ</a>

                  </Nuxt-link>
                  </MenuItem>
                </div>
              </MenuItems>

            </transition>
          </Menu>
        </div>
      </div>
    </div>

    <DisclosurePanel class="sm:hidden">
      <div class="space-y-1 px-2 pb-3 pt-2">
        <DisclosureButton v-for="item in navigation" :key="item.name" as="a" :href="item.href"
          :class="[item.current ? 'bg-gray-900 text-white font-kanit' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'block rounded-md px-3 py-2 text-base font-kanit']"
          :aria-current="item.current ? 'page' : undefined">{{ item.name }}</DisclosureButton>
      </div>
    </DisclosurePanel>
  </Disclosure>
  <TransitionRoot class="z-[101]" as="template" :show="openCart">
    <Dialog as="div" class="relative z-10" @close="openCart = false">
      <TransitionChild as="template" enter="ease-in-out duration-500" enter-from="opacity-0" enter-to="opacity-100"
        leave="ease-in-out duration-500" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-hidden">
        <div class="absolute inset-0 overflow-hidden">
          <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <TransitionChild as="template" enter="transform transition ease-in-out duration-500 sm:duration-700"
              enter-from="translate-x-full" enter-to="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700" leave-from="translate-x-0"
              leave-to="translate-x-full">
              <DialogPanel class="pointer-events-auto w-screen max-w-md">
                <div class="flex h-full flex-col overflow-y-scroll bg-white shadow-xl ">
                  <div class="flex-1 overflow-y-auto  px-4 py-6 sm:px-6 ">
                    <div class="flex items-start justify-between ">
                      <DialogTitle class="text-3xl font-['kanit'] text-gray-900 ">ตะกร้าสินค้า</DialogTitle>
                      <div class="ml-3 flex h-7 items-center">
                        <button type="button" class="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                          @click="openCart = false">
                          <span class="absolute -inset-0.5" />
                          <span class="sr-only">Close panel</span>
                          <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>

                    <div class="mt-8">
                      <div class="flow-root ">
                        <ul role="list" class="-my-6 divide-y divide-gray-200">
                          <li v-for="item in cartStore.cart" :key="item.name" class="flex py-6 ">
                            <div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 ">
                              <img v-if="item.images" class="h-full w-full object-cover object-center"
                                :src="item.images[0]" alt="Product Image">
                              <img v-else class="h-full w-full object-cover object-center"
                                src="@/assets/image/placeholder.jpg" alt="Product Image">
                            </div>

                            <div class="ml-4 flex flex-1 flex-col ">
                              <div>
                                <div class="flex justify-between text-base font-['kanit'] text-gray-900">
                                  <Nuxt-link :to="`/product/${item.id}`">
                                    <h3 class="font-['kanit']">
                                      <a>{{ item.name }}</a>
                                    </h3>
                                  </Nuxt-link>
                                  <p class="ml-4 font-['kanit']">{{ item.price }} บาท</p>
                                </div>
                              </div>
                              <div class="flex flex-1 items-end justify-between text-sm">
                                <p class="font-['kanit'] text-gray-500">จำนวน {{ item.quantity }} x {{ item.price }} =
                                  {{
    item.quantity * item.price }} บาท</p>

                              </div>
                            </div>
                            <div class="ml-2 flex justify-between">

                              <div class="flex-col flex mx-3">
                                <button @click="cartStore.addProduct(item)" type="button"
                                  class="font-['kanit'] text-sky-900 hover:text-sky-950  flex-1 p-1 text-3xl">+</button>
                                <button @click="cartStore.reduceProduct(item, item.id)" type="button"
                                  class="font-['kanit'] text-sky-900 hover:text-sky-950  flex-1 p-1 text-3xl">-</button>

                              </div>
                              <button @click="cartStore.removeProduct(item.productId)" type="button"
                                class="font-['kanit'] text-white hover:bg-red-600 bg-red-500 p-1">
                                <TrashIcon class="h-6 w-6 text-gray-800" aria-hidden="true" />
                              </button>
                            </div>
                          </li>
                        </ul>

                      </div>

                    </div>
                  </div>

                  <div class="border-t border-gray-200 px-4 py-6 sm:px-6 ">
                    <div class="flex justify-between text-base font-['kanit'] text-gray-900">
                      <p>ราคารวม</p>
                      <p>{{ cartStore.totalPrice }} บาท</p>
                    </div>
                    <div class="mt-6 b">
                      <NuxtLink to="/checkout" @click="openCart = false">
                        <a href="#"
                          class="flex items-center justify-center rounded-md border-2 border-cyan-500  bg-sky-900 hover:bg-sky-950 px-6 py-3 text-base font-['kanit'] text-white shadow-sm ">
                          ชำระเงิน
                        </a>
                      </NuxtLink>
                    </div>

                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { useCartStore } from '@/stores/cart';
import { useUserStore } from '@/stores/user';
import { useProductStore } from "@/stores/product";
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems, Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { Bars3Icon, BellIcon, MinusIcon, ShoppingCartIcon, XMarkIcon, TrashIcon } from '@heroicons/vue/24/outline'
import { ref, computed } from 'vue'
// import { useRoute } from 'vue-router';
// const { data : products } = await useFetch('http:localhost:8080/fetchProduct')
// console.log(products.value)
const route = useRoute();
const userStore = useUserStore()
const cartStore = useCartStore()
const productStore = useProductStore()
productStore.fetchProducts()
const openCart = ref(false)
const handleCart = () => {
  if (!userStore.isAuthenticated) {
    navigateTo("/login")
  }
  openCart.value = true
}
const navigation = [
  { name: 'หน้าหลัก', linkTo: "/", current: false },
  { name: 'สินค้าทั้งหมด', linkTo: "/all-products", current: false },
  { name: 'ฟอรั่ม', linkTo: "/forum", current: false },

]
</script>