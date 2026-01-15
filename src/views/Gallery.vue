<script setup>
import { useRoute } from "vue-router";
import { ref, onMounted, computed } from 'vue';
import axiosClient from '@/axios';

const route = useRoute();
const title = ref("");
const galleries = ref([]);
const schoolTypes = ref([]);
const selectedFilter = ref("all");
const selectedImage = ref(null);

onMounted(() => {
  fetchGalleries();
  fetchSchoolTypes();
});

const fetchGalleries = async () => {
  try {
    const response = await axiosClient.get('/galleries');
    galleries.value = response.data.data;
  //   console.log('Galleries:', galleries.value); 
  } catch (error) {
    console.error('Error fetching galleries:', error);
  }
};

const fetchSchoolTypes = async () => {
  try {
    const response = await axiosClient.get('/school-types');
    schoolTypes.value = response.data;
  //   console.log('School Types:', schoolTypes.value); 
  } catch (error) {
    console.error('Error fetching school types:', error);
  }
};

const filteredGalleries = computed(() => {
  if (selectedFilter.value === 'all') {
    // return galleries.value; 
    return galleries.value.filter(gallery => gallery.media_type === 'image');
  } else if (selectedFilter.value === 'videos') {
    return galleries.value.filter(gallery => gallery.media_type === 'video');
  } else {
    // return galleries.value.filter(gallery => gallery.school_type.slug === selectedFilter.value);
    return galleries.value.filter(
      gallery =>
        gallery.school_type?.slug === selectedFilter.value &&
        gallery.media_type === 'image'
    );
  }
});

const filterGallery = (filter) => {
  selectedFilter.value = filter;
};


const getImageUrl = (imagePath) => {
  if (!imagePath) {
    return "http://via.placeholder.com/369x375"; 
  }
  if (import.meta.env.DEV) {
    return `${import.meta.env.VITE_API_BASE_URL}/storage/${imagePath}`;
  }
  // Production (EC2 + S3)
  return `${import.meta.env.VITE_S3_BASE_URL}/${imagePath}`;
};

const openImageDialog = (image) => {
  selectedImage.value = getImageUrl(image);
};

const closeImageDialog = () => {
  selectedImage.value = null;
};

const extractYouTubeId = (url) => {
  const regExp = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^\s&]+)/;
  const match = url.match(regExp);
  return match ? match[1] : null;
};

</script>
<template>
<div>
      <section class="pager-sec">
        <div class="container">
          <div class="pager-pag">
            <h3>Gallery</h3>
          </div>
        </div>
      </section>
  
      <section class="block6">
          <div class="container">
              <div class="blog-post-page">
                  <div class="row">
                      <div class="col-lg-12">
                          <div class="options">
                              <div class="option-isotop">
                              <ul id="filter" class="option-set filters-nav" data-option-key="filter">
                                  <li>
                                  <a :class="{ selected: selectedFilter === 'all' }" @click="filterGallery('all')">
                                      Filter - All
                                  </a>
                                  </li>
                                  <li v-for="schoolType in schoolTypes" :key="schoolType.id">
                                  <a :class="{ selected: selectedFilter === schoolType.slug }" @click="filterGallery(schoolType.slug)">
                                      {{ schoolType.name }}
                                  </a>
                                  </li>
                                  <li>
                                    <a :class="{ selected: selectedFilter === 'videos' }" @click="filterGallery('videos')">
                                      Videos
                                    </a>
                                  </li>
                              </ul>
                              </div>
                          </div>
                            <div class="posts-page">
                              <div class="gallery-item">
                                  <template v-for="(gallery, index) in filteredGalleries" :key="index">
                                    
                                    <template v-if="gallery.media_type === 'image'">
                                      <template v-for="(image, imgIndex) in gallery.media_path" :key="imgIndex">
                                          <!-- <div class="post-img">
                                              <img :src="getImageUrl(image)" alt="Gallery Image" @click="openImageDialog(image)" />
                                          </div> -->
                                        <div class="post-img">
                                          <img
                                            :src="getImageUrl(image)"
                                            alt="Gallery Image"
                                            @click="openImageDialog(image)"
                                          />
                                        </div>
                                      </template>
                                    </template>

                                    <template v-else-if="gallery.media_type === 'video' && gallery.youtube_url">
                                      <div class="post-img">
                                        <iframe
                                          :src="`https://www.youtube.com/embed/${extractYouTubeId(gallery.youtube_url)}`"
                                          frameborder="0"
                                          allowfullscreen
                                          style="width: 100%; height: 100%; border-radius: 5px;"
                                        ></iframe>
                                      </div>
                                    </template>
                                  </template>
                              </div>
                            </div> <!--posts-page end-->
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
</div>
</template>
  
<style scoped>
  
.posts-page {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center; 
}
.gallery-item {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: flex-start;
    width: 100%;
}
.post-img {
    flex: 1 1 calc(33.33% - 10px);
    max-width: calc(33.33% - 10px);
    height: 250px; 
    box-sizing: border-box;
    overflow: hidden;
    border-radius: 5px;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: center;
    align-items: center;
}
.post-img img {
    width: 100%;
    height: 100%;
    object-fit: cover; 
    border-radius: 5px;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
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
</style>