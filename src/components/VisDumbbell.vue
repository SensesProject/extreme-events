<template>
  <div class="vis-dumbbell">
    <svg :width="innerWidth" :height="innerHeight">
      <defs>
        <linearGradient id="level-1" y1="1" x2="0">
          <stop class="start" offset="0%"/>
          <stop class="stop" offset="100%"/>
        </linearGradient>
        <linearGradient id="level-1-5" y1="1" x2="0">
          <stop class="start" offset="0%"/>
          <stop class="stop" offset="100%"/>
        </linearGradient>
        <linearGradient id="level-2" y1="1" x2="0">
          <stop class="start" offset="0%"/>
          <stop class="stop" offset="100%"/>
        </linearGradient>
      </defs>
      <g class="chart" :transform="`translate(${chartMargin[3]} ${chartMargin[0]})`">
        <g class="axis">
          <g class="y-tick" v-for="t in yTicks" :key="`t-${t}`" :style="{transform: `translate(0px, ${yScale(t)}px)`}">
            <text>{{t}}&thinsp;%</text>
          </g>
          <text :x="-chartHeight / 2" class="axis-label">{{ yAxisLabel }}</text>
          <rect width="1" :height="chartHeight" x="-1"/>
        </g>
        <g class="categories" :transform="`translate(${horizontalScroll} 0)`">
          <g class="category" v-for="(d, i) in data" :key="`c-${i}`" :transform="`translate(${(i + 0.5) * categoryWidth} 0)`">
            <text class="label center">{{ d.label.replace(/-/g, ' ') }}</text>
            <g v-for="(l, j) in warmingLevels" :key="`l-${i}-${l}`">
              <rect v-if="l !== 0" class="gradient" :class="[`level-${l}`.replace(/\./, '-'), { hidden: shading }]"
                :width="barWidth" :x="-barWidth / 2" :y="yScale(d[variable][l][1]) + 1"
                :height="yScale(d[variable][warmingLevels[j - 1]][1]) - yScale(d[variable][l][1]) - 1"/>
              <rect class="shading" :class="[`level-${l}`.replace(/\./, '-'), { hidden: !shading }]"
                :width="barWidth / 4" :x="(j - 2) * (barWidth / 4)" :y="yScale(d[variable][l][2])"
                :height="yScale(d[variable][l][0]) - yScale(d[variable][l][2])"/>
              <rect class="value" :class="[`level-${l}`.replace(/\./, '-')]"
                :width="shading ? barWidth / 4 : barWidth" height="2" :x="shading ? (j - 2) * (barWidth / 4) : -barWidth / 2" :y="yScale(d[variable][l][1])"/>
            </g>
          </g>
        </g>
      </g>
    </svg>
  </div>
</template>

<script>
import raw from '@/assets/data/detail.json'
import { scaleLinear } from 'd3-scale'
export default {
  name: 'VisDumbbell',
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
      indicators: ['crop-failure', 'river-flood', 'tropical-cyclone', 'wildfire', 'drought', 'heatwave'],
      countries: Object.keys(raw).filter(c => c !== 'world'),
      global: true,
      indicator: 'heatwave',
      warmingLevels: [0, 1, 1.5, 2],
      variable: 'land',
      shading: false,
      chartMargin: [32, 64, 32, 64],
      yTicks: [0, 5, 10, 15, 20],
      horizontalScroll: 0
    }
  },
  computed: {
    innerWidth () {
      return Math.min(this.width, 896)
    },
    innerHeight () {
      return this.height - 64
    },
    chartHeight () {
      return this.innerHeight - this.chartMargin[0] - this.chartMargin[2]
    },
    chartWidth () {
      return this.innerWidth - this.chartMargin[1] - this.chartMargin[3]
    },
    barWidth () {
      const { global, chartWidth, data } = this
      if (global) return chartWidth / data.length - 16
      // if (global && shading) return (chartWidth / data.length - 16) / 4
      return chartWidth / data.length
    },
    categoryWidth () {
      const { global, chartWidth, data } = this
      return global ? chartWidth / data.length : chartWidth / data.length
    },
    data () {
      const { global, indicators, countries, indicator } = this
      if (global) {
        return indicators.map(label => {
          return {
            label,
            ...raw.world[label]
          }
        })
      }
      return countries.map(label => {
        return {
          label,
          ...raw[label][indicator]
        }
      })
    },
    yScale () {
      const { data, variable, chartHeight, shading } = this
      const domain = [0, Math.max(...data.map(d => d[variable][2][shading ? 2 : 1]))]
      return scaleLinear().domain(domain).range([chartHeight, 0]).nice(2)
    },
    yAxisLabel () {
      return this.variable === 'land' ? 'Land Area Affected' : 'Population Exposed'
    }
    // yTicks () {
    //   const { yScale } = this
    //   return yScale.ticks(2).map(value => {
    //     return { value, y: yScale(value) }
    //   })
    // }
  },
  watch: {
    step: {
      handler (step) {
        this.variable = 'land'
        this.shading = false
        this.global = true
        this.horizontalScroll = 0

        if (step < 1) return
        this.variable = 'population'

        if (step < 2) return
        this.shading = true

        if (step < 3) return
        this.shading = false
        this.global = false

        if (step <= 3) return
        this.horizontalScroll = (step - 3) * (-9504 + this.chartWidth)

        if (step < 4) return
        this.horizontalScroll = -9504 + this.chartWidth
      },
      immediate: true
    }
  }
}
</script>

<style scoped lang="scss">
@import "library/src/style/global.scss";
.vis-dumbbell {
  display: flex;
  flex-direction: column;
  // justify-content: center;
  align-items: center;
  padding: $spacing 0;

  svg {
    .axis {
      .y-tick {
        transition: transform $transition;
        text {
          text-anchor: middle;
          transform: rotate(-90deg) translateY(-0.625em);
        }
      }
      .axis-label {
        text-anchor: middle;
        transform: rotate(-90deg) translateY(-2em);
      }
    }
    text.center {
      transform: translateY(0.35em)
    }
    .categories {
      .category {
        .label {
          text-transform: capitalize;
          text-anchor: middle;
        }
        .value, .shading {
          transition: y $transition, opacity $transition, width $transition, x $transition;
          &.level {
            &-0 {
              fill: $color-neon;
            }
            &-1 {
              fill: $color-yellow;
            }
            &-1-5 {
              fill: $color-orange;
            }
            &-2 {
              fill: $color-red;
            }
          }
          &.shading {
            opacity: 0.3;
          }
        }
        .gradient {
          opacity: 0.2;
          transition: y $transition, height $transition, opacity $transition;
          &.level {
            &-1 {
              fill: url(#level-1);
            }
            &-1-5 {
              fill: url(#level-1-5);
            }
            &-2 {
              fill: url(#level-2);
            }
          }
        }
        .hidden {
          opacity: 0 !important;
        }
      }
    }

    #level-1 {
      .start {
        stop-color: $color-neon;
      }
      .stop {
        stop-color: $color-yellow;
      }
    }
    #level-1-5 {
      .start {
        stop-color: $color-yellow;
      }
      .stop {
        stop-color: $color-orange;
      }
    }
    #level-2 {
      .start {
        stop-color: $color-orange;
      }
      .stop {
        stop-color: $color-red;
      }
    }
  }
}
</style>
