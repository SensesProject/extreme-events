<template>
  <div id="app">
    <SensesMenu message="Work in Progress"/>
    <article>
      <Intro/>
      <Categories/>
      <Maps/>
      <Countries/>
    </article>
    <SensesMeta class="senses-meta" id="extreme-events"/>
  </div>
</template>
<script>
import SensesMenu from 'library/src/components/SensesMenu.vue'
import Intro from '@/views/Intro.vue'
import Categories from '@/views/Categories.vue'
import Countries from '@/views/Countries.vue'
import Maps from '@/views/Maps.vue'

import SensesMeta from 'library/src/components/SensesMeta.vue'
export default {
  components: {
    SensesMenu,
    Intro,
    Categories,
    Maps,
    Countries,
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
  }
  p {
    .no-break {
      white-space: nowrap;
    }
    + p {
      margin-top: $spacing / 2;
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
