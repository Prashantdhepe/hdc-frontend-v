<template>
  <section class="pager-sec">
    <div class="container">
      <div class="pager-pag">
        <h3>ABOUT US</h3>
        <h4>{{ content.title }}</h4>
      </div><!--pager-pag end-->
    </div>
  </section><!--pager-sec end-->
  <section class="block6 no-padding">
    <div class="container">
      <div v-html="content.content"></div>
    </div>
  </section>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import {onMounted, ref, watch} from "vue";
import axiosClient from "@/axios";

const route = useRoute();
const content = ref("");
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
  let params = route.params.slug;
  try {
    const response = await axiosClient.get(`/about/${params}`);
    content.value = JSON.parse(JSON.stringify(response.data));
  } catch (e) {

  }
}
</script>

<style scoped>

</style>