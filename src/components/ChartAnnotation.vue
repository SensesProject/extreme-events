<template>
  <g class="chart-annotation" v-bind="bindings">
    <circle v-if="!arrow" r="5"/>
    <path v-else :d="`M -4 ${top ? - 7 : 7} L 0 ${top ? - 3 : 3} L 4 ${top ? - 7 : 7} M 0 ${top ? - 4 : 4} L 0 ${top ? - 5 : 5}`"/>
    <path :d="`M 0 ${top ? -5 : 5} A 10 10 0 0 ${left === top ? 0 : 1} ${left ? -10 : 10} ${top ? -15 : 15} L ${left ? -15 : 15} ${top ? -15 : 15}`"/>
    <g :transform="`translate(${left ? -20 : 20} ${top ? -15 : 15})`" :text-anchor="left ? 'end' : 'start'">
      <!-- <text class="shadow" y="4">{{label}}</text> -->
      <template v-if="typeof(label) === 'string'">
        <text y="4" class="shadow">{{label}}</text>
        <text y="4">{{label}}</text>
      </template>
      <template v-else>
        <text y="4" class="shadow">
          <tspan v-for="(l,i) in label" :key="i" x="0" :dy="16 * (top ? -i : i)">{{l}}</tspan>
        </text>
        <text y="4">
          <tspan v-for="(l,i) in label" :key="i" x="0" :dy="16 * (top ? -i : i)">{{l}}</tspan>
        </text>
      </template>
    </g>
  </g>
</template>

<script>
export default {
  name: 'chart-annotation',
  props: {
    // align: {
    //   type: Object,
    //   default () {
    //     return {

    //     }
    //   }
    // },
    x: Number,
    y: Number,
    top: { type: Boolean, default: true },
    left: { type: Boolean, default: true },
    label: [String, Array],
    arrow: Boolean,
    offset: { type: Number, default: 0 }
  },
  computed: {
    bindings () {
      const { x, y, offset, top } = this
      if (x == null || y == null) return {}
      return {
        transform: `translate(${x} ${y + offset * (top ? -1 : 1)})`
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import "library/src/style/global.scss";
.chart-annotation {
  circle, path {
    stroke: $color-black;
    fill: none;
  }

  text {
    fill: $color-black;
    &.shadow {
      stroke: $color-white;
      fill: $color-white;
      stroke-width: 2;
    }
  }
}
</style>
