<template>
  <div id="app">
    <header-bar />
    <router-view
      class="router-view" />
    <div class="comments">
      <div id="disqus_thread"></div>
    </div>
    <footer class="footer">
      <div class="copyright">
        <span class="copyright-icon">©</span>
        michael-iriarte.com
      </div>
    </footer>
  </div>
</template>

<script>
import Header from './components/Header.vue'
export default {
  name: 'app',
  components: {
    'header-bar': Header
  },
  mounted () {
    if (process.env.NODE_ENV === 'production') {
      const script = document.createElement('script')
      script.src = 'https://mika-i.disqus.com/embed.js'
      script.setAttribute('data-timestamp', +new Date())
      document.body.appendChild(script)
    }
  }
}
</script>

<style lang="scss">
@import "styles/variables";

#app {
  min-height: 100vh;

  .router-view {
    min-height: calc(100vh - 80px);
    margin-top: 80px;
  }
  .comments {
    margin: 20px;
    #disqus_thread {
      max-width: $nav-max-width;
      margin: 0 auto;
    }
  }
  .footer {
    background: transparent;
    text-align: center;
    min-height: auto;
    color: #030303;
    font-size: 0.8rem;
    vertical-align: middle;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    .copyright {
      * {
        color: inherit;
        text-decoration: none;
      }
      .copyright-icon {
        font-size: 0.6rem;
      }
    }
  }
}
</style>
