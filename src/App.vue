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

import SensesMeta from 'library/src/components/SensesMeta.vue'
export default {
  components: {
    SensesMenu,
    Distribution,
    Categories,
    Maps,
    Conclusion,
    SensesMeta
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
      margin: $spacing * 1.5 0 $spacing / 2;
    }
  }
  p {
    .no-break {
      white-space: nowrap;
    }
    + p {
      margin-top: $spacing / 2;
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
