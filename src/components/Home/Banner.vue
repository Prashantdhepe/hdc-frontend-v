<template>
    <Swiper
      :modules="[Autoplay, Pagination]"
      :slides-per-view="1"
      :loop="true"
      :autoplay="{ delay: 2000, disableOnInteraction: false }"
      class="mySwiper"
      :pagination="true"
    >
    <SwiperSlide v-for="(banner, index) in banners" :key="index">
      <div
        class="banner"
        :style="{ backgroundImage: `url(${getImageUrl(banner.directory)})` }"
      ></div>
    </SwiperSlide>
    </Swiper>
  </template>
  
  <script setup>
  import { onMounted, ref } from 'vue';
  import axiosClient from '@/axios';
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import 'swiper/swiper-bundle.css';
  import 'swiper/css';
  import { Autoplay, Pagination, Navigation } from 'swiper/modules';
  
  const banners = ref([])
  const fetchBanner = async() => {
  try{
    const response = await axiosClient.get("/banners");
    banners.value = response.data.data;
    // console.log(response.data.data);
  }
  catch(err){
    err.value = "Failed to Load Standards";
    console.log(err);
  }
}

const getImageUrl = (directory) => {
  if (!directory) {
    return "http://via.placeholder.com/369x375"; 
  }
//   return `${import.meta.env.VITE_API_BASE_URL}/storage/${directory}`; 
    if (import.meta.env.DEV) {
    return `${import.meta.env.VITE_API_BASE_URL}/storage/${directory}`;
  }

  // Production (EC2 + S3)
  return `${import.meta.env.VITE_S3_BASE_URL}/${directory}`;
};
onMounted(() =>{
    fetchBanner();
})
  
  </script>
  
  <style scoped>
  /* .banner {
    background-size: cover;
    background-position: center;
    height: 650px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 140px;
  } */
  /* @media (max-width: 576px) {
    .banner {
      height: 200px;
      margin-top: 100px;
    }
  } */
  </style>