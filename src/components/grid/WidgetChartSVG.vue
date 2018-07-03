<template>
  <div class="widget widget-chart-svg">
    <h3 class="title">{{title}}</h3>

    <svg
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      viewBox="0 0 300 100" >

      <text
        class="label"
        v-for="(value, index) of values"
        :key="'label' + index"
        x="60"
        :y="1 + labelOffsetY(index)"
        text-anchor="end"
      >{{labels[index]}}</text>  

      <line
        v-for="(value, index) in values.length + 1"
        :key="'line-' + index"
        x1="55" :y1="labelLineOffsetY(index)"
        x2="65" :y2="labelLineOffsetY(index)"
      ></line>

      <line
        x1="65" y1="0"
        x2="65" y2="100"
      ></line>

      <rect
        v-for="(value, index) of values"
        :key="'rect-' + index"
        x="70"
        :y="2 + labelLineOffsetY(index)"
        :width="barWith(value, 230)"
        :height="(100 / values.length) - 4"
      />

      <text
        class="value"
        v-for="(value, index) of values"
        :key="index"
        x="75"
        :y="1 + labelOffsetY(index)"
        text-anchor="start"
      >{{formatValue(values[index])}}</text>  
      
    </svg>
  </div>
</template>

<script>
export default {
  name: 'WidgetChartSVG',
  props: {
    title: {
      type: String,
      default: "title"
    },
    range: {
      type: Array,
      required: true
    },
    values: {
      type: Array,
      required: true
    },
    labels: {
      type: Array,
      required: true
    }
  },
  methods: {
    labelOffsetY (index) {
      // chart is 100 unit height
      // we divide 100 by the number of items and multiply by index to get offset
      const offset = Math.round(100 / this.values.length)
      return offset / 2 + offset * index
    },
    labelLineOffsetY (index) {
      // chart is 100 unit height
      // we divide 100 by the number of items and multiply by index to get offset
      const offset = Math.round(100 / this.values.length)
      return offset * index
    },
    formatValue (value) {
      return value.toLocaleString('en')
    },
    barWith (value, fullWidth) {
      const ratio = (value - this.range[0]) / (this.range[1] - this.range[0])
      return ratio * fullWidth
    }
  }
}
</script>


<style lang="scss">
@import "./../../styles/variables.scss";

div.widget.widget-chart-svg {
  display: block;
  svg {
    margin: 2PX 5px 5px;
    width: calc(100% - 10px);
    height: auto; 
    font-size: 0.5rem; 
    overflow: hidden;
    text {
      dominant-baseline: middle;
      fill: $accent-color;
      &.value {
        fill: white;
      }
    }
    line {
      stroke: rgba($accent-color, 0.5);
      stroke-width: 1;
    }
    rect {
      stroke-width: 0;
      fill: $primary-color;
    }
  }
  .title {
    color: $accent-color;
    margin: 2px 5px 0;
    text-align: left;
    font-variant: small-caps;
    font-size: 1rem;
  }
}
</style>
  