<template>
  <section class="pager-sec">
    <div class="container">
      <div class="pager-pag">
        <h3>ACHIEVEMENTS</h3>
      </div><!--pager-pag end-->
    </div>
  </section><!--pager-sec end-->
  <section class="block6">
    <div class="container">
      <div class="blog-post-page">
        <div class="row">
          <div class="col-lg-9">
            <div class="posts-page">
              <div class="post-blog" v-for="(post, index) in content.posts" :key="index">              
                <h3 class="post-title">{{ post.title }}</h3>									
                <div class="blog-post-info" v-html="post.content">
                </div><!--blog-post-info end-->
              </div><!--post-blog end-->
            </div><!--posts-page end-->
          </div>
          <div class="col-lg-3">
            <div class="right-sidebar">
              <div class="widget widget-categories">
                <h3 class="widget-title">Academics</h3>
                <ul>
                  <li><router-link :to="{name: 'Academics', params: {slug: 'rules-and-regulations'}}" title="Rules and Regulations">Rules and Regulations</router-link></li>
                  <li><router-link :to="{name: 'Academics', params: {slug: 'news-room'}}" title="News Room">News Room</router-link></li>
                  <li><router-link :to="{name: 'Academics', params: {slug: 'bus-routes'}}" title="Bus Routes">Bus Routes</router-link></li>
                  <li><router-link :to="{name: 'Academics', params: {slug: 'time-tables'}}" title="Time Tables">Time Tables</router-link></li>
                  <li><router-link :to="{name: 'Academics', params: {slug: 'school-timings'}}" title="School Timings">School Timings</router-link></li>
                  <li><router-link :to="{name: 'Academics', params: {slug: 'mandatory-disclosures'}}" title="Mandatory Disclosures">Mandatory Disclosures</router-link></li>
                </ul>
              </div><!--widget-categories end-->
              <div class="widget widget-posts">
                  <h3 class="widget-title">Recent Announcements</h3>
                  <div class="blg-posts">
                    <div class="blg-post">
                      <img src="http://via.placeholder.com/50x50" alt="">
                      <div class="blg-info">
                        <h3>Story Time</h3>
                        <span>May 13 2016 | by <a href="#" title="">admin</a></span>
                        <p>Elipsis magna a terminal nulla elementum morbi elite forte maecenas...</p>
                      </div>
                    </div><!--blg-post end-->
                    <div class="blg-post">
                      <img src="http://via.placeholder.com/50x50" alt="">
                      <div class="blg-info">
                        <h3>Reading Lessons</h3>
                        <span>May 13 2016 | by <a href="#" title="">admin</a></span>
                        <p>Elipsis magna a terminal nulla elementum morbi elite forte maecenas...</p>
                      </div>
                    </div><!--blg-post end-->
                    <div class="blg-post">
                      <img src="http://via.placeholder.com/50x50" alt="">
                      <div class="blg-info">
                        <h3>Education Through Play</h3>
                        <span>May 13 2016 | by <a href="#" title="">admin</a></span>
                        <p>Elipsis magna a terminal nulla elementum morbi elite forte maecenas...</p>
                      </div>
                    </div><!--blg-post end-->
                  </div><!--blg-posts end-->
                </div><!--widget-posts end-->
            </div><!--right-sidebar end-->
          </div>
        </div>
      </div><!--blog_post end-->
    </div>
  </section>
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

</style>