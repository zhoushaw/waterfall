import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import ImgWaterfall from '../views/Img.vue';
import Waterfall from '../views/waterfall.vue';
import recyclist from '../views/recyclist.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/waterfall',
    name: 'waterfall',
    component: Waterfall
  },
  {
    path: '/img',
    name: 'imgWaterfall',
    component: ImgWaterfall
  },
  {
    path: '/recyclist',
    name: 'recyclist',
    component: recyclist
  }
]

const router = new VueRouter({
  routes
})

export default router
