<template>
    <div class="flex h-fit">
        <aside
            class="flex flex-col min-w-40 w-40  h-screen min-h-screen px-5 py-8  bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700 ">
            <div class="flex flex-col justify-between flex-1 mt-6">
                <nav class="-mx-3 space-y-6 ">
                    <div class="space-y-3 ">

                        <label class="px-3 text-xs text-gray-500 font-['kanit'] uppercase dark:text-gray-400">Admin
                            Page</label>

                        <div @click="selectedSide = 'addProduct'"
                            class="flex items-center px-3 py-2 text-gray-600 font-['kanit'] transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700">
                            <PlusCircleIcon class="h-6 w-6" aria-hidden="true" />
                            <span class="mx-2 text-sm font-['kanit'] font-medium">เพิ่มสินค้า</span>
                        </div>
                        <div @click="selectedSide = 'productList'"
                            class="flex items-center px-3 py-2 text-gray-600 font-['kanit'] transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700">
                            <ListBulletIcon class="h-6 w-6" aria-hidden="true" />
                            <span class="mx-2 text-sm font-['kanit'] font-medium">รายการสินค้า</span>
                        </div>
                        <div @click="fetchOrder(); selectedSide = 'orderList'"
                            class="flex items-center px-3 py-2 text-gray-600 font-['kanit'] transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700">
                            <TruckIcon class="h-6 w-6" aria-hidden="true" />
                            <span class="mx-2 text-sm font-['kanit'] font-medium">รายการสั่งซื้อ</span>
                        </div>
                        <div @click="fetchUser(); selectedSide = 'userList'"
                            class="flex items-center px-3 py-2 text-gray-600 font-['kanit'] transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700">
                            <UserGroupIcon class="h-6 w-6" aria-hidden="true" />
                            <span class="mx-2 text-sm font-['kanit'] font-medium">รายชื้อผู้ใช้</span>
                        </div>
                        <div
                            class="flex items-center px-3 py-2 text-gray-600 font-['kanit'] transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700">
                            <a href="https://dashboard.omise.co/v2/dashboard" target="_blank"
                                class="mx-2 text-sm font-['kanit'] font-medium">Opn Payments</a>
                        </div>
                    </div>
                </nav>
            </div>
        </aside>
        <div class="h-screen min-h-screen overflow-y-auto ">
            <div v-if="selectedSide == ''">
                <p class="m-10 text-gray-600 font-['kanit'] text-5xl">
                    Hello!!! Welcome to Admin Page
                </p>
            </div>
            <div v-if="selectedSide == 'addProduct'" class="flex">
                <div class="m-10 flex flex-col space-y-4">
                    <div>
                        <label class="text-lg font-['kanit'] text-gray-500">ชื่อสินค้า</label>
                        <input id="name" name="name" placeholder="Gundum RX78" v-model="newProduct.name"
                            class="block w-full rounded font-['kanit'] border-gray-300 bg-gray-50 py-3 px-4 pr-10 text-base text-gray-500 placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-gray-300 " />
                    </div>
                    <div class="relative">

                        <label for="description"
                            class="text-lg font-['kanit'] text-gray-500 mt-5">รายละเอียดสินค้า</label>
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
                    <div class="mr-6 flex flex-wrap">
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
                            <input id="images" name="images" type="file" accept="image/*" multiple
                                @change="onFileChange"
                                class="block w-full rounded font-['kanit'] border-gray-300 bg-gray-50 py-3 px-4 pr-10 text-base text-gray-500 placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-gray-300" />
                        </div>
                    </div>

                    <div class="mr-5">
                        <button @click="addProduct()"
                            class="mt-4 inline-flex w-full items-center justify-center rounded bg-[#2c52b3] py-2.5 px-4 text-base font-semibold font-['kanit'] tracking-wide text-white text-opacity-80 outline-none ring-offset-2 transition hover:text-opacity-100 focus:ring-2 focus:ring-teal-500 sm:text-lg">เพิ่มสินค้า</button>
                    </div>
                </div>
                <!-- <div class=" m-10 flex flex-col space-y-4 ">
                    <img class="h-36 w-36" v-for="image in newProduct.images" :key="image" :src="image">

                </div> -->
                <!-- <img src="http://localhost:4566/don-gunpla-store/71bfbcea-fe93-443b-8c2d-df62cb11bca3.png"> -->
                <!-- {{ newProduct }} -->

            </div>
            <table v-if="selectedSide == 'productList'">
                <thead>
                    <tr class="sticky top-0 bg-white">
                        <th class="font-['kanit'] border px-4 py-2">Product ID</th>
                        <th class="font-['kanit'] border px-4 py-2">รูป</th>
                        <th class="font-['kanit'] border px-4 py-2">ชื่อสินค้า</th>
                        <th class="font-['kanit'] border px-4 py-2">รายละเอียดสินค้า</th>
                        <th class="font-['kanit'] border px-4 py-2">ประเภท</th>
                        <th class="font-['kanit'] border px-4 py-2">ยี่ห้อ</th>
                        <th class="font-['kanit'] border px-4 py-2">ซีรี่ย์</th>
                        <th class="font-['kanit'] border px-4 py-2">ขนาด</th>
                        <th class="font-['kanit'] border px-4 py-2">เกรด</th>
                        <th class="font-['kanit'] border px-4 py-2">ราคา</th>
                        <th class="font-['kanit'] border px-4 py-2">คงเหลือ</th>
                        <th class="font-['kanit'] border px-4 py-2">แก้ไข</th>
                        <th class="font-['kanit'] border px-4 py-2">ลบ</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in productStore.products" :key="item.productId">
                        <td class="font-['kanit'] border px-4 py-2">{{ item.productId }}</td>
                        <td class="font-['kanit'] border px-4 py-2">
                            <img v-if="item.images" :src="item.images[0]" alt="" class="h-16 w-16 object-cover">
                            <img v-else src="@/assets/image/placeholder.jpg" alt="" class="h-16 w-16 object-cover">
                        </td>
                        <td class="font-['kanit'] border px-4 py-2">{{ item.name }}</td>
                        <td class="font-['kanit'] border px-4 py-2">{{ item.description }}</td>
                        <td class="font-['kanit'] border px-4 py-2">{{ item.type }}</td>
                        <td class="font-['kanit'] border px-4 py-2">{{ item.brand }}</td>

                        <template v-if="item.type == 'Gunpla'">
                            <td class="font-['kanit'] border px-4 py-2">{{ item.series }}</td>
                            <td class="font-['kanit'] border px-4 py-2">{{ item.scale }}</td>
                            <td class="font-['kanit'] border px-4 py-2">{{ item.grade }}</td>
                        </template>

                        <template v-if="item.type == 'Tool'">
                            <td class="font-['kanit'] border px-4 py-2">-</td>
                            <td class="font-['kanit'] border px-4 py-2">-</td>
                            <td class="font-['kanit'] border px-4 py-2">-</td>
                        </template>

                        <td class="font-['kanit'] border px-4 py-2">{{ item.price }}</td>
                        <td class="font-['kanit'] border px-4 py-2">{{ item.stock }}</td>
                        <td class="font-['kanit'] border px-4 py-2">
                            <button @click="setSelectedProduct(item); showModal = true" @close-modal="showModal = false"
                                class="focus:outline-none">
                                <PencilSquareIcon class="h-6 w-6" aria-hidden="true" />
                            </button>

                        </td>
                        <td class="font-['kanit'] border px-4 py-2">
                            <a href="#" @click="deleteProduct(item)">
                                <TrashIcon class="h-6 w-6" aria-hidden="true" />
                            </a>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div v-if="showModal == true">
                <Modal v-show="showModal" @close-modal="showModal = false" :product="selectedProduct"></Modal>
            </div>

            <table v-if="selectedSide == 'orderList'">
                <thead>
                    <tr class="sticky top-0 bg-white">
                        <th class="font-['kanit'] border px-4 py-2">Order Id</th>
                        <th class="font-['kanit'] border px-4 py-2">User</th>
                        <th class="font-['kanit'] border px-4 py-2">รายการสินค้า</th>
                        <th class="font-['kanit'] border px-4 py-2">ราคารวม</th>
                        <th class="font-['kanit'] border px-4 py-2">สถานะ</th>
                        <th class="font-['kanit'] border px-4 py-2">ประเภทการจัดส่ง</th>
                        <th class="font-['kanit'] border px-4 py-2">วันที่สั่งซื้อ</th>
                        <th class="font-['kanit'] border px-4 py-2">ที่อยู่</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in allOrder" :key="item.orderId">
                        <td class="font-['kanit'] border px-4 py-2">{{ item.orderId }}</td>
                        <td class="font-['kanit'] border px-4 py-2">{{ item.email }}</td>
                        <td class="font-['kanit'] border px-4 py-2">{{ item.cart }}</td>
                        <td class="font-['kanit'] border px-4 py-2">{{ item.totalPrice }}</td>
                        <td class="font-['kanit'] border px-4 py-2">
                            <select v-model="item.status" @change="updateStatus(item)"
                                class="block w-auto px-4 py-2 border rounded-md" :disabled="item.status === 'Cancel'">
                                <option selected>{{ item.status }}</option>
                                <option value="Pending" v-if="item.status !== 'Pending'">Pending</option>
                                <option value="Completed" v-if="item.status !== 'Completed'">Completed</option>
                                <option value="Cancel" v-if="item.status !== 'Cancel'">Cancel</option>
                            </select>
                        </td>
                        <td class="font-['kanit'] border px-4 py-2">{{ item.shippingMethod }}</td>
                        <td class="font-['kanit'] border px-4 py-2">{{ item.orderDate }}</td>
                        <td class="font-['kanit'] border px-4 py-2">{{ (item.address).replace(/(.{10})/g, '$1\n') }}
                        </td>
                    </tr>
                </tbody>
            </table>
            <table v-if="selectedSide == 'userList'">
                <thead>
                    <tr class="sticky top-0 bg-white">
                        <th class="font-['kanit'] border px-4 py-2">อีเมล</th>
                        <th class="font-['kanit'] border px-4 py-2">รูป</th>
                        <th class="font-['kanit'] border px-4 py-2">ชื่อจริง</th>
                        <th class="font-['kanit'] border px-4 py-2">ที่อยู่</th>
                        <th class="font-['kanit'] border px-4 py-2">เบอร์โทรศัพท์</th>
                        <th class="font-['kanit'] border px-4 py-2">ลบ</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in allUser" :key="item.email">
                        <td class="font-['kanit'] border px-4 py-2">{{ item.email }}</td>
                        <td class="font-['kanit'] border px-4 py-2">
                            <img v-if="item.image" class="h-full w-full object-cover object-center" :src="item.image"
                                alt="Product Image">
                            <img v-else class="h-full w-full object-cover object-center"
                                src="@/assets/image/placeholder.jpg" alt="Product Image">
                        </td>
                        <td class="font-['kanit'] border px-4 py-2">{{ item.name }}</td>
                        <td class="font-['kanit'] border px-4 py-2">{{ item.address }}</td>
                        <td class="font-['kanit'] border px-4 py-2">{{ item.phoneNumebr }}</td>
                        <td class="font-['kanit'] border px-4 py-2">
                            <button @click="deleteItem(item.email)" class="focus:outline-none">
                                <TrashIcon class="h-6 w-6 cursor-pointer" aria-hidden="true" />
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

    </div>
</template>

<script setup>
// definePageMeta({
//     middleware: [
//         'auth',
//     ]
// });
import { useProductStore } from '@/stores/product';
import { useUserStore } from '@/stores/user';
import { TrashIcon, PencilSquareIcon, ListBulletIcon, PlusCircleIcon, UserGroupIcon, TruckIcon } from '@heroicons/vue/24/outline'

const { $api } = useNuxtApp()
const config = useRuntimeConfig()
const userStore = useUserStore()
const productStore = useProductStore()
const selectedSide = ref("")
const allOrder = ref([])
const allUser = ref([])
const showModal = ref(false);
const selectedProduct = ref(null);

const setSelectedProduct = (product) => {
    selectedProduct.value = product;
};
const fetchOrder = async () => {
    if (allOrder.value.length == 0) {
        const res = await $api("/order", {
            method: "GET"
        })
        console.log(res)
        allOrder.value = res
    }
}
const fetchUser = async () => {
    if (allUser.value.length == 0) {
        const res = await $api("/user/allUser", {
            method: "GET"
        })
        console.log(res)
        allUser.value = res
        allUser.value = allUser.value.filter(user => user.role !== 'admin');
    }
}

const deleteItem = async (item) => {
    const res = await $api(`/user/deleteUser/${item}`, {
        method: "DELETE",
    })
    console.log(res)
    allUser.value = allUser.value.filter(user => user.email !== item)
}

const newProduct = ref({
    name: "",
    description: "",
    type: "",
    brand: "",
    series: "",
    scale: "",
    grade: "",
    price: null,
    stock: null,
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
    // const files = event.target.files;
    // // Clear existing images before adding new ones
    // newProduct.value.images = [];
    // for (let i = 0; i < files.length; i++) {
    //     const file = files[i];
    //     // Read the file as a data URL
    //     const reader = new FileReader();
    //     reader.onload = (e) => {
    //         // Push the data URL to the images array
    //         newProduct.value.images.push(e.target.result);
    //     };
    //     // Read the file
    //     reader.readAsDataURL(file);
    // }
}
const updateStatus = async (item) => {
    try {
        const res = await $api(`/order/updateOrder`, {
            method: 'PUT',
            body: item
        })

        if (!res.ok) {
            throw new Error('Failed to update status');
        }

        // Handle success response if needed
    } catch (error) {
        console.error('Error updating status:', error);
    }
};
const addProduct = async () => {
    try {
        console.log(userStore.token)
        const res = await $fetch(`${config.public.baseURL}/s3/upload-image`, {
            body: formData,
            header: {
                'Content-Type': 'multipart/form-data'
            },
            method: "POST"
        })
        newProduct.value.images = res.imageUrls

        if (newProduct.value.type == "Gunpla") {
            await $api("/gunpla/addGunpla", {
                body: newProduct.value,
                method: "POST"
            }).then(res => console.log(res)).catch(err => console.log(err))
        }
        else if (newProduct.value.type == "Tool") {
            await $api("/tool/addTool", {
                body: newProduct.value,
                method: "POST"
            }).then(res => console.log(res)).catch(err => console.log(err))
        }
        formData = new FormData();
        newProduct.value = {
            name: "",
            description: "",
            type: "",
            brand: "",
            series: "",
            scale: "",
            grade: "",
            price: null,
            stock: null,
            images: []
        }
        document.getElementById('images').value = null;
        productStore.fetchProducts()
    }
    catch (err) {
        alert((err))
    }


}
const deleteProduct = async (product) => {
    try {
        if (product.type == "Gunpla") {
            await $api(`/gunpla/deleteGunpla/${product.productId}`, {
                method: "DELETE"
            })
        } else if (product.type == "Tool") {
            await $api(`/tool/deleteTool/${product.productId}`, {
                method: "DELETE"
            })
        }
        productStore.fetchProducts()
    }
    catch (error) {
        alert(error)
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