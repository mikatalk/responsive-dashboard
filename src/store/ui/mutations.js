
import * as types from './mutations-types'

export default {
  [types.WINDOW_UPDATE_SIZE] (state, { size }) {
    state.window.width = size.width || state.window.width
    state.window.height = size.height || state.window.height
  }
}
