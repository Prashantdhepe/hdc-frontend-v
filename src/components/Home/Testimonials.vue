<template>
  <section class="block4">
    <div class="fixed-bg bg4 clr-overlay"></div>
    <div class="container">
      <div class="heading st2">
        <h3>What The Parents Say</h3>
      </div><!--heading end-->
      <div class="testimonial-carousel">
        <div class="testi-comment" v-for="(item, index) in items" :key="index">
          
          <p>{{ item.testimonial }}</p>
          <div class="client-info">
            <h3>{{ item.name }}</h3>
            <h4>{{ item.location }}</h4>
            
          </div><!--client-info end-->
        </div><!--testi-comment end-->
      </div><!--testimonial-carousel end-->
    </div>
  </section>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import {onMounted, ref, watch} from "vue";
import axiosClient from "@/axios";

const route = useRoute();
const items = ref("");

onMounted(() => {
  fetch();
});

const fetch = async () => {
  try {
    const response = await axiosClient.get(`/testimonials`);
    items.value = JSON.parse(JSON.stringify(response.data));  

    // =================== TESTIMONIAL SLIDER ===============
    
    jQuery('.testimonial-carousel').slick({
        slidesToShow: 1,
        slck:true,
        slidesToScroll: 1,
        prevArrow:'<span class="slick-previous"></span>',
        nextArrow:'<span class="slick-nexti"></span>',
        autoplay: true,
        dots: false,
        autoplaySpeed: 2000
    });
    
  } catch (e) {

  }

}
</script>

<style scoped>

</style>