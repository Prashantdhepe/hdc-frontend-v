<template>
    <section class="pager-sec">
      <div class="container">
        <div class="pager-pag">
          <h3>Events</h3> 
        </div>
      </div>
    </section>
    <section class="block6">
        <div class="container">
          <div class="blog-post-page">
            <div class="row">
              <div class="col-lg-9">
                <div class="posts-page">
                  <!-- Loader -->
                  <div v-if="loading" class="text-gray-500 text-center">
                    <i class="fa fa-spinner fa-spin"></i> Loading...
                  </div>
  
                  <!-- events List -->
                  <div v-else-if="eventdetails">
                    <div
                      
                      class="post-blog border rounded-md shadow-md p-4 mb-4"
                    >
                      <h3 class="post-title">
                        <i class="fa fa-thumb-tack"></i>
                        {{ eventdetails.school_type }}
                      </h3>
                      <span class="post-date">
                        <i class="fa fa-bullhorn"></i>
                        {{ formatDate(eventdetails.start_date) }} - {{ formatDate(eventdetails.end_date) }}
                      </span>
                      <div class="blog-post-info mt-2">
                        <ul class="post-tg">
                            <li class="ad-author">
                                <span>By</span>
                                <a href="#" title="user-name" class="ad-name m-1">{{ eventdetails.user?.name || 'Unknown User' }}</a>
                            </li>
                            <li>
                                <i class="fa fa-sitemap"></i>
                                <a href="#" title="">{{ eventdetails.school_type }}</a>
                            </li>
                        </ul>
                        <!-- <p class="text-gray-700">{{ eventdetails.description }}</p> -->
                        <p class="text-gray-700" v-html="eventdetails.description"></p>
                      </div>
                    </div>
                  </div>
  
                  <!-- No events Message -->
                  <div v-else class="text-gray-500">No events found.</div>
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
                    <h3 class="widget-title">Upcoming Events</h3>
                    <!-- <div class="blg-posts"> -->
                    <div class="blg-posts" v-if="upcomingEvents.length > 0">
                      <div class="blg-post" v-for="event in upcomingEvents" :key="event.id">
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
                      <p>No Upcoming Events...</p>
                    </div>
                  </div>

                </div>
              </div>
              <!-- Sidebar End -->
            </div>
          </div>
        </div>
      </section>
</template>
<script setup>
import { onMounted, ref } from "vue";
import axiosClient from "@/axios";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
  
const eventdetails = ref(null);
const upcomingEvents = ref([]);
const events = ref([]);
const loading = ref(true);
const error = ref(null);

const fetcheventdetails = async () => {
  try {
    const response = await axiosClient.get(`/events/${route.params.id}`);
    eventdetails.value = response.data.data;

    if (eventdetails.value.user_id) {
      eventdetails.value.user = { name: await fetchUser(eventdetails.value.user_id) };
    }
    // upcomingEvents.value = response.data.data.slice(0, 3);
  } catch (err) {
    error.value = "Failed to load events.";
    console.error(err);
  } finally {
    loading.value = false;
  }
};

const fetchUpcomingEvents = async () => {
  try {
    const response = await axiosClient.get("/events");
    
    if (response.data && response.data.data) {
      const currentDate = new Date();
      let upcomingEventsData = response.data.data.filter(event => 
        new Date(event.start_date) > currentDate
      ).slice(0, 3);

      for (let event of upcomingEventsData) {
        if (!event.user && event.user_id) {
          event.user = { name: await fetchUser(event.user_id) };
        }
      }
      upcomingEvents.value = upcomingEventsData;
    } else {
      upcomingEvents.value = [];
    }
    console.log("Upcoming Events:", upcomingEvents.value);
   
  } catch (err) {
    console.error("Error fetching upcoming events:", err);
    upcomingEvents.value = [];
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
  
const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString();
};
  
  
onMounted( () => {
  fetcheventdetails();
  fetchUpcomingEvents();
});
</script>