<template>
  <div class="chart-dumbbell" v-resize:debounce.initial="onResize">
    <svg width="100%" :height="chartHeight">
    </svg>
  </div>
</template>

<script>
// import raw from '@/assets/data/details.json'
// import VueInterpolate from './Interpolate'
// import { scaleLinear } from 'd3-scale'
// import { format } from 'd3-format'
import resize from 'vue-resize-directive'
export default {
  name: 'chart-dumbbell',
  directives: {
    resize
  },
  components: {
    // VueInterpolate
  },
  props: {
  },
  data () {
    return {
      width: 100,
      height: 100
    }
  },
  computed: {
    chartHeight () {
      return this.height - 64
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
.chart-dumbbell {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
  padding-bottom: 64px;

  svg {
    background: red;
  }
}
</style>
