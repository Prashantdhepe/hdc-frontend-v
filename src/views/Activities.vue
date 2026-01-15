<template>
  <div>
  <section class="pager-sec">
    <div class="container">
      <div class="pager-pag">
        <h3>ACTIVITIES</h3>
        <h4>{{ title }}</h4>
      </div><!--pager-pag end-->
    </div>
  </section><!--pager-sec end-->
  <section class="block5">
    <div class="container">
      <div class="blog-posts no-mg">
        <div class="row">
        <template v-for="(post, index) in posts" :key="index">
          <div class="col-lg-4">
            <div class="blog-post">
              <div class="post-img">
                <!-- <img src="" alt="" class="activity-img"> -->
                <img :src="getImageUrl(post.media_galleries)" alt="" class="activity-img">
                <router-link :to="{name: 'ActivityDetail', params: {school: school, slug: post.slug}}" :title="post.title"><i class="fa fa-plus"></i></router-link>
                <span class="post-date"><i class="fa fa-picture-o"></i>{{ post.published_at }}</span>
              </div><!--post-img end-->
              <div class="post-info">
                <h3><router-link :to="{name: 'ActivityDetail', params: {school: school, slug: post.slug}}" :title="post.title">{{ post.title }}</router-link></h3>
                <p v-html="post.content"></p>
                <router-link :to="{name: 'ActivityDetail', params: {school: school, slug: post.slug}}" :title="post.title">Read More</router-link>
              </div><!--post-info end-->
            </div><!--blog-post end-->
          </div>
        </template>
        </div>
      </div><!--blog-posts end-->
    </div>
  </section>
</div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import {onMounted, ref, watch} from "vue";
import axiosClient from "@/axios";

const route = useRoute();
const error = ref(null);
const content = ref("");
const title = ref("");
const posts = ref([]);
const school = ref("");


watch(
    () => route.params.school,
    (newVal, oldVal) => {
      fetch();
    }
);
const fetch = async () => {
  school.value = route.params.school;
  try {
    const response = await axiosClient.get(`/activities/${school.value}`);
    content.value = response.data.data;
    //console.log(response)
    title.value = response.data.school;
    posts.value = response.data.posts;
    posts.value.forEach(post => {
      post.media_galleries = JSON.parse(post.media_galleries || "[]").map(image => {
        if (import.meta.env.DEV) {
          return `${import.meta.env.VITE_API_BASE_URL}/storage/${image}`;
        }
        // Production (EC2 + S3)
        return `${import.meta.env.VITE_S3_BASE_URL}/${image}`;
      });
    });
  } catch (e) {

    error.value = "Failed to load activity.";
    console.error(e);
  }
};
const getImageUrl = (mediaGalleries) => {
  if (!mediaGalleries || mediaGalleries.length === 0) {
    return "http://via.placeholder.com/369x375"; 
  }
  const mediaArray = typeof mediaGalleries === "string" ? JSON.parse(mediaGalleries) : mediaGalleries;

  if (mediaArray.length > 0) {
    const imagePath = mediaArray[0];
    if (import.meta.env.DEV) {
      return `${import.meta.env.VITE_API_BASE_URL}/storage/${imagePath}`;
    }
    // Production (EC2 + S3)
    return `${import.meta.env.VITE_S3_BASE_URL}/${imagePath}`;
  }
  return "http://via.placeholder.com/369x375"; 
};

onMounted(() => {
  fetch();
});
</script>

<style scoped>
.post-img {
  display: grid;
  gap: 10px;
  margin-top: 20px; 
  background-color: rgb(228, 228, 236);
}

.post-img img {
  width: 100%;
  height: 300px; 
  object-fit: cover; 
  border-radius: 8px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
}

</style>