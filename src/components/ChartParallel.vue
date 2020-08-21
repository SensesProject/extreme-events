<template>
  <div class="chart-parallel" v-resize:debounce.initial="onResize">
    <svg width="100%" height="100%">
      <g :transform="`translate(${padding[3]} ${padding[0]})`">
        <g class="lines">
          <!-- <g class="line" v-for="(l, i) in lines" :key="i">
            <polyline :points="c.points" :class="c.color"/>
          </g> -->
          <g class="line" v-for="(l, i) in lines" :key="i">
            <polyline :points="l.points" :class="l.color"/>
          </g>
        </g>
        <g class="labels">
          <g class="label" :transform="`translate(-8 ${innerHeight}) rotate(-90)`">
            <text>← less exposed</text>
          </g>
          <g class="label" transform="translate(-8 0) rotate(-90)">
            <text text-anchor="end">more exposed →</text>
          </g>
          <g class="label" :transform="`translate(${innerWidth + 16} ${innerHeight}) rotate(-90)`">
            <text>← less exposed</text>
          </g>
          <g class="label" :transform="`translate(${innerWidth + 16} 0) rotate(-90)`">
            <text text-anchor="end">more exposed →</text>
          </g>
        </g>
        <g class="axes">
          <g class="axis" v-for="(e, i) in events" :key="i" :transform="`translate(${i * colWidth} 0)`">
            <line :y2="innerHeight"/>
            <g :transform="`translate(0 ${innerHeight / 2}) rotate(-90)`">
              <text class="shadow" y="3">{{ e }}</text>
              <text y="3">{{ e.replace(/-/g, ' ') }}</text>
            </g>
            <g transform="translate(0 -8)">
              <text class="symbol">{{ symbols[e] }}</text>
            </g>
            <!-- <g :transform="`translate(0 ${innerHeight - 3})`">
              <text y="16">{{ scales[e].domain()[0] }}%</text>
            </g> -->
          </g>
        </g>
      </g>
    </svg>
  </div>
</template>

<script>
import resize from 'vue-resize-directive'

import { scaleLinear } from 'd3-scale'
// import { format } from 'd3-format'
import { mapState } from 'vuex'

import Countries from '@/assets/data/countries.json'
import Regions from '@/assets/data/regions.json'

export default {
  name: 'ChartSlope',
  directives: { resize },
  props: {
    warmingLevel: {
      type: Number,
      default: 2
    },
    colorize: {
      type: Object,
      default () {
        return {
          top: [10, 'red'],
          bottom: [10, 'blue'],
          // regions: [['Europe & Central Asia', 'green'], ['Sub-Saharan Africa', 'purple']],
          countries: [['PAK', 'yellow'], ['IND', 'orange']]
        }
      }
    },
    ranking: {
      type: String,
      default: 'gdpPerCapita'
    },
    dimension: {
      type: String,
      default: 'population'
    }
  },
  data () {
    const countries = Object.keys(Countries).filter(k => k !== 'world' && k !== 'TWN').map(k => {
      return {
        ...Countries[k],
        iso: k,
        region: Regions[k]
      }
    })
    return {
      countries,
      padding: [32, 20, 0, 20],
      regions: Regions,
      width: 320,
      height: 480,
      symbols: {
        'tropical-cyclone': '',
        'river-flood': '',
        'crop-failure': '',
        'wildfire': '',
        'drought': '',
        'heatwave': ''
      }
    }
  },
  computed: {
    ...mapState(['events']),
    innerWidth () {
      const { padding, width } = this
      return width - padding[1] - padding[3]
    },
    innerHeight () {
      const { padding, height } = this
      return height - padding[0] - padding[2]
    },
    colWidth () {
      const { innerWidth, events } = this
      return innerWidth / (events.length - 1)
    },
    rankings () {
      const { events, countries, dimension, warmingLevel } = this
      const rankings = events.map(e => {
        return [e, [...new Set(countries.map(c => c[e][dimension][warmingLevel]))].sort((a, b) => a > b)]
      })
      return Object.fromEntries(rankings)
    },
    scales () {
      const { events, countries, warmingLevel, innerHeight, dimension } = this
      const scales = events.map(event => {
        const values = countries.map(c => c[event][dimension][warmingLevel])
        const domain = [Math.min(...values, 0), Math.max(...values)]
        return [event, scaleLinear().domain(domain).range([innerHeight, 0])]
      })
      return Object.fromEntries(scales)
    },
    rankedScales () {
      const { events, innerHeight, rankings } = this
      const scales = events.map(e => {
        const domain = [0, rankings[e].length - 1]
        return [e, scaleLinear().domain(domain).range([innerHeight, 0])]
      })
      return Object.fromEntries(scales)
    },
    lines () {
      const { countries, ranking, colorize, events, scales, rankedScales, dimension, warmingLevel, colWidth, rankings } = this
      return countries.sort((a, b) => a.stats[ranking] > b.stats[ranking]).map((c, rank) => {
        let color = 'default'
        if (colorize.top != null && rank < colorize.top[0]) {
          color = colorize.top[1]
        }
        if (colorize.bottom != null && rank >= countries.length - colorize.bottom[0]) {
          color = colorize.bottom[1]
        }
        if (colorize.regions != null) {
          const region = colorize.regions.find(r => r[0] === c.region)
          if (region != null) color = region[1]
        }
        if (colorize.countries != null) {
          const country = colorize.countries.find(r => r[0] === c.iso)
          if (country != null) color = country[1]
        }
        return {
          points: events.map((e, i) => `${i * colWidth} ${scales[e](c[e][dimension][warmingLevel])}`).join(' '),
          rankedPoints: events.map((e, i) => `${i * colWidth} ${rankedScales[e](rankings[e].indexOf(c[e][dimension][warmingLevel]))}`).join(' '),
          country: c,
          color
        }
      })
    }
  },
  methods: {
    onResize (el) {
      this.width = el.getBoundingClientRect().width
      this.height = el.getBoundingClientRect().height
    }
  }
}
</script>

<style scoped lang="scss">
@import "library/src/style/global.scss";
$transition: $transition * 2;
.chart-parallel {
  width: 100%;
  height: 100%;

  svg {
    overflow: visible;

    text {
      fill: $color-deep-gray;

      &.shadow {
        stroke: $color-white;
        stroke-width: 3;
      }

      &.symbol {
        font-family: senses_glyphs;
        fill: $color-neon;
        font-size: 2em;
      }
    }

    .axes {
      .axis {
        line {
          stroke: $color-dark-gray;
        }
        text {
          text-anchor: middle;
        }
      }
    }
    .lines {
      .line {
        polyline {
          fill: none;
          stroke: $color-pale-gray;
          @include tint(stroke);
          mix-blend-mode: multiply;

          &.default {
            opacity: 0.5;
          }
        }
      }
    }

  }
}
</style>
