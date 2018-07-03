<template>
  <div class="widget widget-map-3d">
    <h3 class="title">{{title}}</h3>
    <div class="canvas-container" ref="container">
      <canvas ref="canvas"></canvas>
    </div>
  </div>
</template>

<script>
import GL from '@/gl/'
import { mapGetters } from 'vuex'

export default {
  name: 'WidgetMap3D',
  props: {
    title: {
      type: String,
      default: "title"
    }
  },
  computed: {
    ...mapGetters({
      'windowWidth': 'ui/windowWidth'
    })
  },
  watch: {
    windowWidth () {
      this.gl.handleResize()
    }
  },
  mounted () {
    this.gl = new GL(this.$refs.canvas, this.$refs.container)
  },
  beforeDestroy () {
    this.gl.destroy()
  }
}
</script>


<style lang="scss">
@import "./../../styles/variables.scss";

div.widget.widget-map-3d {
  display: block;
  .title {
    color: $accent-color;
    margin: 2px 5px 0;
    text-align: left;
    font-variant: small-caps;
    font-size: 1rem;
  }
  .canvas-container {
    overflow: hidden;
    width: 100%;
    height: 220px;
    canvas{
      margin: auto;
      width: 100%;
      height: 220px;
    }
  }
}
</style>
  