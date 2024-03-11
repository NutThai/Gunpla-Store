<template>
  <Carousel :autoplay="2000" :wrap-around="true">
    <Slide v-for="slide in slides" :key="slide">
      <div class="carousel__item">
        <img class="w-100 h-100 object-cover" :src="slide" />
      </div>
    </Slide>
    <template #addons>
      <Navigation />
      <Pagination />
    </template>
  </Carousel>
</template>


<script setup>
import { Carousel, Navigation, Pagination, Slide } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'
const slides = ["https://don-gunpla-store.s3.amazonaws.com/gunplaScale.jpg",
  "https://don-gunpla-store.s3.amazonaws.com/gunplaSeedFreedom.png",
]

</script>

<style>
.carousel__item {
  width: 50%;
  height: 50%;
  background-color: gray;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.carousel__slide {
  padding: 10px;
}

.carousel__prev,
.carousel__next {
  box-sizing: content-box;
  border-radius: 50%;

}
</style>
