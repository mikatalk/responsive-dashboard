import * as types from './mutations-types'
import {throttle} from 'lodash'

export const windowUpdateSize = ({ commit }, size) => {
  commit(types.WINDOW_UPDATE_SIZE, { size })
}
