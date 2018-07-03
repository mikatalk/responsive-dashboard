module.exports = {
  baseUrl: process.env.NODE_ENV === 'production'
    ? 'https://www.michael-iriarte.com/articles/responsive-vue-dashboard'
    : '/',
  devServer: {
    port: 47000
  }
}
