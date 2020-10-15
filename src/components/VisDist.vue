<template>
  <div class="vis-dist" v-resize:debounce.initial="onResize">
    <svg :width="width" :height="height">
      <g class="axis" :transform="`translate(${width / 2} ${innerHeight})`">
        <!-- <NormalDistribution class="base" v-bind="props[0]"/> -->
        <VueInterpolate tag="g" :attrs="{ props: {value: props[step], duration: 400}}" v-slot="{ attrs }">
          <NormalDistribution class="new" v-bind="attrs.props" :max="width"/>
        </VueInterpolate>
        <NormalDistribution class="base" v-bind="props[0]" :y="-0.5"/>
      </g>
      <g class="labels" :transform="`translate(${width / 2} 0)`">
        <VueInterpolate tag="g" :attrs="{ opacity: {value: step === 1 || step === 3 ? 1 : 0, duration: 400}}" v-slot="{ attrs }">
          <text :opacity="attrs.opacity" :y="innerHeight / 2 + 8" :x="-width * 0.085">→</text>
        </VueInterpolate>
        <VueInterpolate tag="g" :attrs="{
          opacity: {value: step === 2 || step === 3 ? 1 : 0, duration: 400},
          x: {value: step <= 2 ? 0 : width * 0.1, duration: 400}
        }" v-slot="{ attrs }">
          <text :opacity="attrs.opacity" :y="innerHeight * 0.1 + 8" :x="attrs.x">↓</text>
        </VueInterpolate>
      </g>
      <g class="axis" :transform="`translate(${width / 2} ${height})`">
        <!-- <line :x1="-width / 2" :x2="width / 2"/> -->
        <text>average</text>
        <text :x="-width * 0.3">← colder</text>
        <text :x="width * 0.3">hotter →</text>
      </g>
    </svg>
  </div>
</template>

<script>
import resize from 'vue-resize-directive'
import NormalDistribution from '@/components/NormalDistribution.vue'
import VueInterpolate from './Interpolate'

export default {
  name: 'vis-dist',
  directives: {
    resize
  },
  components: {
    NormalDistribution,
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
    props () {
      const { width, innerHeight } = this

      return [{
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
        x: 0
      }, {
        width: width * 0.8,
        height: innerHeight * 0.8,
        x: width * 0.1
      }, {
        width: width * 0.6,
        height: innerHeight * 0.2,
        x: width * 0.2
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

    .normal-dist {
      &.base {
        // opacity: 0.2;
        fill: getColor(gray, 80);
        // fill: url(#dist);
        fill: none;
        stroke: $color-deep-gray;
        stroke-width: 1;
        stroke-dasharray: 4 4;
      }
      &.new {
        // fill: getColor(yellow, 60);
        fill: url(#dist);
      }
    }
    .axis {
      line {
        stroke: $color-deep-gray;
      }
    }
    text {
      text-anchor: middle;
    }
  }
}
</style>
