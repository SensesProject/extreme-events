import Vue from 'vue'
import VueRouter from 'vue-router'
import Intro from '../views/Intro.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'intro',
    component: Intro
  },
  {
    path: '/crops',
    name: 'crops',
    component: () => import(/* webpackChunkName: "about" */ '../views/Crops.vue')
  },
  {
    path: '/floods',
    name: 'floods',
    component: () => import(/* webpackChunkName: "about" */ '../views/Floods.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
