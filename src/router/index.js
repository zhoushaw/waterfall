import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Waterfall from '../views/waterfall.vue';

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
  }
]

const router = new VueRouter({
  routes
})

export default router
