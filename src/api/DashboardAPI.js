import axios from 'axios'

const API = {
  base: './assets',
  route: 'dashboard-data.json'
}

const client = axios.create({
  baseURL: API.base
})

export default class DashboardAPI {
  static loadDashboardData () {
    return client.get(API.route)
  }
}