<template>
  <div class="p-1 m-5">
    <div class="flex justify-center">
      <button @click="filterStatus(0)" class="mx-8 flex items-center justify-center rounded-md border-2 border-cyan-500 bg-sky-900 hover:bg-sky-950 px-6 py-3 text-base font-['kanit'] text-white shadow-sm">ทั้งหมด</button>
      <button @click="filterStatus('Pending')" class="mx-8 flex items-center justify-center rounded-md border-2 border-cyan-500 bg-sky-900 hover:bg-sky-950 px-6 py-3 text-base font-['kanit'] text-white shadow-sm">กำลังจัดส่ง</button>
      <button @click="filterStatus('Delivered')" class="mx-8 flex items-center justify-center rounded-md border-2 border-cyan-500 bg-sky-900 hover:bg-sky-950 px-6 py-3 text-base font-['kanit'] text-white shadow-sm">จัดส่งแล้ว</button>
      <button @click="filterStatus('Canceled')" class="mx-8 flex items-center justify-center rounded-md border-2 border-cyan-500 bg-sky-900 hover:bg-sky-950 px-6 py-3 text-base font-['kanit'] text-white shadow-sm">ยกเลิกแล้ว</button>
    </div>
    <div>
      <li v-for="item in filteredOrders" :key="item.orderId" class="flex py-6 border-b-2">
        <div class="ml-4 flex flex-1 flex-col">
          <div>
            <div class="flex justify-between text-base font-['kanit'] text-gray-900">
              <h3 class="font-['kanit']">
                <a>{{ item.orderDate }}</a>
              </h3>
              <div class="flex-col flex justify-center content-center">
                <div class="flex justify-end content-end">{{ item.status }}</div>
                <button v-if="item.status === 'Pending'" @click="cancelOrder(item)" class="ml-2 font-['kanit'] text-red-500 shadow-sm">ยกเลิก</button>
              </div>
            </div>
          </div>
          <div class="flex flex-1 items-end justify-between text-sm">
          </div>
          <ul>
            <li v-for="product in item.cart" :key="product.productId" class="flex py-2">
              <img v-if="item.images" class=" object-cover object-center w-20 h-20 bottom-24 " :src=product.image[0]
                        alt="Product Image">
                      <img v-else class=" object-cover object-center w-20 h-20 bottom-24 " src="@/assets/image/placeholder.jpg"
                        alt="Product Image">
              <p class="ml-2 font-['kanit'] text-gray-900">{{ product.type }}</p>
              <p class="ml-2 font-['kanit'] text-gray-900">{{ product.quantity }}</p>
              
            </li>
          </ul>
        </div>
      </li>
    </div>
  </div>
</template>

<script setup>
const order = [{ "orderId": "23ca6629-1b6a-48c0-95aa-84f1f70208e1", "email": "nutthai1771@gmail.com", "cart": [ { "productId": "2d247e5f-0622-427a-b6a2-d76d05e41e26", "type": "Gunpla", "quantity": 1 , "image": "https://cdn.discordapp.com/attachments/439702858263429128/1206152121020448768/ab.png?ex=65daf7b2&is=65c882b2&hm=acc8986c3a4d8657a43a5dc5dc0902de767b37a6602eadec82f6eab2544773e1&"},{ "productId": "2d247e5f-0622-427a-b6a2-d76d05e41e25", "type": "Gunpla", "quantity": 1 , "image": "https://cdn.discordapp.com/attachments/439702858263429128/1206152121020448768/ab.png?ex=65daf7b2&is=65c882b2&hm=acc8986c3a4d8657a43a5dc5dc0902de767b37a6602eadec82f6eab2544773e1&"} ], "totalPrice": 244, "status": "Delivered", "shippingMethod": "ปกติ", "orderDate": "2024-03-06 22:49:29", "address": "33 nakniwat 17" },
{ "orderId": "23ca6629-1b6a-48c0-95aa-84f1f70208e0", "email": "nutthai1771@gmail.com", "cart": [ { "productId": "2d247e5f-0622-427a-b6a2-d76d05e41e26", "type": "Gunpla", "quantity": 1 , "image": "https://cdn.discordapp.com/attachments/439702858263429128/1206152121020448768/ab.png?ex=65daf7b2&is=65c882b2&hm=acc8986c3a4d8657a43a5dc5dc0902de767b37a6602eadec82f6eab2544773e1&"},{ "productId": "2d247e5f-0622-427a-b6a2-d76d05e41e25", "type": "Gunpla", "quantity": 1 , "image": "https://cdn.discordapp.com/attachments/439702858263429128/1206152121020448768/ab.png?ex=65daf7b2&is=65c882b2&hm=acc8986c3a4d8657a43a5dc5dc0902de767b37a6602eadec82f6eab2544773e1&"} ], "totalPrice": 244, "status": "Canceled", "shippingMethod": "ปกติ", "orderDate": "2024-03-06 22:49:29", "address": "33 nakniwat 17" },
{ "orderId": "23ca6629-1b6a-48c0-95aa-84f1f70208e8", "email": "nutthai1771@gmail.com", "cart": [ { "productId": "2d247e5f-0622-427a-b6a2-d76d05e41e26", "type": "Gunpla", "quantity": 1 , "image": "https://cdn.discordapp.com/attachments/439702858263429128/1206152121020448768/ab.png?ex=65daf7b2&is=65c882b2&hm=acc8986c3a4d8657a43a5dc5dc0902de767b37a6602eadec82f6eab2544773e1&"},{ "productId": "2d247e5f-0622-427a-b6a2-d76d05e41e25", "type": "Gunpla", "quantity": 1 , "image": "https://cdn.discordapp.com/attachments/439702858263429128/1206152121020448768/ab.png?ex=65daf7b2&is=65c882b2&hm=acc8986c3a4d8657a43a5dc5dc0902de767b37a6602eadec82f6eab2544773e1&"} ], "totalPrice": 244, "status": "Pending", "shippingMethod": "ปกติ", "orderDate": "2024-03-06 22:49:29", "address": "33 nakniwat 17" }
]

let selectedStatus = ref(0);

const filteredOrders = computed(() => {
  if (selectedStatus.value === 0) {
    return order;
  } else {
    return order.filter(item => item.status === selectedStatus.value);
  }
});

function filterStatus(status) {
  selectedStatus.value = status;
}

function cancelOrder(item) {
  // ทำงานเมื่อปุ่ม "ยกเลิกออเดอร์" ถูกคลิก
  console.log("Cancel order for", item.email);
}
</script>
