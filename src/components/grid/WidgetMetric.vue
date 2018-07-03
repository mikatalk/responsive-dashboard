<template>
  <div class="widget widget-metric">
    <h3 class="value">{{value}}</h3>
    <h4 class="label">{{label}}</h4>
  </div>
</template>

<script>
export default {
  name: 'WidgetMetric',
  props: {
    value: {
      type: [String, Number],
      required: true
    },
    label: {
      type: String,
      default: ""
    }
  }
}
</script>


<style lang="scss">
@import "./../../styles/variables.scss";

.widget.widget-metric {
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  .value {
    color: $primary-color;
    margin: auto 0 2px 0;
    font-size: 2rem;
    flex-basis: 100%;
    padding-top: 10px;
  }
  .label {
    color: $accent-color;
    margin: 2px 0 auto 0;
    padding-bottom: 10px;
    flex-basis: 100%;
    font-variant: small-caps;
    font-size: 1rem;
  }
}
</style>
  