import state from './state'
import mutations from './mutations'
import * as actions from './actions'
import getters from './getters'

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
