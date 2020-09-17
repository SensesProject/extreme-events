<template>
  <div class="uncertainty max-width">
    <section class="wide cat-intro">
      <h2 class="serif">Uncertainty</h2>
      <p>
        Extents and impacts of extreme events depend on underlying meteorological, hydrological, and climatological events. But also on human factors such as land use, water and agricultural management, and population density.
      </p>
      <p>
        The data shown base on calculations from climate and climate impact models. It's crucial to comprehend what constitutes exposure since different definitions likely lead to vastly different outcomes. For that reason, we show the share of land and population exposed and the change in exposure compared to preindustrial levels.
      </p>
    </section>
  </div>
</template>

<script>
export default {
  name: 'uncertainty',
  components: {},
  data () {
    return {}
  },
  computed: {
  }
}
</script>
<style lang="scss" scoped>
@import "library/src/style/global.scss";
.uncertainty {
  h2 {
    margin: $spacing 0 $spacing / 2;
  }

  section + section {
    margin-top: $spacing;
  }

  .chart {
    height: 600px;
    max-height: 100vh;
    width: 50%;
  }
}
</style>
