import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Contact from '../views/Contact.vue'
import About from '../views/About.vue'
import OurStaff from '../views/OurStaff.vue'
import Academics from '../views/Academics.vue'
import Achievements from '../views/Achievements.vue'
import Activities from '../views/Activities.vue'
import Gallery from '../views/Gallery.vue'
import ActivityDetail from '../views/ActivityDetail.vue'
import Announcement from '../views/Announcements.vue'
import Event from '../views/Event.vue'
import EventDetail from '../views/EventsDetail.vue'
import AchievementsDetail from '../views/AchievementsDetail.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about/:slug',
    name: 'About',
    component: About
  },
  {
    path: '/about/our-staff',
    name: 'Staff',
    component: OurStaff
  },
  {
    path: '/academics/:slug',
    name: 'Academics',
    component: Academics
  },
  {
    path: '/achievements',
    name: 'Achievements',
    component: Achievements
  },
  {
    path: '/achievements/:id',
    name: 'AchievementsDetail',
    component: AchievementsDetail
  },
  {
    path: '/activities/:school',
    name: 'Activities',
    component: Activities
  },  
  {
    path: '/activity/:school/:slug',
    name: 'ActivityDetail',
    component: ActivityDetail
  },
  {
    path: '/gallery',
    name: 'gallery',
    component: Gallery
  },
  {
    path: '/event',
    name: 'event',
    component: Event
  },
  {
    path: '/event/:id',
    name: 'EventDetail',
    component: EventDetail
  },
  {
    path: '/announcements',
    name: 'announcements',
    component: Announcement
  },
  {
    path: '/contact-us',
    name: "Contact",
    component: Contact
  }
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkActiveClass: "active",
  linkExactActiveClass: "exact-active",
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { left: 0, top: 0 }
  }
})

export default router;