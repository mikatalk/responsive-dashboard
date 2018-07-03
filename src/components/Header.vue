<template>
  <header class="header">
    <nav class="nav"
      :class="{
        'mode-page': false, // invertedScrollRatio !== 0,
        'mode-header': true // invertedScrollRatio === 0
      //  'mode-page': invertedScrollRatio !== 0,
      //  'mode-header': invertedScrollRatio === 0
      }">
      <router-link to="/" class="logo">
        <svg viewBox="0 0 150 100"
          width="150"
          :style="{
            height: headerHeight
          }">
          <polygon points="0,0 50,50, 0,50" 
            :style="{fill: colorA.bg}"
            style="transition: fill 1500ms ease; stroke:none;stroke-width:0;fill-rule:nonzero;"/>
          <polygon points="100,0 50,50, 100,50" 
            :style="{fill: colorA.bg}"
            style="transition: fill 1500ms ease; stroke:none;stroke-width:0;fill-rule:nonzero;"/>
          <polygon points="100,0 150,0, 100,50" 
            :style="{fill: colorB.bg}"
            style="transition: fill 1500ms ease; stroke:none;stroke-width:0;fill-rule:nonzero;"/>
          <polygon points="100,50 100,100, 150,100" 
            :style="{fill: colorB.bg}"
            style="transition: fill 1500ms ease; stroke:none;stroke-width:0;fill-rule:nonzero;"/>
        </svg>
      </router-link>
      <link-icons />
    </nav>
  </header>
</template>

<script>
import LinkIcons from '@/components/LinkIcons'
import { mapGetters } from 'vuex'
export default {
  name: 'Header',
  components: {
    'link-icons': LinkIcons
  },
  data () {
    return {
      invertedScrollRatio: 0,
      headerHeight: 50
    }
  },
  computed: {
    ...mapGetters({
      'colorA': 'ui/colorA',
      'colorB': 'ui/colorB'
      // 'invertedScrollRatio': 'ui/invertedScrollRatio',
      // 'headerHeight': 'ui/headerHeight'
    })
  }
}
</script>

<style lang="scss">
@import "./../styles/variables";
.header {
  background-color: $nav-bg;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: $z-index-nav;
  .nav {
    position: relative;
    overflow: hidden;
    max-width: $nav-max-width;
    margin: 0 auto;
    // margin-top: -5px;
    padding: 0 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    // @media (max-width: $mobile-size) {
    //   margin: 5px 0px;
    // }
    .logo {
      width: 60px;
      margin: 0 auto 0 0;
      transition: width 400ms ease;
      svg {
        margin: 10px 0px;
        width: 100%;
        max-width: 40vmin;
        path {
          transition: fill 1500ms ease;
        }
        @media (min-width: $nav-max-width) {
          margin: 5px 0px;
        }
      }
    }
    .link-icons {
      position: absolute;
      top: 0;
      right: 0;
      transition: $transition-header;
      .icon {
        transition: $transition-header;
        transition-duration: 400ms;
        top: 15px;
        right: 0;
        position: absolute;
        transform-origin: center;
        transform: scale(1);
        opacity: 1;
        &:nth-child(1) {
          right: 90px;
          transition-delay: 100ms;
        }
        &:nth-child(2) {
          right: 50px;
          transition-delay: 300ms;
        }
        &:nth-child(3) {
          right: 10px;
          transition-delay: 500ms;
        }
      }
    }
    &.mode-header { /* inherit default from above */ }
    &.mode-page {
      .logo {
        width: 100%;
      }
      .link-icons {
        .icon {
          transition: $transition-header;
          transition-duration: 200ms;
          top: 20px;
          right: 0;
          position: absolute;
          width: 30px;
          height: 30px;
          transform-origin: center;
          right: -50px;
          transform: scale(0);
          opacity: 0;
          &:nth-child(1) {
            transition-delay: 150ms;
          }
          &:nth-child(2) {
            transition-delay: 75ms;
          }
          &:nth-child(3) {
            transition-delay: 0ms;
          }
        }
      }
    }
  }
}
</style>
  