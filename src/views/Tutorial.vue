<template>
  <div class="tutorial page">
    <article>
      <h1 class="title">
        Building
        <span>a</span>
        Responsive Dashboard
        <span>with</span>
        Vue.js
      </h1>
      <p class="abstract">
        This tutorial will take you through the main steps of
        building a responsive dashboard using   
        <a href="https://vuejs.org/" target="_blank">Vue.js</a>. 
        First by using basic HTML, then ramping it up with SVG, and finally we'll take a look at using Canvas.
      </p>
      <ol>
        <li>Project Setup</li>
        <li>Responsive Grid</li>
        <li>Loading Data</li>
        <li>HTML - metric chart</li>
        <li>SVGs - bar chart</li>
        <li>Canvas - three.js radar</li>
        <li>Put it All Together</li>
        <li>Building for Production</li>
      </ol>
      
      <hr>

      <h4>Checkout the final demo <a href="#demo" @click.prevent="$router.push('/demo')">here</a>
        <br/>
        <br/>
        Download the complete source code from
        <a href="https://github.com/mikatalk/responsive-dashboard" target="_blank">github</a>.
      </h4>

      <hr>

      <h2>
        1. Project Setup
      </h2>
      <p>One main paradygm of vue.js is the <em>single file component</em>, this means each component contains 
        its own html markup, javascript scripts and CSS styles inside a single <em>.vue</em> file.</p>
      <p>In order to bundle such app architecture into production-ready static assets, 
        the most common way is to use a Webpack custom Vue loader, which can be a bit confusing when getting started.
        Luckily Vue offers a very useful command line interface to boostrap a project in no time.</p> 
      <p>
        • Install Vue cli globally 
        <pre v-highlightjs><code class="javascript">npm install -g @vue/cli</code></pre>
      </p>
      <p>
        • Create a new project (from parent directory) 
        <pre v-highlightjs><code class="javascript">vue create my-cool-dashboard</code></pre>
      </p>
      <p>When initializing the project, make sure to select Babel, Vuex and SCSS in order to be able to run the following
        code samples. Use space bar to toggle options and up/down arrows to navigate.
        <img class="medium-size" src="./../assets/vue-cli.png" />
        The script should run for a little while, installing the npm dependencies. 
         Once complete, navigate inside the newly created directory and let's start the webpack dev server
        <pre v-highlightjs><code class="javascript">cd ./my-cool-dashboard/
npm run serve</code></pre>
        Now your dev server should be running, if you navigate to the server url, 
        you should see the demo Vue.js landing page.
        <img class="medium-size" src="./../assets/webpack-dev-server.png" />
        We're ready to cook!
      </p>
      
      
      <hr/>
      
      
      <h2>
        2. Responsive Grid
      </h2>
      <p>Our dashboard is going to display multiple charts on different platforms and screen sizes.
        Our goal is to setup a responsive system to optimize the surface available and display 
        the charts in a responsive way.
        <br/>
        There is a great <a href="https://codeburst.io/making-responsive-grid-with-flexbox-and-lessjs-9ee89e13c735" target="_blank">article</a> 
        that covers the technique using Less.
        <br/>
        The code below is very similar to the exception it uses
        SASS instead, also the grid is 6 columns instead of 12. <br/>
        Below is the key SCSS mixins:
        <pre v-highlightjs><code class="scss">@mixin flex-size($col: 6, $gutter: 1%) {
  flex-basis: (100% / (6 / $col)) - $gutter * 2;
}

@mixin six-columns-layout($screen-type: desktop, $gutter: 1%) {
  .#{$screen-type}-1-col {
    @include flex-size(1, $gutter);
  }
  .#{$screen-type}-2-col {
    @include flex-size(2, $gutter);
  }
  .#{$screen-type}-3-col {
    @include flex-size(3, $gutter);
  }
  .#{$screen-type}-4-col {
    @include flex-size(4, $gutter);
  }
  .#{$screen-type}-5-col {
    @include flex-size(5, $gutter);
  }
  .#{$screen-type}-6-col {
    @include flex-size(6, $gutter);
  }
}

/** Grid Layout **/
@mixin grid-6($element-selector) {
  @at-root #{$element-selector + &} {
    display: flex;
    // if any margin, we want it spaced evenly
    justify-content: space-evenly;
    // we want all the widgest to have the same height when on the same line
    align-items: stretch; 
    // wrap the list of widgets over multiple lines if needed
    flex-wrap: wrap;
    @media (min-width: $nav-max-width) {
      @include six-columns-layout(desktop);
    }
    @media (max-width: $nav-max-width) {
      @include six-columns-layout(tablet);
    }
    @media (max-width: $mobile-size) {
      @include six-columns-layout(phone);
    }
  }
}</code></pre>
     
        Once the mixin is ready we can use it inside our <em>Grid.vue</em> component:
       
        <pre v-highlightjs>
          <code class="scss">@import "./../styles/mixins.scss";
.grid {
  @include grid-6(&)
}         </code>
        </pre>
      </p>
      <p>
        Finally we can add widgets to our grid and use the following CSS classes to set the responsive sizes.
      </p>
      <p>
        For example for small metrics, we want a 6 column layout on desktop, 
        3 column layout on tablet and 2 column layout on mobile, so for each metric widget we add the following classes:
        <pre v-highlightjs><code class="javascript">phone-3-col tablet-2-col desktop-1-col</code></pre>
        If instead we're displaying a larger chart we would want to use a layout with a single column on all platforms.
        <pre v-highlightjs><code class="javascript">phone-6-col tablet-6-col desktop-6-col</code></pre>
      </p>

      <p>
        Now we have a responsive layout in place, we're ready to start adding widgets to the grid. 
        But before that we take a little detour and will focus first on loading data into the app.
      </p>

      <hr/>

      <h2>
        3. Loading Data
      </h2>

      <p>
        For the sake of this tutorial, we will be loading a json file, simulating a GET request -
         which should be pretty easy to switch towards your own backend api.
      </p>

      <p>
        First we install <em>axios</em> a handy XHR client wrapper library 
        <pre v-highlightjs><code class="javascript">npm i axios</code></pre>
      </p>

      
      <p>
        Then we create a <em>dashboard-data.json</em> file containing our dashboard data (which would be the API response). 
        we create this json file inside the static directory <em>public/assets/</em>.
        <pre v-highlightjs><code class="json">{
  "widgets": {
    "transactions": "250K",
    "weather": "☀️",
    "responsiveness": "99%",
    "events": "28,320",
    "hits": "9.12K",
    "convertion": "69%",
    "jsFrameworks": {
      "range": [0, 10000],
      "values": [9892, 8932, 4253, 1990, 1600],
      "labels": ["vue.js", "react", "angular", "backbone", "jQuery"]
    },
    "topWines": {
      "range": [0, 440000],
      "values": [440000, 280953, 144500, 120040],
      "labels": ["Haut Médoc", "Pessac", "Beaujolais", "Rioja"]
    }
  }
}</code></pre>
      </p>

      <p>
        To load the API data, we create a XHR client class using the dependency <em>axios</em> that we installed earlier
        <pre v-highlightjs><code class="javascript">import axios from 'axios'
export default class DashboardAPI {
  static loadDashboardData () {
    return axios.get('./assets/dashboard-data.json')
  }
}</code></pre>
      </p>

      <p>
        Next we need to setup <em>vuex</em>. If you're not familiar with it, below are some useful resources 
        on the FLUX architecture:
        <br/>
        <a href="https://facebook.github.io/flux/" target="_blank">FLUX presentation</a>
        <br/>
        <a href="https://vuex.vuejs.org/" target="_blank">VueX documentation</a>
      </p>      

      <p>
        A lot of the code may look like a lot of verbose at first and may look like 
        over-engineering when one is not familiar with these concepts. But bear with me,
        this will allow us to scale and mantain the app in the long run, breaking down
        complexity of a project into smaller and more manageable chunks.
        <br/>
        In this tutorial we create a vuex store sub-module <em>widgets</em> which will manage
        the state/data of our widgets - in this case we have 6 metrics, 2 bar charts, 1 map-3d.
      </p> 
      <h4>state.js</h4>
      <p>Our main state defines the widgets states as well as a boolean flag used to define its loading/ready states.
        Note that all these values are initialized to null.
        <pre v-highlightjs><code class="javascript">export default {
  loading: true,
  widgets: {
    transactions: {
      value: null
    },
    weather: {
      value: null,
    },
    responsiveness: {
      value: null,
    },
    events: {
      value: null
    },
    hits: {
      value: null
    },
    convertion: {
      value: null
    },
    jsFrameworks: {
      range: null,
      values: null,
      labels: null
    },
    topWines: {
      range: null,
      values: null,
      labels: null
    },
    map3D: {
      // not needed in this tutorial
    }
  }
}</code></pre>
      </p>

      <h4>actions.js</h4>
      <p>We only need one action here, which is pulling the data from the API. The action will be
        dispatched by the Grid when mounted. When called, <br/>
        (1) the loading flag is set to true, <br>
        (2) we make a request to the server, <br>
        (3) when complete we mutate the state with the fresh data <br>
        (4) and set the loading flag to false so that the component can now render the available data. 
        <pre v-highlightjs><code class="javascript">import * as types from './mutations-types'
import DashboardAPI from '@/api/DashboardAPI'
export const loadDashboardData = ({ commit }) => {
  commit(types.SET_LOADING_STATE, true)
  DashboardAPI.loadDashboardData().then(response => {
    const {data} = response
    commit(types.SET_DASHBOARD_DATA, data)
    commit(types.SET_LOADING_STATE, false)
  })
}</code></pre>
      </p>

      <h4>mutations.js</h4>
      <p>The action above commits two types of mutations. These are pure functions that are never async.
        <pre v-highlightjs><code class="javascript">import * as types from './mutations-types'
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
</code></pre>
      </p>

      <h4>getters.js</h4>
      <p>To read and react from state changes, components rely on vuex <em>MapGetters</em>. 
      We could technically simply declare a widgets getter and use dot notation to retrieve all 
      the widgets data within the tree, but with maintainability and portability in mind we split the getters into a detailed list of widgets:
        <pre v-highlightjs><code class="javascript">export default {
  isLoading: state => state.loading,
  transactions: state => state.widgets.transactions,
  convertion: state => state.widgets.convertion,
  hits: state => state.widgets.hits,
  events: state => state.widgets.events,
  responsiveness: state => state.widgets.responsiveness,
  weather: state => state.widgets.weather,
  jsFrameworks: state => state.widgets.jsFrameworks,
  topWines: state => state.widgets.topWines,
}</code></pre>
      </p>

      <h4>Load the data!</h4>
      <p>Now our vuex store is setup, all that's left is to trigger the main action from a component.
        In our example, we load the data everytime the Grid component is mounted:
        <pre v-highlightjs><code class="javascript">mounted () {
  // load fresh data every time we land on the view
  this.$store.dispatch('widgets/loadDashboardData')
}
</code></pre>
        <img src="./../assets/dev-tools.png" />
        After page load, open the vue dev tools and you will be able to inspect the global state at any mutation point.
      </p>


      <hr/>
      
      
      <h2>
        4. HTML component
      </h2>
      <p>Let's start with a simple text component that display data using HTML (<a href="https://github.com/mikatalk/responsive-dashboard/blob/master/src/components/grid/WidgetMetric.vue" target="_blank">source file</a>).
        <br/>
        This very basic component only takes two attributes
        which are <em>title</em> and <em>value</em>.
        <br/>
        In this component, responsivness is inherited from the responsive grid
        and therefore very flexible with no extra setup work.
      </p>
      <pre v-highlightjs><code class="javascript">props: {
  value: {
    type: [String, Number],
    required: true
  },
  label: {
    type: String,
    default: ""
  }
}</code></pre>
      usage in your tempate:
      <pre v-highlightjs><code class="jsx">< metric value="value" label="label" / ></code></pre>
      <h4>
        <em>MetricChart.vue</em>
        <metric value="value" label="label" />
      </h4>



      <hr/>
      
      
      <h2>
        5. SVG component
      </h2>
      <p>
        One of the main reasons I really enjoy working with SVG is for 
        its <em>viewBox</em> and <em>preserveAspectRatio</em> property. 
        It allows one to define the size of the vieport and how it should resize.
        <a href="https://css-tricks.com/scale-svg/" target="_blank">Here</a> 
        is a very good guide on the topic.
      </p>
      <pre v-highlightjs><code class="svg">< svg
  xmlns="http://www.w3.org/2000/svg"
  preserveAspectRatio="none"
  viewBox="0 0 300 100" ></code></pre>
      <p>Since our viewBox is now defined (300x100), we can safely base our ratio
        calculations using the fixed unit and let SVG resize the thing for us.
        <br/>
        For example:
      <pre v-highlightjs><code class="javascript">labelLineOffsetY (index) {
  // chart is 100 unit height
  // we divide 100 by the number of items and multiply by index to get offset
  const offset = Math.round(100 / this.values.length)
  return offset * index
}</code></pre>
        Go ahead and resize your browser, you will see that the chart remains consistent,
        no matter what its scale is.
        One way one could extend this tutorial would be to make the SVG font size dynamic and
        react to the svg size, but that's out of scope for now.
      </p>
      <h4>
        <em>WidgetChartSVG.vue</em> (<a href="https://github.com/mikatalk/responsive-dashboard/blob/master/src/components/grid/WidgetChartSVG.vue" target="_blank">source file</a>)
        <chart-svg
          title="skills"
          :range="[0, 100]"
          :values="[65, 34, 77, 95]"
          :labels="['CSS', 'SVG', 'WebGL', 'ES6']"
        />
      </h4>


      <hr/>
      
      
      <h2>
        6. Canvas component
      </h2>
      <p>
        So far we have a small collection of components (html metric and svg chart) and thing haven't
        been too complex because most of handling responsivness was taken care natively by the browser.
      </p>
      <p>
        When dealing with the <em>canvas</em> element, and especially with the 3D context, we need to manually
        initialize, destroy and resize our component in order to support various screen sizes and browser resize.
      </p>
      <p>
        In this example (<a href="https://github.com/mikatalk/responsive-dashboard/blob/master/src/components/grid/WidgetMap3D.vue" target="_blank">source file</a>)
        we will be loading a <em>three.js</em> demo, without focusing on the webgl stuff too much,
        we will cover the key points to integrate it to your vue app.
      </p>
      <p>
        First we install <em>three.js</em> - which needs no introduction 😍
        <pre v-highlightjs><code class="javascript">npm i three</code></pre>
      </p>
      <p>
        All the three demo code is included in the
        <a href="https://github.com/mikatalk/responsive-dashboard/blob/master/src/gl" target="_blank"> <em>src/gl</em> directory.</a>
        <br/>
      </p>
      <p>
        The <em>GL.js</em> class has 3 methods that we will use from the vue component 
        <br/>
        • <em>constructor</em>,
        <br/>
        • <em>handleResize</em>,
        <br/>
        • <em>destroy</em>
      </p>
      <p>
        In our canvas component  <em>WidgetMap3D.vue</em>
      </p>
      <h4><em>constructor()</em></h4>
      <p>
        Initialize a new canvas when the component gets mounted:
        <pre v-highlightjs><code class="javascript">mounted () {
  this.gl = new GL(this.$refs.canvas, this.$refs.container)
}</code></pre>
      </p>
      <h4><em>destroy()</em></h4>
      <p>
        Destory the canvas right before the component gets destroyed:
        <pre v-highlightjs><code class="javascript">beforeDestroy () {
  this.gl.destroy()
}</code></pre>
      </p>
      <h4><em>handleResize()</em></h4>
      <p>
        Now if you dig into the sample project, you will notice I added a
        global <em>window.resize</em> event handler that updates the vuex state:
        <br/>
        <em>state.ui.window.width</em> and
        <br/>
        <em>state.ui.window.height</em>
        <br/>
        Our component just needs to import the <em>windowWidth</em> getter and setup a watcher
        to update the canvas when the window size changes:
      </p>
      <p>
        Import the vuex MapGetter for the window width:
        <pre v-highlightjs><code class="javascript">computed: {
  ...mapGetters({
    'windowWidth': 'ui/windowWidth'
  })
}</code></pre>
        Setup watcher and update the canvas on resize:
        <pre v-highlightjs><code class="javascript">watch: {
  windowWidth () {
    this.gl.handleResize()
  }
}</code></pre>
      </p>
      <p>
        Now you can use the component by simply:
    <pre v-highlightjs><code class="javascript">< map-3d title="three.js map" / ></code></pre>
      <h4>
        <em>WidgetMap3D.vue</em>
        <map-3d title="three.js map" />
      </h4>

      <hr/>
      
      
      <h2>
        7. Put it All Together
      </h2>
      <p>
        Now our grid can import these 
        components and map their attributes with the vuex store data.
      </p>
      <p>
        Another task of <em>Grid.vue</em> is to tell vuex when to load the data (on component mount).
        This is done by dispatching <em>'widgets/loadDashboardData'</em>
      </p>
       <h4>
        <em>Grid.vue (<a href="https://github.com/mikatalk/responsive-dashboard/blob/master/src/components/grid/WidgetMap3D.vue" target="_blank">source file</a>)
</em> 
      </h4>
      <pre v-highlightjs><code class="javascript">import WidgetMetric from '@/components/grid/WidgetMetric'
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
}</code></pre>
      And finally the <em>template</em> where we bind the vuex data to component attributes,
      define the CSS classes for the responsive layout, and setup a quick/cheap loading screen.
      <pre v-highlightjs><code class="xml">< template >
  < div class="grid" >
    
    < div
      v-if="isLoading"
      class="loading">
      Loading...
    < /div >
    
    < metric
      v-if="!isLoading"
      class="widget phone-3-col tablet-2-col desktop-1-col"
      :value="transactions.value"
      label="transactions"
    / >
    
    < metric
      v-if="!isLoading"
      class="widget phone-3-col tablet-2-col desktop-1-col"
      :value="weather.value"
      label="weather"
    / >

    < metric
      v-if="!isLoading"
      class="widget phone-3-col tablet-2-col desktop-1-col"
      :value="responsiveness.value"
      label="responsiveness"
    / >

    < metric
      v-if="!isLoading"
      class="widget phone-3-col tablet-2-col desktop-1-col"
      :value="events.value"
      label="events"
    / >

    < metric
      v-if="!isLoading"
      class="widget phone-3-col tablet-2-col desktop-1-col"
      :value="hits.value"
      label="hits"
    / >

    < metric
      v-if="!isLoading"
      class="widget phone-3-col tablet-2-col desktop-1-col"
      :value="convertion.value"
      label="convertion"
    / >

    < chart-svg
      v-if="!isLoading"
      class="widget phone-6-col tablet-3-col desktop-3-col"
      title="javascript frameworks"
      :range="jsFrameworks.range"
      :values="jsFrameworks.values"
      :labels="jsFrameworks.labels"
    / >

    < chart-svg
      v-if="!isLoading"
      class="widget phone-6-col tablet-3-col desktop-3-col"
      title="top wines"
      :range="topWines.range"
      :values="topWines.values"
      :labels="topWines.labels"
    / >

    < map-3d
      v-if="!isLoading"
      class="widget phone-6-col tablet-6-col desktop-6-col"
      title="three.js map"
    / >

  < /div >
< /template >
</code></pre>
      <hr/>
      
      
      <h2>
        8. Building for Production
      </h2>
      <p>
        When you're ready to share your dashboard with the rest of the world, you will want to
        build your assets in order to deploy them to a CDN.
      </p>
      <p>
        <em>vue-cli</em> comes already setup and one can build the assets for production by simpy running:
      </p>
      <pre v-highlightjs><code class="javascript">npm run build</code></pre>
      <p>
        Now sometimes you'll want to set up specific configs, all you need to do is to create a file 
        <a href="https://github.com/mikatalk/responsive-dashboard/blob/master/vue.config.js" target="_blank">
          vue.config.js
        </a>
        at the root of your project.
        Below is for example a way to set the base url of your project, or the port number of the dev server:
        </p>
 <pre v-highlightjs><code class="javascript">module.exports = {
  baseUrl: process.env.NODE_ENV === 'production'
    ? 'https://www.michael-iriarte.com/articles/responsive-vue-dashboard'
    : '/',
  devServer: {
    port: 47000
  }
}</code></pre>
      
      
      <hr/>

      <p>
        This is pretty much it for now, a basic wireframe app to add on your own components and vizualizations.
      </p>
      <p>
        Checkout the <a href="#demo" @click.prevent="$router.push('/demo')">demo</a> or source on 
        <a href="https://github.com/mikatalk/responsive-dashboard" target="_blank">github</a>
      </p>

      <p>
        I hope this article will help some of you getting started with <em>Vue</em>. Please post in the comments if you have any questions.
      </p>

      <p>
        Share the web!
      </p>
    </article>
  </div>
</template>

<script>
import WidgetMetric from '@/components/grid/WidgetMetric'
import WidgetChartSVG from '@/components/grid/WidgetChartSVG'
import WidgetMap3D from '@/components/grid/WidgetMap3D'

export default {
  name: 'Tutorial',
  components: {
    'metric': WidgetMetric,
    'chart-svg': WidgetChartSVG,
    'map-3d': WidgetMap3D
  },
}
</script>

<style lang="scss">
.page.tutorial {
  a {
    color: #ff36a2;
  }
  em {
    color: #71224d;
  }
}
</style>
