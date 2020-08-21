<template>
  <div class="earth-wrapper">
    <VisEarth :grid="grid[0]" :scale="{domain: [0, 100], range: [0, grid[1]]}"
      :colors="colors" prevent-interaction :yaw="camera.yaw" :pitch="camera.pitch"/>
      <!-- <div class="step">step {{ step }}<br>yaw {{ camera.yaw }}<br>pitch {{ camera.pitch }}</div> -->
  </div>
</template>

<script>
import heatwave from 'raw-loader!earth/public/grids/heatwave_median_HWMId-humidex_2.0.txt' // eslint-disable-line import/no-webpack-loader-syntax
import cropFailure from 'raw-loader!earth/public/grids/crop-failure_median_median_2.0.txt' // eslint-disable-line import/no-webpack-loader-syntax
import drought from 'raw-loader!earth/public/grids/drought_median_median_2.0.txt' // eslint-disable-line import/no-webpack-loader-syntax
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
        [drought, 20],
        [tropical, 40],
        [cropFailure, 20]
        // [riverFlood, 40],
        // [wildfire, 20]
      ],
      colors: {
        background: '#F0F0FF',
        text: '#48484c',
        borderColor: '#D8D8EE',
        colorScale: ['#F5FBFF', '#9D7FBB', '#6F004B']
      }
    }
  },
  mounted () {
  },
  computed: {
    size () {
      const { width, height } = this
      return Math.min(width, height)
    },
    grid () {
      const { grids, step } = this
      return grids[Math.min(grids.length - 1, Math.floor(step))]
    },
    camera () {
      const step = Math.floor(this.step)
      const progress = this.step
      const yaws = [[0, -0.25], [2, 0.2], [3, 0.65], [4.1, 0.9]]
      const pitches = [[0, -0.25], [1.5, -0.05], [3, 0.15], [4.1, -0.5]]
      const y = yaws.findIndex(y => y[0] > step)
      const p = pitches.findIndex(p => p[0] > step)
      const yaw = scaleLinear().range([yaws[y - 1][1], yaws[y][1]]).domain([yaws[y - 1][0], yaws[y][0]])(progress)
      const pitch = scaleLinear().range([pitches[p - 1][1], pitches[p][1]]).domain([pitches[p - 1][0], pitches[p][0]])(progress)
      return { yaw, pitch }
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
