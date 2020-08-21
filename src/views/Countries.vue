<template>
  <div class="countries max-width">
    <section class="wide cat-intro">
      <h2 class="serif">Countries</h2>
      <p>
        Extents and impacts of extreme events depend on underlying meteorological, hydrological, and climatological events. But also on human factors such as land use, water and agricultural management, and population density.
      </p>
      <p>
        The data shown base on calculations from climate and climate impact models. It's crucial to comprehend what constitutes exposure since different definitions likely lead to vastly different outcomes. For that reason, we show the share of land and population exposed and the change in exposure compared to preindustrial levels.
      </p>
    </section>
    <section class="chart">
      <ChartParallel/>
    </section>
  </div>
</template>

<script>
import ChartParallel from '@/components/ChartParallel.vue'
import raw from '@/assets/data/countries.json'
export default {
  name: 'countries',
  components: { ChartParallel },
  data () {
    return {
      indicators: ['wildfire', 'tropical-cyclone', 'crop-failure', 'river-flood', 'drought', 'heatwave']
    }
  },
  computed: {
    categories () {
      const { indicators } = this
      return indicators.map(i => {
        return {
          height: 360,
          data: raw.world[i],
          region: null,
          indicator: i.replace(/-/g, ' ')
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import "library/src/style/global.scss";
.countries {
  h2 {
    margin: $spacing 0 $spacing / 2;
  }

  section + section {
    margin-top: $spacing;
  }

  .chart {
    height: 600px;
    max-height: 100vh;
  }
}
</style>
