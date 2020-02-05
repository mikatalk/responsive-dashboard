import '@/styles/base.scss'
import Vue from 'vue'
import Grid from '@/components/grid/Grid'
import store from '@/store'
import { debounce } from 'lodash-es'

Vue.config.productionTip = false
Vue.config.devtools = process.env.NODE_ENV === 'development'

const container = document.querySelector('#app')

const app = new Vue({
  store,
  render: h => h(Grid)
}).$mount(container)

const handleResize = debounce(() => {
  const {width, height} = app.$el.getBoundingClientRect()
  try {
    window.parent.postMessage({
      'event-type': 'iframe-content-resize',
      width, 
      height
    },
    document.location.origin)
  } catch (e) {
    // nothing to do here
  }
}, 300)
handleResize()
window.addEventListener('resize', handleResize)
