<template>
  <carousel :autoplay="2000"
            :items-to-show="1"
            :wrap-around="true"
            :pauseAutoplayOnHover="true"
  >
    <slide v-for="slide in 10" :key="slide">
      {{ slide }}
    </slide>

    <template #addons>
      <navigation />
    </template>
  </carousel>
</template>

<script setup>
// If you are using PurgeCSS, make sure to whitelist the carousel CSS classes
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import {onMounted} from "vue";

onMounted( () => {

});
</script>

<style scoped>

</style>