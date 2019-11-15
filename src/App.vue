<template>
  <div id="app">
    <SensesMenu/>
    <article>
      <router-view/>
    </article>
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
  </div>
</template>
<script>
import SensesMenu from 'library/src/components/SensesMenu.vue'
export default {
  components: {
    SensesMenu
  }
}
</script>

<style lang="scss">
@import "library/src/style/base.scss";
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
    padding: $spacing $spacing / 2;
    // background: getColor(gray, 90);
  }
}
</style>
