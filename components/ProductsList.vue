<template>
 
    
</template>





<script setup>
import { useCartStore } from '../stores/cart'
import { useProductStore } from '../stores/product'
import { ref ,watch} from 'vue'
const route = useRoute()
const productStore = useProductStore()
const cartStore = useCartStore()
const props = defineProps({
  products: {
    type: Object,
  },
});
const { products } = props;
console.log(products)
// const filteredProducts = computed(() => {
 
//  return handleSeriesChange(filterValue)
// })

// const handleSeriesChange = (newSeries) => {
//   if(newSeries != ""){
//     return  allProduct.filter((item) => item.series == newSeries)
//   }else{
//     return allProduct
//   }
// }


</script>

