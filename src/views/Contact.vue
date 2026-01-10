<script lang="ts" setup>
import { reactive, computed, ref, onMounted } from 'vue';
import axiosClient from '@/axios.js';
import PageTitle from '../components/PageTitle.vue';
// import { script } from '@/script.ts';
// import { initGoogleMap } from '@/googleMap.js';

const model = ref({
    name: '',
    email: '',
    subject: '',
    message: ''
})
const message = ref('');

const submitForm = async () => {
    try {
        const response = await axiosClient.post('/contacts', model.value)
        message.value = response.data.message
        setTimeout(() => {
            message.value = ''
        }, 5000)
        model.value = { name: '', email: '', subject: '', message: '' }


    } catch (err) {
        console.error('Error:', err)
    }
}
onMounted(() => {
    // initGoogleMap();
    // script();
});
</script>
<template>
  <section class="pager-sec">
    <div class="container">
      <div class="pager-pag">
        <h3>CONTACT US</h3>
        <h4>WE WILL BE GLAD TO TALK TO YOU</h4>
      </div><!--pager-pag end-->
    </div>
  </section><!--pager-sec end-->


  <section>
    <div class="block no-padding">
      <div id="map">
        <!-- <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.886264145278!2d78.99809661476344!3d21.037236385993793!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd495f8ef89ae43%3A0xdd6743ae9bddd654!2sEra%20International%20school%20Sumthana!5e0!3m2!1sen!2sin!4v1664794919117!5m2!1sen!2sin" width="1520" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> -->
      <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3732.415763172148!2d77.00797227915959!3d20.69333493155663!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1767632418183!5m2!1sen!2sin" width="1520" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      </div>
    </div>
  </section>


  <section class="block6 no-padding">
    <div class="container">
      <div class="contact-info-pg">
        <div class="row">
          <div class="col-lg-6">
            <div class="our-address-info">
              <h3 class="title-hd">HDC School</h3>
              <ul>
                <li>
                  <span><i class="fa fa-home"></i></span>
                  <p>Adarsha Colony, Akola, Maharashtra-444401</p>
                </li>
                <li>
                  <span><i class="fa fa-phone"></i></span>
                  <p><a href="tel:+91-90755 27270">+91-87882-53421</a></p>
                </li>
                <li>
                  <span><i class="fa fa-envelope"></i></span>
                  <p><a href="mailto:erasumthanasmm@gmail.com">hdcschool@gmail.com</a></p>
                </li>
                <li>
                  <span><i class="fa fa-globe"></i></span>
                  <p><a href="#">www.hdcschool.in</a></p>
                </li>
              </ul>
            </div><!--our-address-info end-->
          </div>
          <div class="col-lg-6">
            <div class="our-address-info enquiry-sec">
              <h3 class="title-hd">We would love to hear from you!</h3>
              <div class="contact_sec">
                <form @submit.prevent="submitForm">
                  <div v-if="message" class="alert alert-success">
                                    {{ message }}
                  </div>
                  <div class="row">
                    <div class="col-lg-6">
                      <div class="input-field">
                        <input id="form_name" v-model="model.name" type="text" name="name" placeholder="Name" required>
                      </div><!--input-field end-->
                      <div class="input-field">
                        <input id="form_email" v-model="model.email" type="text" name="email" placeholder="Email" required>
                      </div><!--input-field end-->
                      <div class="input-field">
                        <input id="form_subject" v-model="model.subject" type="text" name="subject" placeholder="Subject" required>
                      </div><!--input-field end-->
                    </div>
                    <div class="col-lg-6">
                      <div class="input-field">
                        <textarea id="form_message" v-model="model.message" placeholder="Message"></textarea>
                      </div>
                    </div>
                    <div class="col-lg-12">
                      <div class="btn-submit">
                        <button type="submit" name="submit-form">SUBMIT</button>
                      </div><!--btn-submit end-->
                    </div>
                  </div>
                </form>
              </div><!--contact_sec end-->
            </div><!--enquiry-sec end-->
          </div>
        </div>
      </div>
    </div>
  </section>

</template>

<style scoped>

</style>