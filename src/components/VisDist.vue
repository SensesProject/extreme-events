<template>
  <div class="vis-dist" v-resize:debounce.initial="onResize">
    <svg :width="width" :height="height">

      <g class="axis" :transform="`translate(${width / 2} ${innerHeight})`">
        <!-- <g class="dots">
          <circle v-for="(d, i) in dots" :key="`d-${i}`" r="2" :cx="d.x" :cy="d.y"/>
        </g> -->
        <!-- <NormalDistribution class="base" v-bind="props[0]"/> -->
        <NormalDistribution class="base" :max="width" v-bind="props[1]" :y="-0.5"/>
        <VueInterpolate tag="g" :attrs="{ props: {value: props[step], duration: 400}}" v-slot="{ attrs }">
          <!-- <NormalDistribution class="new" v-bind="attrs.props" :max="width" :class="{start: step <= 1}"/> -->
          <NormalDistributionDots class="dot-wrapper" v-bind="attrs.props" :max="width" :class="{start: step <= 1}" :stage1="step > 0 ? width * 0.4 / 2 : width" :stage2="step > 0 ? width * 0.6 / 2 : width"/>
        </VueInterpolate>
      </g>
      <g class="labels" :transform="`translate(${width / 2} 0)`">
        <VueInterpolate tag="g" :attrs="{ opacity: {value: step === 3 || step === 4 ? 1 : 0, duration: 400}}" v-slot="{ attrs }">
          <text :opacity="attrs.opacity" :y="innerHeight / 2 + 8" :x="-width * 0.085">→</text>
        </VueInterpolate>
        <VueInterpolate tag="g" :attrs="{
          opacity: {value: step === 4 ? 1 : 0, duration: 400},
          x: {value: width * 0.1, duration: 400}
        }" v-slot="{ attrs }">
          <text :opacity="attrs.opacity" :y="innerHeight * 0.1 + 8" :x="attrs.x">↓</text>
        </VueInterpolate>
      </g>
      <g class="axis" :transform="`translate(${width / 2} ${height})`">
        <!-- <line :x1="-width / 2" :x2="width / 2"/> -->
        <text class="label">temperature</text>
        <text class="label" :x="-width * 0.3">← colder</text>
        <text class="label" :x="width * 0.3">hotter →</text>
      </g>
      <!-- <g class="axis x-axis" :transform="`translate(0 ${height/2}) rotate(-90)`">
        <text :x="-innerHeight / 2">↑ higher</text>
        <text :x="0">frequency</text>
        <text :x="innerHeight / 2">hotter →</text>
      </g> -->
      <g class="axis x-axis">
        <text>Distribution of daily average temperatures</text>
        <text class="label" y="20">more frequent</text>
        <text class="label" y="20" x="-14">↑</text>
        <text class="label" :y="innerHeight - 16">less frequent</text>
        <text class="label" :y="innerHeight - 16" x="-14">↓</text>
        <!-- <text :x="0">frequency</text>
        <text :x="innerHeight / 2">hotter →</text> -->
      </g>
    </svg>
  </div>
</template>

<script>
import resize from 'vue-resize-directive'
import NormalDistribution from '@/components/NormalDistribution.vue'
import NormalDistributionDots from '@/components/NormalDistributionDots.vue'
import VueInterpolate from './Interpolate'

export default {
  name: 'vis-dist',
  directives: {
    resize
  },
  components: {
    NormalDistribution,
    NormalDistributionDots,
    VueInterpolate
  },
  props: {
    step: {
      default: 0,
      type: Number
    }
  },
  data () {
    return {
      width: 200,
      height: 100
    }
  },
  computed: {
    innerHeight () {
      return this.height - 24
    },
    // dots () {
    //   const { width, height } = this
    //   const half = width / 2
    //   const dots = []
    //   for (let x = -half; x <= half; x += 12) {
    //     for (let y = 0; y >= -height; y -= 12) {
    //       dots.push({ x, y })
    //     }
    //   }
    //   return dots
    // },
    props () {
      const { width, innerHeight } = this

      return [{
        width: width * 0.6,
        height: innerHeight,
        x: 0,
        opacity: 1
      }, {
        width: width * 0.6,
        height: innerHeight,
        x: 0
      }, {
        width: width * 0.6,
        height: innerHeight,
        x: width * 0.1
      }, {
        width: width * 0.8,
        height: innerHeight * 0.8,
        x: width * 0.1
      }]
    }
  },
  methods: {
    onResize (el) {
      this.width = el.getBoundingClientRect().width
      this.height = this.width / 2.5
    }
  }
}
</script>

<style scoped lang="scss">
@import "library/src/style/global.scss";

.vis-dist {
  // height: 100%;
  display: flex;
  justify-content: center;
  // align-items: center;

  svg {
    display: block;
    position: sticky;
    top: 50vh;
    overflow: visible;

    ::v-deep {
      .base {
        .normal-dist {

          // fill: url(#dist);
          fill: none;
          stroke: $color-deep-gray;
          stroke-width: 2;
          stroke-dasharray: 6 6;
        }
      }
      .dot-wrapper {
        .normal-dist {
          fill: none;
          stroke: $color-deep-gray;
          stroke-width: 2;
          // stroke-dasharray: 4 4;

          // fill: url(#dist);
          // transition: fill $transition;
          // &.start {
          //   fill: url(#dist-start);
          // }
        }
      }
      text {
        text-anchor: middle;
      }
      .axis {
        line {
          stroke: $color-deep-gray;
        }
        .label {
          fill: getColor(gray, 40);
        }
        &.x-axis {
          text {
            text-anchor: start;
          }
        }
      }
    }
  }
}
</style>
