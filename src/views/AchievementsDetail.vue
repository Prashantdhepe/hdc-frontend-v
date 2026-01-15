<template>
    <section class="pager-sec">
      <div class="container">
        <div class="pager-pag">
          <h3>Achivements Details</h3> 
        </div>
      </div>
    </section>
    <section class="block6">
        <div class="container">
            <div class="blog-post-page">
                <div class="row">
                    <div class="col-lg-9">
                        <div class="posts-page">

                            <div v-if="isLoading" class="loading-message">
                                Loading achievements details...
                            </div>    
                            <div v-else-if="post" class="post-page">
                                <div class="post-blog">
                                    <h3 class="post-title"><i class="fa fa-thumb-tack"></i>{{ post.title }}</h3>
                                        <span class="post-date"><i class="fa fa-picture-o"></i>{{ post.published_at }}</span>
                                    <div class="blog-post-info">
                                        <ul class="post-tg">
                                            <li class="ad-author">
                                                <span>By</span>
                                                <a href="#" title="user-name" class="ad-name m-1">{{ post.user?.name || 'Unknown User' }}</a>
                                            </li>
                                            <li>
                                                <i class="fa fa-sitemap"></i>
                                                <a href="#" title="">{{ title }}</a>
                                                
                                            </li>
                                        </ul>
                                        <p v-html="post.content"></p>
                                        <div v-if="post.media_galleries && post.media_galleries.length" class="post-gallery">
                                          <div v-for="(image, index) in post.media_galleries" :key="index" class="post-img">
                                            <img :src="getImageUrl(image)" alt="achievements Image" @click="openImageDialog(image)" />
                                          </div>
                                        </div>
                                        
                                    </div><!--blog-post-info end-->
                                </div><!--post-blog end-->

                            </div>
                            <div v-else class="error-message">
                                Achievements not found.
                            </div>
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
                            </div><!--widget-text end-->

                            <div class="widget widget-categories">
                                <h3 class="widget-title">Calendar</h3>
                                <VDatePicker
                                  v-model.range="range"
                                  :mode="mode" 
                                  :rules="rules"
                                  :attributes="calendarAttributes"
                                />
                            </div>
                        </div><!--right-sidebar end-->
                    </div>
                
                </div>
            </div><!--blog_post end-->
        </div>
        <div v-if="selectedImage" class="image-modal">
                  <div class="modal-overlay" @click="closeImageDialog"></div>
                  <div class="modal-content">
                    <span class="close-btn" @click="closeImageDialog"><i class="fa fa-window-close" aria-hidden="true"></i>
                    </span>
                    <img :src="selectedImage" alt="Full Image" />
                  </div>
                </div>
    </section>

</template>
<script setup>
import { useRoute } from "vue-router";
import { watch, onMounted, ref } from "vue";
import axiosClient from "@/axios";

const route = useRoute();
const content = ref("");
const title = ref("");
const post = ref(null);
const school = ref("");
const isLoading = ref(true);
const allPosts = ref([]);
const selectedImage = ref(null);

const range = ref({ start: null, end: null });
const events = ref([]);
const calendarAttributes = ref([]);

const mode = ref('date');
const rules = ref([
  {
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
  },
  {
    hours: 23,
    minutes: 59,
    seconds: 59,
    milliseconds: 999,
  },
]);

const fetchEvents = async () => {
  try {
    const response = await axiosClient.get("/events/recent");
    events.value = response.data.data;

    if (events.value.length > 0) {
      const startDate = new Date(Math.min(...events.value.map(event => new Date(event.start_date))));
      const endDate = new Date(Math.max(...events.value.map(event => new Date(event.end_date))));
      range.value.start = startDate;
      range.value.end = endDate;
    }
    calendarAttributes.value = events.value.map(event => ({
      key: event.id,
      highlight: 'blue',
      dates: { start: new Date(event.start_date), end: new Date(event.end_date) },
      popover: {
        label: event.title || 'Event',
      },
    }));

  } catch (error) {
    console.error("Error fetching events:", error);
  }
};

onMounted(async () => {
  await fetchEvents();
  await fetch();
  if (post.value?.user_id) {
    post.value.user = { name: await fetchUser(post.value.user_id) };
  }
});

watch(
  () => route.params.id,
  (newVal, oldVal) => {
    if (newVal !== oldVal) {
      fetch();
    }
  }
);

const fetchUser = async (userId) => {
  try {
    const response = await axiosClient.get(`/users/${userId}`);
    return response.data.name;
  } catch (e) {
    console.error("Error fetching user details:", e);
    return "Unknown User";
  }
};

const fetch = async () => {
  school.value = route.params.school;

  try {
    isLoading.value = true;
    const response = await axiosClient.get(`/achievements/${route.params.id}`);
    post.value = response.data;

    if (post.value) {
      title.value = post.value.title;
      content.value = post.value.content;

      if (typeof post.value.media_galleries === "string") {
        post.value.media_galleries = JSON.parse(post.value.media_galleries);
      }

      post.value.media_galleries = post.value.media_galleries?.map((image) => {
        return `${import.meta.env.VITE_API_BASE_URL}/storage/${image}`;
      });
    } else {
      console.error("Post not found");
    }
  } catch (e) {
    console.error("Error fetching activity details:", e);
  } finally {
    isLoading.value = false;
  }
};

const getImageUrl = (image) => {
  return image; 
};

const openImageDialog = (image) => {
  selectedImage.value = image;
};
const closeImageDialog = () => {
  selectedImage.value = null;
};
</script>
<style scoped>
.loading-message,
.error-message {
  text-align: center;
  padding: 20px;
  font-size: 18px;
  color: #666;
}

.post-gallery {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 20px;
  justify-content: center; 
}

.post-img {
  flex: 1 1 calc(50% - 10px); 
  max-width: calc(50% - 10px); 
  box-sizing: border-box;
}

.post-img img {
  width: 100%;
  height: 300px; 
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
}

.widget-text ul {
  list-style: none;
  padding: 0;
}

.widget-text ul li {
  margin-bottom: 10px;
}

.widget-text ul li a {
  text-decoration: none;
  color: #333;
}

.widget-text ul li a:hover {
  color: #007bff;
}
.image-modal {
  position: fixed;
  top: 50px;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-overlay {
  position: absolute;
  width: 100%;
  height: 100%;
}

.modal-content {
  position: relative;
  max-width: 90%;
  max-height: 90%;
  background: rgb(247, 242, 242);
  padding: 5px;
  border-radius: 1px;
  text-align: center;
}

.modal-content img {
  max-width: 100%;
  max-height: 80vh;
  border-radius: 1px;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: 50px;
  font-weight: bold;
  color: #333;
  cursor: pointer;
}
router-link {
    font-weight: bold;
}

</style>