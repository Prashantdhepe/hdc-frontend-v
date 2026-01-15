<template>
    <section class="pager-sec">
      <div class="container">
        <div class="pager-pag">
          <h3>Events</h3> 
        </div>
      </div>
    </section>
    <section class="block5">
    <div class="container">
      <div class="blog-post-page">
        <div class="row">
          <div class="col-lg-9 ">
            <div class="col-lg-6 flex min-w-[300px] min-h-[300px] posts-page" v-for="event in paginateEvents" :key="event.id">
              <!-- Loader -->
              <div v-if="loading" class="text-gray-500 text-center">
                <i class="fa fa-spinner fa-spin"></i> Loading...
              </div>

              <!-- Event List -->
              <div class="post-blog border rounded-md shadow-md p-4 mb-4">
                <h3 class="post-title mt-5">
                  <i class="fa fa-thumb-tack"></i>
                  {{ event.school_type }}
                </h3>
                <span class="post-date">
                  <i class="fa fa-bullhorn"></i>
                  {{ formatDate(event.start_date) }} - {{ formatDate(event.end_date) }}
                </span>
                <div class="blog-post-info mt-2">
                  <ul class="post-tg flex items-center gap-2">
                    <li class="ad-author">
                      <span>By</span>
                      <a href="#" title="user-name" class="ad-name m-1">
                        {{ event.user?.name || 'Unknown User' }}
                      </a>
                    </li>
                    <li>
                      <i class="fa fa-sitemap"></i>
                      <a href="#" title="">{{ event.school_type }}</a>
                    </li>
                  </ul>
                  <p class="text-gray-700">{{ event.short_description.substring(0, 50) }}...</p>
                  <router-link :to="{ name: 'EventDetail', params: { id: event.id } }">
                    Read More
                  </router-link>
                </div>
              </div>
            </div>
          </div>
          <!-- Sidebar Section -->
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
                  </div>

                  <div class="widget widget-posts">
                    <h3 class="widget-title">Recent Events</h3>
                    <!-- <div class="blg-posts"> -->
                    <div class="blg-posts" v-if="recentevents.length > 0">
                      <div class="blg-post" v-for="event in recentevents" :key="event.id">
                        <div class="blg-info">
                          <h3>{{ event.school_type }}</h3>
                          <span>{{ formatDate(event.start_date) }} | by 
                            <a href="#" title="Author">{{ event.user?.name || 'Unknown' }}</a>
                          </span>
                          <p>{{ event.description.substring(0, 50) }}...</p>
                        </div>
                      </div>
                    </div>
                    
                    <div v-else>
                      <p>No Recent Events...</p>
                    </div>
                  </div>

                </div>
              </div>
              <!-- Sidebar End -->
        </div>
        <!-- Pagination -->
                
        <div class="pagination-numbs flex gap-4 justify-center">
          <button @click="prevPage" :disabled="currentPage === 1" class="bg-grey-300 px-4 py-2 mr-5 rounded-md">Previous</button>
          <span class="text-lg font-medium">Page {{ currentPage }} of {{ totalPages }}</span>
          <button @click="nextPage" :disabled="currentPage === nextPage" class="bg-grey-300 px-4 py-2 ml-5 rounded-md">Next</button>
        </div>
     
        <!-- end Pagination -->
        <!-- No events Message -->
        <div v-if="!loading && events.length === 0" class="text-gray-500 text-center mt-4">
          No events found.
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import { computed, onMounted, ref, watch } from "vue";
import axiosClient from "@/axios";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const events = ref([]);
const recentevents = ref([]);
const loading = ref(true);
const error = ref(null);
const currentPage = ref(1);
const eventsPerPage = 6;


const fetchevents = async () => {
  
  try {
    const response = await axiosClient.get("/events/recent");
    console.log("API Response:", response.data);
    events.value = response.data.data;
    recentevents.value = response.data.data.slice(0, 3);
  } catch (err) {
    error.value = "Failed to load events.";
    console.error(err);
  } finally {
    loading.value = false;
  }
};

const fetchUser = async (userId) => {
  try {
    const response = await axiosClient.get(`/users/${userId}`);
    return response.data.name;
  } catch (e) {
    console.error("Error fetching user details:", e);
    return "Unknown User";
  }
};

const paginateEvents = computed(()=>{
  const start = (currentPage.value - 1) * eventsPerPage;
  return events.value.slice(start, start + eventsPerPage);
});

const totalPages = computed(()=> Math.ceil(events.value.length/eventsPerPage));

const nextPage = ()=>{
  if(currentPage.value < totalPages.value){
    currentPage.value++;
  }
};

const prevPage = ()=> {
  if(currentPage.value > 1){
    currentPage.value--;
  }
}
  
const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString();
};
  
//   onMounted(fetchevents);
  
onMounted(async () => {
  await fetchevents();
  if (events.value && events.value.length > 0) {
    for (let event of events.value) {
      if (event.user_id) {
        event.user = { name: await fetchUser(event.user_id) };
      }
    }
  }
});
</script>
<style scoped>


</style>