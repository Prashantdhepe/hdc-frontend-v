<script setup>
import Header from "@/components/Layouts/Header.vue";
import Footer from "@/components/Layouts/Footer.vue";
</script>

<template>

  <div class="wrapper">

    <Header />

    <router-view></router-view>

    <Footer />

    <a href="#" title="" class="scrollTop"><i class="fa fa-arrow-up"></i></a>


  </div><!--wrapper end-->
</template>
