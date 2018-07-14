import * as types from './mutations-types'

export const windowUpdateSize = ({ commit }, size) => {
  commit(types.WINDOW_UPDATE_SIZE, { size })
}
