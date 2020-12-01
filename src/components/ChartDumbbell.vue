<template>
  <div class="chart-dumbbell" v-resize:debounce.initial="onResize">
    <svg width="100%" :height="dims.svgHeight">
      <g class="title">
        <text :y="dims.textAnchorTop">Global land area and population exposed to {{category}}</text>
      </g>
      <g class="footer" :transform="`translate(0 ${dims.chartHeight + dims.titleHeight + dims.textAnchorTop})`">
        <text>land area</text>
        <text :x="dims.subjectWidth + dims.axisWidth">population</text>
      </g>
      <g class="chart" :transform="`translate(0 ${dims.titleHeight})`">
        <g class="axis" :transform="`translate(${dims.chartWidth / 2} 0)`">
          <g v-for="(tick, i) in yTicks" :key="i"
            class="tick" :transform="`translate(0 ${tick.y})`">
            <template v-if="i === 0">
              <line :x1="-dims.chartWidth / 2" :x2="-dims.axisWidth / 2"/>
              <line :x1="dims.chartWidth / 2" :x2="dims.axisWidth / 2"/>
            </template>
            <line :x1="-dims.axisInnerWidth / 2" :x2="dims.axisInnerWidth / 2"/>
            <text :y="dims.textAnchorBottom">{{tick.value}}%</text>
          </g>
        </g>
        <g class="subject" v-for="(subject, i) in subjects" :key="i">
          <g class="gradients" v-bind="filters.gradient">
            <g class="level" v-for="(level, i) in subject.levels" :key="i" :transform="level.transform">
              <rect v-if="level.gradient" :height="level.gradient.height" :width="dims.subjectWidth"
                :fill="level.gradient.fill"/>
            </g>
          </g>
          <g v-bind="filters.sep" class="sep" :transform="`translate(${i * (dims.subjectWidth + dims.axisWidth)} 0)`">
            <line v-for="i in 3" :key="i" :transform="`translate(${(i) * dims.climateWidth} 0)`" :y1="-dims.lineHeight" :y2="dims.chartHeight - dims.defMargin"/>
          </g>
          <g class="median" v-bind="filters.median">
           <g class="level" v-for="(level, i) in subject.levels" :key="i" :transform="level.transform" v-bind="filters.levels[i]">
              <line :class="level.color" :x2="dims.subjectWidth"/>
              <text v-if="getOption('levels').indexOf(i) !== -1" :class="level.color" text-anchor="middle" :x="dims.subjectWidth / 2" :y="dims.textAnchorBottom">{{level.val}}%</text>
            </g>
          </g>
          <g class="climate" v-bind="filters.climate">
            <g class="level" v-for="(level, l) in subject.levels" :key="l" v-bind="filters.levels[l]">
              <g class="climate" v-for="(climate, i) in level.climates.filter(c => c)" :key="i">
                <g :opacity="annotations === null || annotations.find(a => a.label[0] === climate.label[0]) ? 1 : 0.2">
                  <g class="gradient" v-if="climate.gradient" v-bind="filters.levelGradients[l]">
                    <line :transform="climate.transform" :y2="climate.gradient.height"
                      :x1="dims.climateInnerWidth / 2" :x2="dims.climateInnerWidth / 2 + 0.001" :stroke="climate.gradient.fill"/>
                  </g>
                  <g :transform="climate.transform">
                    <line :class="level.color" :x2="dims.climateInnerWidth"/>
                  </g>
                  <g v-if="getOption('view') === 'climate' && climate.highest" class="interaction-layer">
                    <rect :x="climate.x" :width="dims.climateInnerWidth" :height="dims.chartHeight"
                      @mouseover="setOption('annotations', [{x: climate.x + dims.climateInnerWidth / 2, y: climate.y, label: climate.label, type: 'model'}])"
                      @mouseleave="setOption('annotations', null)"/>
                  </g>
                </g>
              </g>
            </g>
          </g>
          <g class="impact" v-bind="filters.impact">
            <g class="level" v-for="(level, l) in subject.levels" :key="l" v-bind="filters.levels[l]">
              <g class="climate" v-for="(climate, i) in level.climates.filter(c => c)" :key="i">
                <g class="impact" v-for="(impact, i) in climate.impacts.filter(c => c)" :key="i"
                  :opacity="annotations === null || annotations.find(a => a.label[0] === impact.label[0]) ? 1 : 0.2">
                  <g class="gradient" v-if="category !== 'tropical cyclone' && impact.gradient" v-bind="filters.levelGradients[l]">
                    <line :transform="impact.transform" :y2="impact.gradient.height"
                      :x1="impact.gradient.x" :x2="impact.gradient.x + 0.001" :stroke="impact.gradient.fill"/>
                  </g>
                  <g :transform="impact.transform">
                    <line :class="level.color" :x2="impact.width"/>
                  </g>
                  <g v-if="getOption('view') === 'impact' && impact.highest && category !== 'tropical cyclone'" class="interaction-layer">
                    <rect :x="impact.x" :width="impact.width" :height="dims.chartHeight"
                      @mouseover="setOption('annotations', [{x: impact.x + impact.width / 2, y: impact.y, label: impact.label, type: 'model'}])"
                      @mouseleave="setOption('annotations', null)"/>
                  </g>
                </g>
              </g>
            </g>
          </g>
        </g>
        <g class="ranges">
          <g class="range" :class="r.color" v-for="(r, i) in ranges" :key="i">
            <ChartAnnotation :label="`${r.max.val}%`" :color="r.color" :x="r.max.cx" :y="r.max.y" arrow :offset="1"
              :left="alignRange(r.max.cx)" top/>
            <ChartAnnotation :label="`${r.min.val}%`" :color="r.color" :x="r.min.cx" :y="r.min.y" arrow :offset="1"
              :left="alignRange(r.min.cx)" :top="false"/>
            <!-- <text :x="r.max.cx" :y="r.max.y + dims.textAnchorBottom">{{ r.max.val }}%</text>
            <text :x="r.min.cx" :y="r.min.y  + dims.textAnchorTop">{{ r.min.val }}%</text> -->
          </g>
        </g>
        <g class="annotations" v-if="annotations">
          <ChartAnnotation v-for="(a, i) in annotations" :key="i"
            v-bind="a" arrow :offset="1" :left="a.x > dims.subjectWidth"/>
        </g>
        <g class="annotations" v-if="annotations">
          <ChartAnnotation v-for="(a, i) in annotations" :key="i"
            v-bind="a" arrow :offset="1" :left="a.x > dims.subjectWidth"/>
        </g>
      </g>
    </svg>
    <div class="key tiny">
      <span>
        <span v-for="(d, i) in allLevels" :key="i"
          class="highlight"
          :class="[colors[d], { hide: warmingLevels.indexOf(d) === -1, active: getOption('levels').indexOf(i) !== -1}]"
          @mouseover="setOption('levels', [i])"
          @mouseleave="setOption('levels', null)">
          +{{ d }}°C
        </span>
      </span>
      <!-- <span class="button warming-level" @click="showSpread = !showSpread">
        Toggle View
      </span> -->
    </div>
    <div class="view tiny">
      <span>
        <span v-for="(view, i) in Object.keys(views)" :key="i"
          :class="[getOption('view', true) === view ? 'button' : 'highlight', {hide: views[view].hide}]"
          @click="setOption('view', view, true)"
          @mouseover="setOption('view', view)"
          @mouseleave="setOption('view', null)">
          {{ views[view].label }}
        </span>
      </span>
    </div>
  </div>
</template>

<script>
import ChartAnnotation from './ChartAnnotation.vue'
import { scaleLinear } from 'd3-scale'
import { format as d3Format } from 'd3-format'
import resize from 'vue-resize-directive'
export default {
  name: 'chart-dumbbell',
  directives: {
    resize
  },
  components: {
    ChartAnnotation
  },
  props: {
    category: String,
    data: {
      type: Object,
      default: null
    },
    warmingLevels: {
      type: Array,
      default () {
        return [0, 1, 1.5, 2, 3]
      }
    },
    domain: {
      type: Array,
      default () {
        return [0, 30]
      }
    },
    ticks: {
      type: Array,
      default () {
        return [0, 10, 20, 30]
      }
    },
    dimensions: {
      type: Array,
      default () {
        return [{
          key: 'land',
          name: 'land area'
        }, {
          key: 'population',
          name: 'population'
        }]
      }
    },
    views: {
      type: Object,
      default () {
        return {
          median: { label: 'Median' },
          climate: { label: 'Climate Models' },
          impact: { label: 'Impact Models' }
        }
      }
    }
  },
  data () {
    return {
      debug: true,
      width: 200,
      height: 200,
      colors: { 0: 'blue', 1: 'yellow', 1.5: 'orange', 2: 'red', 3: 'purple' },
      gradients: { 0: 'url(#level-0)', 1: 'url(#level-1)', 1.5: 'url(#level-1-5)', 2: 'url(#level-2)', 3: 'url(#level-3)' },
      highlightLevel: null,
      allLevels: [0, 1, 1.5, 2, 3],
      oldTicks: [],
      showSpread: false,
      annotation: null,
      options: {
        view: {
          fix: 'median',
          temp: null
        },
        annotations: {
          fix: null,
          temp: null
        },
        levels: {
          fix: [],
          temp: null
        },
        climate: {
          fix: null,
          temp: null
        },
        impact: {
          fix: null,
          temp: null
        },
        subject: {
          fix: null,
          temp: null
        }
      }
    }
  },
  computed: {
    dims () {
      const { height, width } = this

      const subjects = 2
      const models = 4

      const textAnchorTop = 16
      const textAnchorBottom = -4
      const lineHeight = textAnchorTop - textAnchorBottom
      const defMargin = 2
      const svgHeight = height - 64
      const titleHeight = lineHeight * 2.5
      const footerHeight = lineHeight
      const chartHeight = svgHeight - titleHeight - footerHeight
      const chartWidth = width
      const axisWidth = 40
      const axisInnerWidth = axisWidth - defMargin * 2
      const subjectWidth = (chartWidth - axisWidth) / subjects
      const climateWidth = subjectWidth / models
      const climateInnerWidth = climateWidth - defMargin * 2
      return {
        svgHeight,
        titleHeight,
        textAnchorTop,
        textAnchorBottom,
        lineHeight,
        chartHeight,
        chartWidth,
        axisWidth,
        defMargin,
        axisInnerWidth,
        subjectWidth,
        climateWidth,
        climateInnerWidth
      }
    },
    format () {
      return d3Format(',.2~r')
    },
    yScale () {
      const { dims, domain } = this
      return scaleLinear().domain(domain).range([dims.chartHeight, 0]).nice(3)
    },
    yTicks () {
      const { yScale, dims } = this
      return yScale.ticks(3).map((value) => {
        return {
          value,
          y: yScale(value),
          textOffset: -3,
          x: dims.axisWidth / 2
        }
      })
    },
    subjects () {
      const { data, warmingLevels, yScale, format, dims, colors } = this
      if (warmingLevels.length === 0) return []
      const subjects = ['land', 'population'].map((subject) => {
        const subjectX = subject === 'land' ? 0 : (dims.subjectWidth + dims.axisWidth)
        return {
          levels: warmingLevels.map((level, i) => {
            const val = data[subject][level].median
            const y = Math.round(yScale(val))
            const climates = Object.keys(data[subject][level].cm).map((climate, i2, climates) => {
              const climateX = subjectX + dims.climateWidth * i2 + dims.defMargin
              const val = data[subject][level].cm[climate].median
              if (val == null) return null
              const y = Math.round(yScale(val))
              const impacts = Object.keys(data[subject][level].cm[climate].im).map((impact, i3, impacts) => {
                const impactWidth = dims.climateInnerWidth / impacts.length
                const impactX = climateX + impactWidth * i3
                const val = data[subject][level].cm[climate].im[impact]
                if (val == null) return null
                const y = Math.round(yScale(val))
                return {
                  x: impactX,
                  cx: impactX + impactWidth / 2,
                  y,
                  label: [impact, climate],
                  centerX: impactWidth / 2,
                  transform: `translate(${impactX} ${y})`,
                  val: format(val),
                  width: Math.max(impactWidth, 1)
                }
              })
              return {
                transform: `translate(${climateX} ${y})`,
                val: format(val),
                x: climateX,
                cx: climateX + dims.climateInnerWidth / 2,
                y,
                label: [climate],
                impacts
              }
            })
            return {
              val: format(val),
              transform: `translate(${subjectX} ${y})`,
              x: subjectX,
              y,
              color: colors[level],
              climates
            }
          })
        }
      })
      // make gradients
      subjects.forEach(subject => {
        [...subject.levels].sort((a, b) => a.y < b.y).forEach((level, i, levels) => {
          if (i === 0) return
          const pre = levels[i - 1]
          level.gradient = {
            height: pre.y - level.y,
            fill: `url(#grad-${pre.color}-${level.color})`
          }
        })
        const climates = subject.levels[0].climates.map((c, i) => i)
        climates.forEach(climateIndex => {
          [...subject.levels].filter(a => a.climates[climateIndex] != null).sort((a, b) => a.climates[climateIndex].y < b.climates[climateIndex].y).forEach((level, i, levels) => {
            if (i === 0) return
            const pre = levels[i - 1]
            level.climates[climateIndex].gradient = {
              height: pre.climates[climateIndex].y - level.climates[climateIndex].y,
              fill: `url(#grad-${pre.color}-${level.color})`
            }
            if (i === levels.length - 1) level.climates[climateIndex].highest = true
          })
          const impacts = subject.levels[0].climates[climateIndex].impacts.map((c, i) => i)
          impacts.forEach(impactIndex => {
            [...subject.levels]
              .filter(a => a.climates[climateIndex] != null && a.climates[climateIndex].impacts[impactIndex] !== null)
              .sort((a, b) => a.climates[climateIndex].impacts[impactIndex].y < b.climates[climateIndex].impacts[impactIndex].y)
              .forEach((level, i, levels) => {
                if (i === 0) return
                const pre = levels[i - 1]
                level.climates[climateIndex].impacts[impactIndex].gradient = {
                  height: pre.climates[climateIndex].impacts[impactIndex].y - level.climates[climateIndex].impacts[impactIndex].y,
                  fill: `url(#grad-${pre.color}-${level.color})`,
                  x: pre.climates[climateIndex].impacts[impactIndex].centerX
                }
                if (i === levels.length - 1) level.climates[climateIndex].impacts[impactIndex].highest = true
              })
          })
        })
      })
      return subjects
    },
    ranges () {
      const levels = this.getOption('levels')
      const view = this.getOption('view')
      if (levels.length !== 1 || view === 'median') return []
      const ranges = this.subjects.map(subject => {
        return levels.map(level => {
          const all = ((view === 'climate')
            ? subject.levels[level].climates
            : subject.levels[level].climates.filter(d => d != null).map(({ impacts }) => impacts).flat())
            .filter(d => d != null)
          const max = all.reduce((prev, curr) => prev.y < curr.y ? prev : curr)
          const min = all.reduce((prev, curr) => prev.y > curr.y ? prev : curr)
          return { max, min, color: subject.levels[level].color }
        })
      }).flat()
      return ranges
    },
    annotations () {
      const annotations = this.getOption('annotations')
      if (annotations != null) return annotations
      const climate = this.getOption('climate')
      const impact = this.getOption('impact')
      const subject = this.getOption('subject')
      // const level = this.getOption('level')
      if (climate == null && impact == null) return null
      if (impact == null) {
        return this.subjects.filter((s, i) => subject == null || subject.indexOf(i) !== -1).map(subject => {
          return climate.map(c => {
            const d = subject.levels.find(l => l.climates[c] && l.climates[c].highest)
            if (d == null) return null
            return {
              x: d.climates[c].cx,
              y: d.climates[c].y,
              label: d.climates[c].label
            }
          }).filter(d => d != null)
        }).flat()
      }
      return this.subjects.filter((s, i) => subject == null || subject.indexOf(i) !== -1).map(subject => {
        return (climate || [0, 1, 2, 3]).map(c => {
          return impact.map(i => {
            const d = subject.levels.find(l => l.climates[c] && l.climates[c].impacts[i] && l.climates[c].impacts[i].highest)
            if (d == null) return null
            return {
              x: d.climates[c].impacts[i].cx,
              y: d.climates[c].impacts[i].y,
              label: d.climates[c].impacts[i].label
            }
          }).filter(d => d != null)
        })
      }).flat(2)
    },
    filters () {
      const view = this.getOption('view')
      const levels = this.getOption('levels')
      return {
        sep: view === 'median' ? { opacity: 0 } : { opacity: 1 },
        gradient: view === 'median' && (this.getOption('levels', false) == null) ? { opacity: 0.2 } : { opacity: 0.1 },
        median: view === 'median' ? { opacity: 1, strokeWidth: 2 } : { opacity: 0, strokeWidth: 2 },
        climate: view === 'climate' ? { opacity: 1 } : { opacity: 0 },
        impact: view === 'impact' ? { opacity: 1 } : { opacity: 0 },
        levels: [0, 1, 2, 3, 4].map(l => {
          return { opacity: levels.length === 0 || levels.indexOf(l) !== -1 ? 1 : 0.1 }
        }),
        levelGradients: [0, 1, 2, 3, 4].map(l => {
          return { opacity: levels.length === 0 || levels.indexOf(l) === -1 ? 1 : 0.1 }
        })
      }
    }
  },
  methods: {
    getOption (key, fix) {
      return (this.options[key].temp == null || fix === true) && fix !== false ? this.options[key].fix : this.options[key].temp
    },
    setOption (key, val, fix) {
      this.options[key][fix ? 'fix' : 'temp'] = val
    },
    onResize (el) {
      this.width = el.getBoundingClientRect().width
      this.height = el.getBoundingClientRect().height
    },
    alignRange (x) {
      const { dims } = this
      if (x < dims.subjectWidth / 2) return false
      if (x < dims.subjectWidth) return true
      if (x < dims.chartWidth - dims.subjectWidth / 2) return false
      return true
    },
    // annotate (opt) {
    //   const climate = (opt.match(/C([^A-z]+)/) || [])
    //   console.log(climate)
    // },
    setSpread (val) {
      this.showSpread = val
    },
    setLevel (val) {
      this.highlightLevel = val
    }
  },
  watch: {
  }
}
</script>

<style scoped lang="scss">
@import "library/src/style/global.scss";
// $transition: $transition * 10;
.chart-dumbbell {
  display: flex;
  flex-direction: column;
  // justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;

  svg {
    overflow: visible;
    // line {
    //   stroke-width: 1;
    // }

    * {
      pointer-events: none;
    }
    .interaction-layer {
      pointer-events: all;
      opacity: 0;
      // fill: red;

      * {
        pointer-events: all;
      }
    }
    .axis {
      line {
        stroke: getColor(neon, 60);
        // stroke-dasharray: 2 4;
      }
      text {
        fill: $color-deep-gray;
        text-anchor: middle;
      }
      .tick {
        transition: opacity $transition $transition, transform $transition;
        &.fade-leave-active {
          transition: opacity $transition, transform $transition;
        }
        &.fade-enter, &.fade-leave-to {
          opacity: 0;
        }
        &.hide {
          opacity: 0;
        }
      }
    }
    .subject {
      rect, line, g {
        transition: opacity $transition, display $transition, stroke-width $transition;
      }
      .level {
        text {
          @include tint(fill);
        }
        line, path {
          fill: none;
          @include tint(stroke);
        }
      }
    }
    .sep {
      line {
        stroke: getColor(neon, 60);
        stroke-dasharray: 2 4;
      }
    }
    .range {
      @include tint(fill);
      text-anchor: middle;
    }
  }

  .key, .view {
    align-self: flex-start;
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: $spacing / 4;

    span {
      transition: all $transition;
      &.hide {
        opacity: 0.3;
        pointer-events: none;
      }
      &.active:hover {
        @include tint(background, 80)
      }
      + span {
        margin: 0 0 0 $spacing / 8;
      }

    }
    .button {
      align-self: flex-end;
      justify-self: flex-end;
    }
  }
}
</style>
