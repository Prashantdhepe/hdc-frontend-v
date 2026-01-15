<template>
  <section class="block2">
    <div class="fixed-bg bg5"></div>
    <div class="container">
      <div class="heading clr">
        <h3>Our Class</h3>
      </div><!--heading end-->
      <div class="cls-text">
        <div class="row">
          <div class="col-lg-6">
            <div class="bld-text">
              <!-- <p>Elipsis magna a terminal nulla elementum morbi elite forte maecenas est magna vehicula est node maecenas. Praesent arcu gravida vehicula est node maecenas loareet morbi a dosis luctus. Urna eget lacinia eleifend praesent luctus a arcu quis facilisis venenatis. </p> -->
            </div>
          </div>
          <div class="col-lg-6">
            <div class="blc-text">
              <!-- <p>Elipsis magna a terminal nulla elementum morbi elite forte maecenas est magna vehicula est node maecenas. Praesent arcu gravida vehicula est node maecenas loareet morbi a dosis luctus. Urna eget lacinia eleifend praesent luctus a arcu quis facilisis venenatis. Elipsis magna a terminal nulla elementum morbi elite forte maecenas est magna vehicula est node maecenas. </p> -->
            </div>
          </div>
        </div>
      </div>
      <div class="more-services">
        <div class="row">
          <div 
            class="col-lg-6 col-md-6 col-sm-12 col-12"
            v-for="standard in standards" :key="standard.id"
          >
            <div class="services_details">
              <div class="row">
                <div class="col-lg-6">
                  <div class="srvc-img">
                    <template v-for="(image_path, index) in standard.image" :key="index">
                      <img :src="getImageUrl(image_path)" alt="">
                    </template>
                    <div class="specs-fig">
                      <ul>
                        <li v-if="standard.std">
                          <h3>{{ standard.std }}-{{ standard.section_name }}<br/>Standard</h3>
                        </li>
                      
                        <li v-if="standard.strength">
                          <h3>{{ standard.strength }}<br/> Class Size</h3>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="srv_det">
                    <h3>{{ standard.school_type }}</h3>
                    <!-- <p>{{ standard.description }}</p> -->
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
<!--more-services end-->
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import axiosClient from '@/axios';
const standards = ref([]);

const fetchStandard = async() => {
  try{
    const response = await axiosClient.get("/standards");
    standards.value = response.data.data;
  }
  catch(err){
    err.value = "Failed to Load Standards";
    console.log(err);
  }
}


const getImageUrl = (image) => {
  if (!image) {
    return "http://via.placeholder.com/369x375"; 
  }
  if (import.meta.env.DEV) {
    return `${import.meta.env.VITE_API_BASE_URL}/storage/${image}`;
  }
  // Production (EC2 + S3)
  return `${import.meta.env.VITE_S3_BASE_URL}/${image}`;
};
onMounted(() =>{
  fetchStandard();
})
</script>

<style scoped>
.srv_set{
  	height: 202px;
}
</style>