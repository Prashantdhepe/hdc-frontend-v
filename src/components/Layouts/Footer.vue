<template>
  <footer>
    <div class="container">
      <div class="footer-data">
        <div class="row">
          <div class="col-lg-5 col-md-6 col-sm-12 col-12">
            <div class="widget widget-about">
              <h3 class="widget-title">About Us</h3>
              <p>HDC strives to surpass through its two-fold purpose of achieving academic and moral excellence. Education is basically to prepare a human being to be good and become a good citizen of the world. We are highly focused on the overall development to the country. We believe that we are not just educating students but we are giving a new generation to INDIA.</p>
              <img src="/assets/images/hdc_logo.jpeg" alt="" style="height: 75px; margin-bottom: 25px" >
            </div><!--widget-about end-->
          </div>
          <div class="col-lg-3 col-md-6 col-sm-12 col-12">
            <div class="widget widget-links">
              <h3 class="widget-title">Activities</h3>
              <ul>
                <li><router-link :to="{name: 'Activities', params: {school: 'hdc-kids'}}" title="Play School">Play School</router-link></li>
                <li><router-link :to="{name: 'Activities', params: {school: 'hdc-international'}}" title="International School">International School</router-link></li>
              </ul>
            </div><!--widget-links end-->
          </div>
          <div class="col-lg-3 col-md-6 col-sm-12 col-12">
            <div class="widget widget-posts">
              <h3 class="widget-title">Achievements</h3>
              <div class="achievements" v-for="(post, index) in content.posts" :key="index">
                <ul>
                  <li><h1>{{ post.title }}</h1></li>
                </ul>
              <!-- <div class="blg-posts">
                <div class="blg-post">
                  <img src="http://via.placeholder.com/50x50" alt="">
                  <div class="blg-info">
                    <h3><a href="#" title="">Create amazing things</a></h3>
                    <span>Jan 30 2016 | by <a href="#" title="">David James</a></span>
                  </div>
                </div>
                <div class="blg-post">
                  <img src="http://via.placeholder.com/50x50" alt="">
                  <div class="blg-info">
                    <h3><a href="#" title="">Subscribe</a></h3>
                    <span>Jan 30 2016 | by <a href="#" title="">David James</a></span>
                  </div>
                </div>
                <div class="blg-post">
                  <img src="http://via.placeholder.com/50x50" alt="">
                  <div class="blg-info">
                    <h3><a href="#" title="">Start something new</a></h3>
                    <span>Jan 30 2016 | by <a href="#" title="">David James</a></span>
                  </div>
                </div>
              </div> -->
              </div>
            </div>
          </div>
          <!-- <div class="col-lg-3 col-md-6 col-sm-12 col-12">
            <div class="widget widget-instagram">
              <h3 class="widget-title">Instagram</h3>
              <ul>
                <li><a href="#" title=""><img src="http://via.placeholder.com/85x85" alt=""></a></li>
                <li><a href="#" title=""><img src="http://via.placeholder.com/85x85" alt=""></a></li>
                <li><a href="#" title=""><img src="http://via.placeholder.com/85x85" alt=""></a></li>
                <li><a href="#" title=""><img src="http://via.placeholder.com/85x85" alt=""></a></li>
                <li><a href="#" title=""><img src="http://via.placeholder.com/85x85" alt=""></a></li>
                <li><a href="#" title=""><img src="http://via.placeholder.com/85x85" alt=""></a></li>
              </ul>
            </div>
          </div> -->
        </div>
      </div><!-- footer-data end-->
    </div>
    <div class="row col-12 copyright pt-4">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 text-center-xs text-center-sm">
            <aside id="block-12" class="widget widget_block widget_text">
              <p><strong><span class="text-white">Copyright 2022 HDC School, AKola</span></strong></p>
            </aside>
          </div>
          <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 text-center-xs text-center-sm text-right">
            <aside id="block-11" class="widget widget_block widget_text">
              <p class="text-white"><strong>Proudly Developed By <a rel="noreferrer noopener" href="#" target="_blank">Prashant</a>.</strong></p>
            </aside>
          </div>
        </div>
      </div>
    </div>
  </footer><!--footer end-->
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import {onMounted, ref, watch} from "vue";
import axiosClient from "@/axios";

const route = useRoute();
const content = ref("");
const title = ref("");
onMounted(() => {
  fetch();
});
watch(
    () => route.params.slug,
    (newVal, oldVal) => {
      fetch();
    }
);
const fetch = async () => {
  let slug = route.params.slug;
  try {
    const response = await axiosClient.get(`/achievements`);
    content.value = JSON.parse(JSON.stringify(response.data.data));
    title.value = content.value[0].name;
    content.value = content.value[0];
  } catch (e) {

  }
}
</script>

<style scoped>

.achievements{
  color: white;
  margin-top: 18px;
}
</style>