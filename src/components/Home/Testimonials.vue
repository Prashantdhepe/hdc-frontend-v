<template>
  <section class="block4">
    <div class="fixed-bg bg4 clr-overlay"></div>

    <div class="container">
      <div class="heading st2">
        <h3>What The Parents Say</h3>
      </div>

      <!-- Loader -->
      <div v-if="isLoading" style="text-align:center;padding:40px;">
        Loading testimonials...
      </div>

      <!-- Swiper (same structure as static) -->
      <Swiper
        v-if="isSwiperReady"
        ref="swiperRef"
        :modules="[Autoplay]"
        :slides-per-view="1"
        :loop="testimonials.length > 1"
        :autoplay="{ delay: 3000, disableOnInteraction: false }"
        class="testimonial-carousel"
      >
        <SwiperSlide
          v-for="testimonial in testimonials"
          :key="testimonial.id"
        >
          <!-- SAME markup as static -->
          <div class="testi-comment">
            <p>{{ testimonial.testimonial }}</p>

            <div class="client-info">
              <h3>{{ testimonial.name }}</h3>
              <h4>{{ testimonial.location }}</h4>

              <ul>
                <li v-for="n in 5" :key="n">
                  <i class="fa fa-star"></i>
                </li>
              </ul>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  </section>
</template>
<script setup>
import { ref, onMounted, nextTick } from 'vue';
import axiosClient from '@/axios';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay } from 'swiper/modules';

import 'swiper/css';

const testimonials = ref([]);
const isLoading = ref(true);
const isSwiperReady = ref(false);
const swiperRef = ref(null);

const fetchTestimonials = async () => {
  try {
    const response = await axiosClient.get('/testimonials');
    testimonials.value = Array.isArray(response.data) ? response.data : [];
    isSwiperReady.value = testimonials.value.length > 1;
  } catch (e) {
    testimonials.value = [];
  } finally {
    isLoading.value = false;
  }
};

onMounted(async () => {
  await fetchTestimonials();
  await nextTick();

  // force Swiper to behave like static version
  setTimeout(() => {
    const swiper = swiperRef.value?.swiper;
    if (swiper && testimonials.value.length > 1) {
      swiper.update();
      swiper.autoplay.start();
    }
  }, 300);
});
</script>
<!-- <template>
  <section class="block4">
    <div class="fixed-bg bg4 clr-overlay"></div>
    <div class="container">
      <div class="heading st2">
        <h3>What The Parents Say</h3>
      </div>

      <div v-if="isLoading" style="text-align: center; padding: 40px;">
        <p>Loading testimonials...</p>
      </div>

      <Swiper
        v-if="testimonials.length"
        :modules="[Autoplay, Pagination]"
        :slides-per-view="1"
        :loop="testimonials.length > 1"
        :autoplay="{ delay: 3000, disableOnInteraction: false }"
        :pagination="{ clickable: true }"
        class="testimonial-carousel"
      >

        <SwiperSlide
          v-for="testimonial in testimonials"
          :key="testimonial.id"
        >
          <div class="testi-comment">
            <p>{{ testimonial.testimonial }}</p>
            <div class="client-info">
              <h3>{{ testimonial.name }}</h3>
              <h4>{{ testimonial.location }}</h4>
              <ul>
                <li v-for="star in 5" :key="star">
                  <i class="fa fa-star"></i>
                </li>
              </ul>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref,nextTick } from 'vue';
import axiosClient from '@/axios';
import { Swiper, SwiperSlide } from 'swiper/vue';
  import 'swiper/swiper-bundle.css';
  import 'swiper/css';
import { Autoplay, Pagination } from 'swiper/modules';



const testimonials = ref([]);
const isLoading = ref(true);

const fetchTestimonial = async () => {
  try {
    isLoading.value = true;
    const response = await axiosClient.get('/testimonials');
    testimonials.value = Array.isArray(response.data) ? response.data : [];
    console.log('Testimonials loaded:', testimonials.value.length);
  } catch (err) {
    console.error('Failed to Load Testimonials', err);
    testimonials.value = [];
  } finally {
    isLoading.value = false;
  }
};

onMounted(async() => {
  await fetchTestimonial();
  await nextTick();
});
</script> -->



