import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import ui from './ui'
import widgets from './widgets'
import {throttle} from 'lodash'

const debug = false // process.env.NODE_ENV === 'development'

Vue.use(Vuex)

const store = new Vuex.Store({
  namespaced: true,
  state: {},
  actions: {},
  mutations: {},
  getters: {},
  modules: {
    ui,
    widgets
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})

const handleResize = throttle(() => {
  let size = {
    width: window.innerWidth,
    height: window.innerHeight
  }
  store.dispatch('ui/windowUpdateSize', size)
  // store.commit('ui/WINDOW_UPDATE_SIZE', {size})
}, 150)

handleResize()
window.addEventListener('resize', handleResize)

export default store
