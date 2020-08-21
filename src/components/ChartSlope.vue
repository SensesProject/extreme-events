<template>
  <div class="chart-slope" :style="{width: `${width}px`}">
    <svg :width="width" :height="height" class="slope" :class="indicator">
      <g :transform="`translate(${padding[3]},${padding[0]})`" style="font-family:'IBM Plex Sans',IBMPlexSans,sans-serif">
        <g class="axes">
          <g class="axis left">
            <line :y2="innerHeight"/>
            <g class="ticks" text-anchor="middle">
              <text :y="leftScale(leftScale.domain()[0]) + 14">{{format(leftScale.domain()[0])}}&thinsp;{{references[reference].unit}}</text>
              <text :y="leftScale(leftScale.domain()[1]) - 5">{{format(leftScale.domain()[1])}}&thinsp;{{references[reference].unit}}</text>
              <text class="bold capitalize" :y="leftScale(leftScale.domain()[1]) - 5 - 16">{{references[reference].label}}</text>
            </g>
          </g>
          <g class="axis" :transform="`translate(${innerWidth / 2},0)`">
            <g class="ticks" text-anchor="middle">
              <text class="bold capitalize black" :y="leftScale(leftScale.domain()[1]) - 5 - 16">{{indicator.replace(/-/g, ' ')}}</text>
              <text class="black" :y="leftScale(leftScale.domain()[1]) - 5">at +{{warmingLevel}}°&thinsp;C</text>
            </g>
          </g>
          <g class="axis right" :transform="`translate(${innerWidth},0)`">
            <line :y2="innerHeight"/>
            <g class="ticks" text-anchor="middle">
              <text :y="rightScale(rightScale.domain()[0]) + 14">{{format(rightScale.domain()[0])}}&thinsp;{{dimensions[dimension].unit}}</text>
              <text :y="rightScale(rightScale.domain()[1]) - 5">{{format(rightScale.domain()[1])}}&thinsp;{{dimensions[dimension].unit}}</text>
              <text class="bold capitalize" :y="leftScale(leftScale.domain()[1]) - 5 - 16">{{dimensions[dimension].label}}</text>
            </g>
          </g>
        </g>
        <g class="regions">
          <g v-for="(r, i) in regionLabels" :key="`r-${i}`" class="region" :transform="`translate(${r.x} 0)`">
            <line :y1="r.y1" :y2="r.y2" :class="[r.color]"/>
            <line x1="-2" x2="2" :y1="r.y1" :y2="r.y1" :class="[r.color]"/>
            <line x1="-2" x2="2" :y1="r.y2" :y2="r.y2" :class="[r.color]"/>
            <text :y="(r.y1 + r.y2) / 2 + 3" :x="r.text" :text-anchor="r.anchor" :class="[r.color]">
              {{ r.region }}
            </text>
          </g>
        </g>
        <g class="countries">
          <g v-for="(d, i) in data" :key="`d-${i}`" class="country" :class="[d.country.iso]">
            <line x1="6" :y1="hideRef ? d.y2 : d.y1" :y2="d.y2" :x2="innerWidth - 6" :class="[d.color, {fade: d.fade}]" :stroke="d.stroke"/>
            <g class="labels">
              <g v-if="d.label === 'left' || allLabels" :transform="`translate(0 ${d.y1})`">
                <text x="-6" y="3" text-anchor="end" :fill="d.stroke" :class="[d.color]">{{ d.country.stats.name }}</text>
                <line x1="-2" x2="2" :class="[d.color]" :stroke="d.stroke"/>
              </g>
              <g v-if="d.label === 'right' || allLabels" :transform="`translate(${innerWidth} ${d.y2})`">
                <text x="6" :y="3" :class="[d.color]" :fill="d.stroke">{{ d.country.stats.name }}</text>
                <line x1="-2" x2="2" :class="[d.color]" :stroke="d.stroke"/>
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  </div>
</template>

<script>
import raw from '@/assets/data/countries.json'
import regions from '@/assets/data/regions.json'
import { scaleLinear, scalePow } from 'd3-scale'
import { format } from 'd3-format'
export default {
  name: 'ChartSlope',
  props: {
    width: {
      type: Number,
      default: 400
    },
    height: {
      type: Number,
      default: 300
    },
    warmingLevel: {
      type: Number,
      default: 2
    },
    indicator: {
      type: String,
      default: null
    },
    dimension: {
      type: String,
      default: null
    },
    reference: {
      type: String,
      default: null
    },
    highlight: {
      type: [String, Array],
      default: null
    },
    labelLeft: {
      type: Array,
      default () { return ['USA', 'CAN', 'North America'] }
    },
    labelRight: {
      type: Array,
      default () { return ['South Asia', 'CHE'] }
    },
    colorizeBy: {
      type: String,
      default: 'region'
    },
    allLabels: {
      type: Boolean,
      default: false
    },
    hideRef: {
      type: Boolean,
      default: false
    }
  },
  data () {
    const countries = Object.keys(raw).filter(k => k !== 'world' && k !== 'TWN').map(k => {
      return {
        ...raw[k],
        iso: k,
        region: regions[k]
      }
    })
    return {
      countries,
      padding: [48, 75, 32, 75],
      warmingLevels: [0, 0.5, 1.0, 1.5, 2.0],
      colors: {
        'South Asia': 'blue',
        'Europe & Central Asia': 'red',
        'Middle East & North Africa': 'purple',
        'East Asia & Pacific': 'orange',
        'Sub-Saharan Africa': 'yellow',
        'Latin America & Caribbean': 'green',
        'North America': 'violet'
      },
      references: {
        gdpPerCapita: {
          unit: '$',
          label: 'GDP per capita'
        },
        'population': { 'label': 'population', 'unit': 'million' },
        'populationDensity': { 'label': 'Population density', 'unit': 'people/sq. km' },
        'urbanization': { 'label': 'Urbanization', 'unit': '%' },
        'populationGrowth': { 'label': 'Population growth', 'unit': '% per year' },
        'gdp': { 'label': 'Gross Domestic Product', 'unit': '$ billion' },
        'hdi': { 'label': 'Human Development Index', 'unit': '' },
        'co2': { 'label': 'CO2 emissions', 'unit': 't per capita' }
      },
      dimensions: {
        land: {
          unit: '%',
          label: 'land area affected'
        },
        population: {
          unit: '%',
          label: 'population exposed'
        }
      },
      regions
    }
  },
  computed: {
    innerWidth () {
      const { padding, width } = this
      return width - padding[1] - padding[3]
    },
    innerHeight () {
      const { padding, height } = this
      return height - padding[0] - padding[2]
    },
    level () {
      const { warmingLevel, warmingLevels } = this
      return warmingLevels.indexOf(warmingLevel)
    },
    rightScale () {
      const { countries, warmingLevel, indicator, innerHeight, dimension } = this
      const values = countries.map(c => c[indicator][dimension][warmingLevel])
      const domain = [Math.min(...values, 0), Math.max(...values)]
      return scalePow().exponent(1).domain(domain).range([innerHeight, 0]).nice(5)
    },
    rightScaleColors () {
      const { countries, warmingLevel, indicator, dimension } = this
      const values = countries.map(c => c[indicator][dimension][warmingLevel])
      const domain = [Math.min(...values, 0), Math.max(...values)]
      return scaleLinear().domain(domain).range(['#c8005f', '#00a5d5'])
    },
    colorScale () {
      const { countries } = this
      const m = countries.length
      return scaleLinear().domain([0, m * 0.1, m * 0.5, m * 0.9, m]).range(['#c8005f', '#FAD1E4', '#d8d8e4', '#D1F1FA', '#00a5d5'])
    },
    leftScale () {
      const { countries, reference, innerHeight } = this
      const values = countries.map(c => c.stats[reference])
      const domain = [Math.min(...values, 0), Math.max(...values)]
      return scaleLinear().domain(domain).range([innerHeight, 0]).nice(5)
    },
    leftScaleColors () {
      const { countries, reference } = this
      const values = countries.map(c => c.stats[reference])
      const domain = [Math.min(...values, 0), Math.max(...values)]
      return scaleLinear().domain(domain).range(['#f00', '#00f'])
    },
    data () {
      const { countries, leftScale, rightScale, leftScaleColors, rightScaleColors, reference, indicator, warmingLevel, dimension, colors, colorizeBy, regions, labelLeft, labelRight } = this
      return countries.sort((a, b) => a.stats[reference] > b.stats[reference]).map((country, index) => {
        const label = labelLeft.indexOf(country.iso) !== -1
          ? 'left' : labelRight.indexOf(country.iso) !== -1
            ? 'right' : null
        const highlight = (
          (labelLeft.length === 0 && labelRight.length === 0) ||
          label ||
          [...labelLeft, ...labelRight].indexOf(country.region) !== -1
        )
        let color = 'default'
        let stroke = null
        let faded = false
        switch (colorizeBy) {
          case 'region':
            color = colors[regions[country.iso]]
            break
          case 'label-side':
            color = labelLeft.includes(country.iso) || labelLeft.includes(country.region) ? 'blue' : labelRight.includes(country.iso) || labelRight.includes(country.region) ? 'red' : 'default'
            break
          case 'reference':
            color = null
            stroke = leftScaleColors(country.stats[reference])
            break
          case 'topRef':
            const range = 50
            color = index < range ? 'red' : index > countries.length - 1 - range ? 'blue' : 'default'
            faded = color === 'default'
            if (!faded) {
              console.log(country.stats.name)
            }
            // stroke = null
            // color = null
            // stroke = this.colorScale(index)
            break
          case 'indicator':
            color = null
            stroke = rightScaleColors(country[indicator][dimension][warmingLevel])
            break
        }
        return {
          y1: leftScale(country.stats[reference]),
          y2: rightScale(country[indicator][dimension][warmingLevel]),
          country,
          label,
          color,
          fade: !highlight || faded,
          stroke
        }
      }) // .reverse()
    },
    regionLabels () {
      const { countries, leftScale, rightScale, reference, indicator, warmingLevel, dimension, colors, colorizeBy, regions, labelLeft, labelRight, innerWidth } = this
      const regionsFlipped = Object.fromEntries([...new Set(Object.keys(regions).map(c => regions[c]))].map(r => {
        return [ r, Object.keys(regions).filter(c => regions[c] === r) ]
      }))
      return [
        ...labelLeft.filter(l => Object.keys(regionsFlipped).indexOf(l) !== -1).map(r => {
          const values = countries.filter(c => regionsFlipped[r].includes(c.iso)).map(c => c.stats[reference])
          let color = 'default'
          switch (colorizeBy) {
            case 'region':
              color = colors[r]
              break
            case 'label-side':
              color = 'blue'
              break
          }
          return {
            anchor: 'end',
            x: 0,
            region: r,
            y1: leftScale(Math.min(...values)),
            y2: leftScale(Math.max(...values)),
            color,
            text: -6
          }
        }),
        ...labelRight.filter(l => Object.keys(regionsFlipped).indexOf(l) !== -1).map(r => {
          const values = countries.filter(c => regionsFlipped[r].includes(c.iso)).map(c => c[indicator][dimension][warmingLevel])
          let color = 'default'
          switch (colorizeBy) {
            case 'region':
              color = colors[r]
              break
            case 'label-side':
              color = 'red'
              break
          }
          return {
            anchor: 'start',
            x: innerWidth,
            region: r,
            y1: rightScale(Math.min(...values)),
            y2: rightScale(Math.max(...values)),
            color,
            text: 6
          }
        })
      ]
    }

    // yTicks () {
    //   const { yScale, axisWidth } = this
    //   return yScale.ticks(3).map((value, i, ticks) => {
    //     return {
    //       value,
    //       y: yScale(value),
    //       textOffset: -3,
    //       x: axisWidth / 2
    //     }
    //   })
    // }
  },
  methods: {
    format (value) {
      return format(',.2~r')(value).replace(/,/g, ' ')
    }
  }
}
</script>

<style scoped lang="scss">
@import "library/src/style/global.scss";
$transition: $transition * 2;
.chart-slope {
  display: flex;
  flex-direction: column;
  // justify-content: center;
  // align-items: center;
  // padding: $spacing 0 $spacing / 2;

  svg {
    overflow: visible;
    .axes {
      .axis {
        line {
          stroke: $color-pale-gray;
          stroke-width: 1;
        }
        text {
          fill: $color-deep-gray;
          &.black {
            fill: $color-black;
          }
        }
      }
    }
  }
  .regions {
    .region {
      mix-blend-mode: multiply;
      line {
        mix-blend-mode: multiply;
        stroke-width: 1;
        stroke-linecap: round;
        &.default {
          stroke: $color-dark-gray;
        }
        @include tint(stroke);
      }
      text {
        font-weight: $font-weight-bold;
      }
    }
  }
  .countries {
    .country {
      line {
        &.default {
          stroke: $color-dark-gray;
        }
        mix-blend-mode: multiply;
        opacity: 0.8;
        stroke-width: 1;
        stroke-linecap: round;

        &.fade {
          opacity: 0.1
        }

        @include tint(stroke);
      }
      circle {
        @include tint(fill);
        // @include tint(stroke);
        stroke-width: 1;
      }
    }
  }
  text {
    @include tint(fill);

    &.bold {
      font-weight: bold;
    }
    &.capitalize {
      text-transform: capitalize;
    }
  }
}
</style>
