module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/article-assets/build-a-responsive-dashboard-with-vue-js/demo/'
    : '/',
  devServer: {
    port: 47000
  },
  pages: {
    'main': 'src/main.js',
    'demo-iframe': 'src/demo-iframe.js'
  }
}
