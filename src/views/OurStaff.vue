<template>
  <section class="pager-sec">
    <div class="container">
      <div class="pager-pag">
        <h3>OUR STAFF</h3>
        <h4>Our Teaching and Non-teaching Staff</h4>
      </div><!--pager-pag end-->
    </div>
  </section><!--pager-sec end-->
  
  <section class="block5 remove-btm-gap">
			<div class="container">
				<div class="teachers-sec st2">
	    			<div class="row">
              <template v-for="(staff, index) in staffs" :key="index">
                
                <template v-for="(staffType, indexType) in staff" :key="indexType">
                  
                  <div class="col-lg-3 gap-2 pb-2 mb-2" v-for="(sta, indexs) in staffType" :key="indexs">
                  
                    <div class="tch-team ">
                      <h3><a href="javascript:;" :title="sta.school_type.name">{{ sta.school_type.name }}</a></h3>
                      <span>{{ sta.teaching_as!=null ? sta.teaching_as : sta.staff_type.name }}</span>
                      <span>{{ sta.qualification }}</span>
                      <img :src="sta.photo_url" :alt="sta.name" class="staff-avatar ">                      
                    </div>
                  </div>
                </template>
                
              </template>
	    				
	    			</div>
	    		</div><!--teachers-sec end-->
			</div>
		</section>
</template>

<script setup>
import { useRoute } from "vue-router";
import {onMounted, ref, watch} from "vue";
import axiosClient from "@/axios";

const route = useRoute();
const staffs = ref("");

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
  try {
    const response = await axiosClient.get(`/staffs`);
    staffs.value = JSON.parse(JSON.stringify(response.data));
  } catch (e) {

  }
}

</script>

<style scoped>

</style>