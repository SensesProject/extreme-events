<template>
  <div class="maps">
    <div>
    <section class="max-width wide map-intro">
      <h2 class="serif">Regional Differences</h2>
      <p>
        Extents and impacts of extreme events depend on underlying meteorological, hydrological, and climatological events. But also on human factors such as land use, water and agricultural management, and population density.
      </p>
      <p>
        The data shown base on calculations from climate and climate impact models. It's crucial to comprehend what constitutes exposure since different definitions likely lead to vastly different outcomes. For that reason, we show the share of land and population exposed and the change in exposure compared to preindustrial levels.
      </p>
    </section>
    <LayoutScrollytelling>
      <template v-slot:vis="{ width, height, step }">
        <EarthWrapper :width="width" :height="height" :step="step"/>
      </template>
      <template v-slot:text="{ width, height, step }">
        <div class="observers">
          <IntersectionObserverFracture class="io-0" :step="0" align="center" :class="{active: step === 0}">
            <p class="serif">As discussed earlier, at <span class="highlight no-hover red">+2°C,</span> heatwaves affect a substential part of global land area.</p>
          </IntersectionObserverFracture>
          <IntersectionObserverFracture class="io-1" :step="1" align="center" :class="{active: step === 1}">
            <p class="serif">While drought affects less land overall, events are even more spread.</p>
          </IntersectionObserverFracture>
          <IntersectionObserverFracture class="io-2" :step="2" align="center" :class="{active: step === 2}">
            <p class="serif">Other events are much more confined. Tropical cyclones mostly affect pacific coastal regions.</p>
          </IntersectionObserverFracture>
          <IntersectionObserverFracture class="io-3" :step="3" align="center" :class="{active: step === 3}">
            <p class="serif">And crop failure concentrates in North-India and Pakistan.</p>
          </IntersectionObserverFracture>
          <!-- <IntersectionObserverFracture class="io-3" :step="3" align="center" :class="{active: step === 3}"/> -->
        </div>
      </template>
    </LayoutScrollytelling>
    </div>
  </div>
</template>

<script>
import EarthWrapper from '@/components/EarthWrapper.vue'
import LayoutScrollytelling from 'library/src/components/LayoutScrollytelling.vue'
import IntersectionObserverFracture from 'library/src/components/IntersectionObserverFracture.vue'
export default {
  name: 'maps',
  components: {
    EarthWrapper,
    LayoutScrollytelling,
    IntersectionObserverFracture
  },
  data () {
    return {
      indicators: ['crop-failure', 'river-flood', 'tropical-cyclone', 'wildfire', 'drought', 'heatwave']
    }
  },
  computed: {
  }
}
</script>
<style lang="scss" scoped>
@import "library/src/style/global.scss";
.maps {
  margin-top: $spacing;
  padding: $spacing 0;
  background: getColor(gray, 90);
  // padding: $spacing/2  0;
  h2 {
    margin: 0 0 $spacing / 2;
  }

  .map-intro {
    margin-top: $spacing;
  }
  section + section {
    margin-top: $spacing;
  }

  .intersection-observer {
    padding: 50vh 0 20vh;

    &.io-3 {
      padding-bottom: 60vh;
    }

    ::v-deep {
      > div {
        background: none;
      }
    }
  }
}
</style>
