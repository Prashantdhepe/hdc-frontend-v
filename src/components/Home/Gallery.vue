<template>
  <section class="block2">
    <div class="fixed-bg bg7 no-fix"></div>
    <div class="heading st2">
      <h3>Gallery</h3>
    </div><!--heading end-->
    <!-- <div class="masonary no-pd">
    <div class="row">
      <div class="col-lg-12 col-md-12 col-sm-12 col-12">
        <Swiper
          v-if="flattenedImages.length"
          
          :modules="[Autoplay, Pagination]"
          :slides-per-view="4"
          :loop="true"
          :autoplay="{ delay: 5000, disableOnInteraction: false }"
          class="mySwiper"
          :space-between="20"
          
        >
          <SwiperSlide
            v-for="(img, index) in flattenedImages"
            :key="index"
          >
            <div class="gallery-ms">
              <img :src="getImageUrl(img)" alt="Gallery Image" />
              <a
                :href="getImageUrl(img)"
                class="html5lightbox"
                title="View Image"
              >
                <i class="fa fa-search"></i>
              </a>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  </div> -->
  <div class="gallery-wrapper">
  <Swiper
    v-if="flattenedImages.length"
    :modules="[Autoplay, Pagination]"
    :slides-per-view="4"
    :space-between="20"
    :loop="true"
    :autoplay="{ delay: 5000, disableOnInteraction: false }"
    class="mySwiper"
  >
    <SwiperSlide v-for="(img, index) in flattenedImages" :key="index">
      <div class="gallery-ms">
        <img :src="getImageUrl(img)" alt="Gallery Image" />
        <a :href="getImageUrl(img)" class="html5lightbox">
          <i class="fa fa-search"></i>
        </a>
      </div>
    </SwiperSlide>
  </Swiper>
</div>

  <div class="full-gallery">
        <router-link :to="{name: 'gallery'}" title="">CLICK HERE TO VIEW OUR FULL GALLERY</router-link>
  </div>
  </section>
</template>

<script setup>
import { ref, onMounted, computed, nextTick } from 'vue';
import axiosClient from '@/axios';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css';
import 'swiper/css';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const galleries = ref([]);

const fetchGalleries = async () => {
  try {
    const response = await axiosClient.get('/galleries');
    galleries.value = response.data.data.filter(g=>g.media_type === 'image');
    console.log('Fetched galleries:', galleries.value); 
  } catch (error) {
    console.error('Error fetching galleries:', error);
  }
};

const flattenedImages = computed(() =>
  galleries.value.flatMap(gallery => gallery.media_path)
);
// console.log('Flattened images:', flattenedImages.value);
const getImageUrl = (imagePath) => {
  if (!imagePath) {
    return "http://via.placeholder.com/369x375"; 
  }
  if (import.meta.env.DEV) {
    return `${import.meta.env.VITE_API_BASE_URL}/storage/${imagePath}`;
  }
  // Production (EC2 + S3)
  return `${import.meta.env.VITE_S3_BASE_URL}/${imagePath}`;
};


onMounted(async () => {
  await fetchGalleries();
  await nextTick();
});
</script>

<style scoped>

.mySwiper {
  width: 100%;
}

.swiper-slide {
  display: flex;
}

.gallery-ms {
  width: 100%;
  overflow: hidden;
}

.gallery-ms img {
  width: 100%;
  height: 300px;
  object-fit: cover;
  transform: none !important;
}

</style>