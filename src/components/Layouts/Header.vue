<template>
  <header class="pb hp2">
    <div class="top-bar">
      <div class="container">
        <div class="top-left">
          <ul class="social-links">
            <li><a href="https://www.facebook.com/profile.php?id=100086380371270"
                   title="Facebook Page"
                   target="_blank">
              <i class="fa fa-facebook"></i></a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/erasumthana/"
                   title="Linked In"
                   target="_blank">
              <i class="fa fa-linkedin"></i></a>
            </li>
          </ul>
          <!--social-links end-->
          <ul class="contact-add">
            <li><a href="mailto:hdc@gmail.com"><span>hdc@gmail.com</span></a></li>
            <li><a href="tel:+91-8788253421"><span>Call Us: +91-878-825-3421</span></a></li>
          </ul>
        </div>
        <!--top-left end-->
        <div class="top-right">
          <div class="cart-opt">
            <a href="#" title=""><i class="fa fa-bullhorn"></i>Announcements</a>
          </div><!--cart-opt end-->
        </div>
        <!--top-right end-->
      </div>
    </div><!--top-bar end-->
    <div class="bottom-header">
      <div class="container">
        <div class="logo">
          <a href="/" title="ERA International Sumthana, Nagpur"><img src="/assets/images/logo-updated.png" alt="" style="height: 75px;"></a>
        </div><!--logo end-->
        <nav>
          <Menus />
        </nav><!--nav end-->
        <div class="menu-btn">
          <span class="bar1"></span>
          <span class="bar2"></span>
          <span class="bar3"></span>
        </div><!--menu-btn end-->
      </div>
    </div><!--bottom-header end-->
  </header><!--header end-->

  <div class="responsive-mobile-menu">
    <Menus />
  </div><!--responsive-mobile-menu end-->

</template>

<script setup>
import { onMounted } from "vue";
import Menus from "@/components/Layouts/Menus.vue";

onMounted(() => {
  mobileMenusEnable();
});

const mobileMenusEnable = () => {
  jQuery(".menu-btn").on("click", function(){
    jQuery(this).toggleClass("active");
    jQuery(".responsive-mobile-menu").toggleClass("active");
  });

  jQuery(".responsive-mobile-menu ul ul").parent().addClass("menu-item-has-children");
  jQuery(".responsive-mobile-menu ul li.menu-item-has-children > a").on("click", function() {
    jQuery(this).parent().toggleClass("active").siblings().removeClass("active");
    jQuery(this).next("ul").slideToggle();
    jQuery(this).parent().siblings().find("ul").slideUp();
    return false;
  });
}
</script>

<style scoped>

</style>