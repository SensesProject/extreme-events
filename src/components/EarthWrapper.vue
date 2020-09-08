<template>
  <div class="earth-wrapper">
    <VisEarth :grid="grid[0]" :scale="{domain: [0, 100], range: [0, grid[1]]}"
      :colors="colors" prevent-interaction :yaw="camera.yaw" :pitch="camera.pitch" :zoom="camera.zoom"/>
      <!-- <div class="step">step {{ step }}<br>yaw {{ camera.yaw }}<br>pitch {{ camera.pitch }}</div> -->
  </div>
</template>

<script>
import heatwave from 'raw-loader!earth/public/grids/heatwave_median_HWMId-humidex_2.0.txt' // eslint-disable-line import/no-webpack-loader-syntax
import cropFailure from 'raw-loader!earth/public/grids/crop-failure_median_median_2.0.txt' // eslint-disable-line import/no-webpack-loader-syntax
// import drought from 'raw-loader!earth/public/grids/drought_median_median_2.0.txt' // eslint-disable-line import/no-webpack-loader-syntax
// import riverFlood from 'raw-loader!earth/public/grids/river-flood_median_median_2.0.txt' // eslint-disable-line import/no-webpack-loader-syntax
// import wildfire from 'raw-loader!earth/public/grids/wildfire_median_median_2.0.txt' // eslint-disable-line import/no-webpack-loader-syntax
import tropical from 'raw-loader!earth/public/grids/tropical-cyclone_median_KE-TG-meanfield_2.0.txt' // eslint-disable-line import/no-webpack-loader-syntax

import VisEarth from 'earth/src/components/VisEarth.vue'
// import ObjectSphere from 'earth/src/components/ObjectSphere.vue'
// import ObjectGeo from 'earth/src/components/ObjectGeo.vue'

// import { easeQuadInOut } from 'd3-ease'
import { scaleLinear } from 'd3-scale'
export default {
  name: 'earth-wrapper',
  components: { VisEarth },
  props: {
    width: {
      default: 768,
      type: Number
    },
    height: {
      default: 768,
      type: Number
    },
    step: {
      default: 0,
      type: Number
    }
  },
  data () {
    return {
      grids: [
        [heatwave, 100],
        // [drought, 20],
        [tropical, 40],
        [cropFailure, 20]
        // [riverFlood, 40],
        // [wildfire, 20]
      ]
    }
  },
  mounted () {
  },
  computed: {
    colors () {
      const { fullStep } = this
      const colorScale = [
        ['#F5FBFF', '#F3EA97', '#E6A049'],
        ['#F5FBFF', '#7B91E8', '#D13E9D'],
        ['#F5FBFF', '#EF8224', '#6F3DAE']
      ][fullStep]
      return {
        background: '#F0F0FF',
        text: '#48484c',
        borderColor: '#D8D8EE',
        colorScale
      }
    },
    fullStep () {
      return Math.min(this.grids.length - 1, Math.floor(this.step))
    },
    size () {
      const { width, height } = this
      return Math.min(width, height)
    },
    grid () {
      const { grids, fullStep } = this
      return grids[fullStep]
    },
    camera () {
      // const step = Math.floor(this.step)
      const progress = this.step
      const yaws = [[0, -0.18], [1, 0.4], [1.7, 0.65], [3.1, 0.9]]
      const pitches = [[0, -0.2], [0.75, 0.1], [1.5, -0.05], [3.1, -0.35]]
      const zooms = [[0, 1], [3.1, 2]]
      const y = yaws.findIndex(y => y[0] > progress)
      const p = pitches.findIndex(p => p[0] > progress)
      const z = zooms.findIndex(z => z[0] > progress)
      const yaw = scaleLinear().range([yaws[y - 1][1], yaws[y][1]]).domain([yaws[y - 1][0], yaws[y][0]])(progress)
      // const scale = scaleLinear().range([yaws[y - 1][1], yaws[y][1]]).domain([yaws[y - 1][0], yaws[y][0]])
      // // console.log(scale(1.9), scale(2.0), scale(2.1))
      // console.log(scale.domain(), scale.range(), progress)
      const pitch = scaleLinear().range([pitches[p - 1][1], pitches[p][1]]).domain([pitches[p - 1][0], pitches[p][0]])(progress)
      const zoom = scaleLinear().range([zooms[z - 1][1], zooms[z][1]]).domain([zooms[z - 1][0], zooms[z][0]])(progress)
      return { yaw, pitch, zoom }
    }
  },
  watch: {
  }
}
</script>

<style scoped lang="scss">
@import "library/src/style/global.scss";
.earth-wrapper {
  .step {
    position: absolute;
    margin: auto;
    font-size: 1em;
  }
}
</style>
