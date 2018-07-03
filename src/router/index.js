import Vue from 'vue'
import Router from 'vue-router'
import Demo from '@/views/Demo.vue'
import Tutorial from '@/views/Tutorial.vue'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  // base: '/',
  routes: [
    {
      path: '/demo',
      name: 'Demo',
      component: Demo
    },
    {
      path: '*',
      name: 'Tutorial',
      component: Tutorial
    }
  ]
})
