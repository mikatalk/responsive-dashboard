<template>
  <div class="grid">
    
    <div
      v-if="isLoading"
      class="loading">
      Loading...
    </div>
    
    <metric
      v-if="!isLoading"
      class="widget phone-3-col tablet-2-col desktop-1-col"
      :value="transactions.value"
      label="transactions"
    />
    
    <metric
      v-if="!isLoading"
      class="widget phone-3-col tablet-2-col desktop-1-col"
      :value="weather.value"
      label="weather"
    />

    <metric
      v-if="!isLoading"
      class="widget phone-3-col tablet-2-col desktop-1-col"
      :value="responsiveness.value"
      label="responsiveness"
    />

    <metric
      v-if="!isLoading"
      class="widget phone-3-col tablet-2-col desktop-1-col"
      :value="events.value"
      label="events"
    />

    <metric
      v-if="!isLoading"
      class="widget phone-3-col tablet-2-col desktop-1-col"
      :value="hits.value"
      label="hits"
    />

    <metric
      v-if="!isLoading"
      class="widget phone-3-col tablet-2-col desktop-1-col"
      :value="convertion.value"
      label="convertion"
    />

    <chart-svg
      v-if="!isLoading"
      class="widget phone-6-col tablet-3-col desktop-3-col"
      title="javascript frameworks"
      :range="jsFrameworks.range"
      :values="jsFrameworks.values"
      :labels="jsFrameworks.labels"
    />

    <chart-svg
      v-if="!isLoading"
      class="widget phone-6-col tablet-3-col desktop-3-col"
      title="top wines"
      :range="topWines.range"
      :values="topWines.values"
      :labels="topWines.labels"
    />

    <map-3d
      v-if="!isLoading"
      class="widget phone-6-col tablet-6-col desktop-6-col"
      title="three.js map"
    />

  </div>
</template>

<script>
import WidgetMetric from '@/components/grid/WidgetMetric'
import WidgetChartSVG from '@/components/grid/WidgetChartSVG'
import WidgetMap3D from '@/components/grid/WidgetMap3D'
import { mapGetters } from 'vuex'

export default {
  name: 'Grid',
  components: {
    'metric': WidgetMetric,
    'chart-svg': WidgetChartSVG,
    'map-3d': WidgetMap3D
  },
  computed: {
    ...mapGetters({
      'isLoading': 'widgets/isLoading',
      'transactions': 'widgets/transactions',
      'convertion': 'widgets/convertion',
      'hits': 'widgets/hits',
      'events': 'widgets/events',
      'responsiveness': 'widgets/responsiveness',
      'weather': 'widgets/weather',
      'jsFrameworks': 'widgets/jsFrameworks',
      'topWines': 'widgets/topWines',
    })
  },
  mounted () {
    // load fresh data every time we land on the view
    this.$store.dispatch('widgets/loadDashboardData')
  }
}
</script>


<style lang="scss">
@import "./../../styles/mixins.scss";
@import "./../../styles/variables.scss";
.grid {
  background: #1d1e1e;
  padding-bottom: 10px;
  @include grid-6(&)
  .widget {
    width: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    flex-basis: auto;
    margin: 10px 1% 0 1%;
    width:  calc(25% - 2%);
    min-height: 75px;
    background: #303030;
  }
  .loading {
    width: 100%;
    color: white;
    min-height: 120px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
  