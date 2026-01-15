<template>
  <div v-if="loading" class="text-gray-500">Loading announcements...</div>
  <div v-else-if="announcements.length > 0" class="announcement-marquee">
    <Vue3Marquee :duration="30" :clone="true" :pauseOnHover="true">
      <div
        v-for="announcement in announcements"
        :key="announcement.id"
        class="marquee-item"
      >
        📢 {{ announcement.short_description }} | Start Date:
        {{ formatDate(announcement.start_date) }} - End Date:
        {{ formatDate(announcement.end_date) }}
      </div>
    </Vue3Marquee>
  </div>
  <!-- <div v-else-if="loading" class="text-gray-500">Loading announcements...</div>
  <div v-else class="text-gray-500">No announcements found.</div> -->
</template>

<script setup>
import { onMounted, ref } from "vue";
import axiosClient from "@/axios";
// import { Vue3Marquee } from 'vue3-marquee'
import { Vue3Marquee } from "vue3-marquee";

const announcements = ref([]);
const loading = ref(true);
const error = ref(null);

const fetchAnnouncements = async () => {
  try {
    const response = await axiosClient.get("/announcements");
    // console.log("API Response:", response.data);
    announcements.value = response.data.data;

  } catch (err) {
    error.value = "Failed to load announcements.";
    console.error(err);
  } finally {
    loading.value = false;
  }
};

const formatDate = (dateString) => {
    // if (!dateString) return "N/A";
    // return new Date(dateString).toLocaleDateString();
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString();
};

  
//   onMounted(async () => {
//   await fetchAnnouncements();
//   // console.log("Fetched Announcements:", announcements.value);
// });
onMounted(fetchAnnouncements);
</script>

<style scoped>
.announcement-marquee {
  background-color: rgb(235, 145, 42);
  height: 50px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  top: 140px;
  left: 0;
  z-index: 999;
}

.announcement-marquee:hover .vue3-marquee {
  animation-play-state: paused !important;
}

.marquee-item {
  margin-right: 50px;
  padding: 5px 15px;
  border-radius: 8px;
  display: inline-block; 
  white-space: nowrap;
}
</style>