<template>

  <ul>
    <li><a href="/" title="Home">Home</a></li>
    <li><a href="#" title="">About</a>
      <ul>
        <li><router-link :to="{name: 'About', params: {slug: 'our-journey'}}" title="Our Journey">Our Journey</router-link></li>
        <li><router-link :to="{name: 'About', params: {slug: 'from-the-desk-of-director'}}" title="From the Desk of Director">From the Desk of Director</router-link></li>
        <li><router-link :to="{name: 'About', params: {slug: 'from-the-desk-of-principal'}}" title="From the Desk of Principal">From the Desk of Principal</router-link></li>
        <li><router-link to="/about/our-staff" title="Our Staff">Our Staff</router-link></li>
      </ul>
    </li>
    <li><a href="#" title="">Academics</a>
      <ul>

        <li><router-link :to="{name: 'Academics', params: {slug: 'rules-and-regulations'}}" title="Rules and Regulations">Rules and Regulations</router-link></li>
        <li><router-link :to="{name: 'Academics', params: {slug: 'news-room'}}" title="News Room">News Room</router-link></li>
        <li><router-link :to="{name: 'Academics', params: {slug: 'bus-routes'}}" title="Bus Routes">Bus Routes</router-link></li>
        <li><router-link :to="{name: 'Academics', params: {slug: 'time-tables'}}" title="Time Tables">Time Tables</router-link></li>
        <li><router-link :to="{name: 'Academics', params: {slug: 'school-timings'}}" title="School Timings">School Timings</router-link></li>
        <li><router-link :to="{name: 'Academics', params: {slug: 'mandatory-disclosures'}}" title="Mandatory Disclosures">Mandatory Disclosures</router-link></li>
      </ul>
    </li>
    <li><router-link to="/achievements" title="">Achievements</router-link></li>
    <li><a href="#" title="School Activities">Activities</a>
      <ul>
        <li><router-link :to="{name: 'Activities', params: {school: 'play-school'}}" title="Play School">Play School</router-link></li>
        <li><router-link :to="{name: 'Activities', params: {school: 'international-school'}}" title="International School">International School</router-link></li>
      </ul>
    </li>
    <li><router-link to="/announcements" title="Announcements">Announcements</router-link></li>
    <li><router-link to="/contact-us" title="Contact Us">Contact Us</router-link></li>
  </ul>
</template>

<script>
export default {
  name: "Menus"
}
</script>

<style scoped>

</style>