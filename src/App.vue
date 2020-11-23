<template>
  <div id="app">
    <SensesMenu message="Work in Progress"/>
    <article>
      <Maps/>
      <Distribution/>
      <Categories/>
      <Conclusion/>
    </article>
    <SensesMeta class="senses-meta" id="extreme-events"/>
  </div>
</template>
<script>
import SensesMenu from 'library/src/components/SensesMenu.vue'
import Distribution from '@/views/Distribution.vue'
import Categories from '@/views/Categories.vue'
import Conclusion from '@/views/Conclusion.vue'
import Maps from '@/views/Maps.vue'

import tippy, { inlinePositioning } from 'tippy.js'
import 'tippy.js/dist/tippy.css'

import SensesMeta from 'library/src/components/SensesMeta.vue'
export default {
  components: {
    SensesMenu,
    Distribution,
    Categories,
    Maps,
    Conclusion,
    SensesMeta
  },
  data () {
    return {
      tips: null
    }
  },
  mounted () {
    this.tips = tippy('.md-tooltip', {
      // trigger: 'click',
      inlinePositioning: true,
      offset: [0, 5],
      maxWidth: 300,
      content: (reference) => reference.getAttribute('data-tooltip'),
      plugins: [inlinePositioning]
    })
  },
  beforeDestroy () {
    this.tips.destroy()
  }
}
</script>

<style lang="scss">
@import "library/src/style/base.scss";
#app {

  .text {
    pointer-events: none;
  }
  article {
    width: 100%;
    margin-bottom: $spacing;
    > section, .max-width {
      margin: auto;
      width: 100%;
      max-width: calc(768px + #{$spacing});
      padding-left: $spacing / 2;
      padding-right: $spacing / 2;
    }
    // background: getColor(gray, 90);

    h2 {
      margin: $spacing * 1.5 0 $spacing / 4;
    }
  }
  .dotted {
    // font-family: $font-serif;
    // font-weight: $font-weight-bold;

    // background: repeating-linear-gradient(to left, transparent 0em, transparent 0.4em, $color-white 0.4em, $color-white 0.6em),
    // linear-gradient(to top, transparent 0.075em, $color-neon 0.075em, $color-neon 0.2em, transparent 0.2em);

    // &:hover {
    //   color: $color-neon;
    // }
    // background: getColor(neon, 100);

    background: linear-gradient(to top, transparent 0.0em, getColor(neon, 100) 0.0em, getColor(neon, 100) 0.33em, transparent 0.33em);
    transition: background $transition, color $transition;

    &:hover {
      background: linear-gradient(to top, transparent 0.0em, getColor(neon, 50) 0.0em, getColor(neon, 50) 0.33em, transparent 0.33em);
    }
    // border-radius: $border-radius;
    // padding: 0 $spacing / 16;
  }
  ul {
    .dotted {
      background: linear-gradient(to top, transparent 0.0em, getColor(neon, 80) 0.0em, getColor(neon, 80) 0.33em, transparent 0.33em);
    }
  }
  p {
    .no-break {
      white-space: nowrap;
    }
    + p {
      margin-top: $spacing / 2;
    }

    a {
      background: none;
    }

    .glyph {
      color: $color-neon;
      display: inline-block;
      transform: scale(1.6);
    }
  }

  .keyword {
    @include tint(color, 40);
    font-family: $font-sans;
    &.no {
      hyphens: none;
    }
  }
}
.tippy-box {
  background-color: getColor(neon, 40);
  color: $color-white;
  font-size: 0.8em;
  border-radius: $spacing / 4;
  text-align: center;
  padding: $spacing / 4;
  .tippy-arrow {
    color: getColor(neon, 40);
  }
}
</style>

<style lang="scss" scoped>
@import "library/src/style/global.scss";
#app {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .senses-meta {
    margin: $spacing $spacing / 2 $spacing;
  }
}
</style>
