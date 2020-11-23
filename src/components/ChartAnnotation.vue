<template>
  <g class="chart-annotation" v-bind="bindings">
    <circle :class="color" v-if="!arrow" r="5"/>
    <path :class="color" v-else :d="`M -4 ${top ? - 7 : 7} L 0 ${top ? - 3 : 3} L 4 ${top ? - 7 : 7} M 0 ${top ? - 4 : 4} L 0 ${top ? - 5 : 5}`"/>
    <path :class="color" :d="`M 0 ${top ? -5 : 5} A 10 10 0 0 ${left === top ? 0 : 1} ${left ? -10 : 10} ${top ? -15 : 15} L ${left ? -15 : 15} ${top ? -15 : 15}`"/>
    <g class="text" :class="color" :transform="`translate(${left ? -20 : 20} ${top ? -15 : 15})`" :text-anchor="left ? 'end' : 'start'">
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
          <tspan v-for="(l,i) in label" :key="i" x="0" :dy="16 * (top ? -i : i)" :class="{light: i > 0}">{{l}}</tspan>
        </text>
      </template>
    </g>
  </g>
</template>

<script>
export default {
  name: 'chart-annotation',
  props: {
    x: Number,
    y: Number,
    top: { type: Boolean, default: true },
    left: { type: Boolean, default: true },
    label: [String, Array],
    arrow: Boolean,
    offset: { type: Number, default: 0 },
    color: String
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
    stroke: $color-neon;
    @include tint(stroke);
    fill: none;
  }

  .text {
    fill: $color-neon;

    @include tint(fill);

    .light {
      fill: getColor(neon, 60);
    }

    .shadow {
      stroke: $color-white;
      fill: $color-white;
      stroke-width: 2;
    }
  }
}
</style>
