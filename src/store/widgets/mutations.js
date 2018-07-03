import * as types from './mutations-types'

export default {
  [types.SET_LOADING_STATE] (state, value) {
    state.loading = value
  },
  [types.SET_DASHBOARD_DATA] (state, {widgets}) {
    // Metrics
    state.widgets.transactions.value = widgets.transactions
    state.widgets.weather.value = widgets.weather
    state.widgets.responsiveness.value = widgets.responsiveness
    state.widgets.events.value = widgets.events
    state.widgets.hits.value = widgets.hits
    state.widgets.convertion.value = widgets.convertion
    // SVG Charts
    state.widgets.jsFrameworks.range = widgets.jsFrameworks.range
    state.widgets.jsFrameworks.values = widgets.jsFrameworks.values
    state.widgets.jsFrameworks.labels = widgets.jsFrameworks.labels
    state.widgets.topWines.range = widgets.topWines.range
    state.widgets.topWines.values = widgets.topWines.values
    state.widgets.topWines.labels = widgets.topWines.labels
  }
}
