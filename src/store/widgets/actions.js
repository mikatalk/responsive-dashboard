import * as types from './mutations-types'
import DashboardAPI from '@/api/DashboardAPI'

export const loadDashboardData = ({ commit }) => {
  commit(types.SET_LOADING_STATE, true)
  DashboardAPI.loadDashboardData().then(response => {
    const {data} = response
    commit(types.SET_DASHBOARD_DATA, data)
    commit(types.SET_LOADING_STATE, false)
  })
}