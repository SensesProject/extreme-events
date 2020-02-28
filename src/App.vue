<template>
  <div id="app">
    <SensesMenu message="Work in Progress"/>
    <article>
      <router-view/>
    </article>
    <SensesMeta class="senses-meta" id="extreme-events"/>
  </div>
</template>
<script>
import SensesMenu from 'library/src/components/SensesMenu.vue'
import SensesMeta from 'library/src/components/SensesMeta.vue'
export default {
  components: {
    SensesMenu,
    SensesMeta
  }
}
</script>

<style lang="scss">
@import "library/src/style/base.scss";
.text {
  pointer-events: none;
}
</style>

<style lang="scss" scoped>
@import "library/src/style/global.scss";
#app {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  article {
    width: 100vw;
    max-width: calc(768px + #{$spacing});
    padding: 0 $spacing / 2 0;
    // background: getColor(gray, 90);
  }
  .senses-meta {
    margin: $spacing $spacing / 2 $spacing;
  }
}
</style>
