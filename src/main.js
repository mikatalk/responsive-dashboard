import '@/styles/base.scss'
// import '@/../node_modules/highlight.js/styles/solarized-dark.css'
// import '@/../node_modules/highlight.js/styles/'
import '@/../node_modules/highlight.js/styles/mono-blue.css'
// import '@/../node_modules/highlight.js/styles/monokai.css'
// import '@/../node_modules/highlight.js/styles/monokai-sublime.css'
// import '@/../node_modules/highlight.js/styles/ocean.css'
// import '@/../node_modules/highlight.js/styles/pojoaque.css'

import Vue from 'vue'
import App from './App.vue'

import router from '@/router'
import store from '@/store'

import { sync as syncVuexWithRouter } from 'vuex-router-sync'

import VueHighlightJS from 'vue-highlightjs'

Vue.use(VueHighlightJS)

Vue.config.productionTip = false
Vue.config.devtools = true // process.env.NODE_ENV === 'development'

syncVuexWithRouter(store, router)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
