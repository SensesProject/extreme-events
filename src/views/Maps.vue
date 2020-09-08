<template>
  <div class="maps">
    <LayoutScrollytelling>
      <template v-slot:vis="{ width, height, step }">
        <EarthWrapper :width="width" :height="height" :step="step"/>
      </template>
      <template v-slot:text="{ width, height, step }">
        <div class="observers wide">
          <IntersectionObserver class="title" :step="0" align="center" :class="{active: step < 1}">
            <h1 class="serif">Extreme Events</h1>
            <p class="serif">
              Climate change makes extreme events more frequent and more intense. This will increase fatalities, displacement, poverty and economic damage.
            </p>
          </IntersectionObserver>
          <IntersectionObserverFracture class="io-0" :step="0" align="center" :class="{active: step < 1}">
            <p class="serif">
              At +2°C global warming about 6.8% of the global land area is exposed to <span class="highlight no-hover yellow">heatwaves</span> at least once a year – a 20-fold increase compared to pre-industrial temperature levels.
            </p>
          </IntersectionObserverFracture>
          <IntersectionObserverFracture class="io-1" :step="1" align="center" :class="{active: step >= 1  && step < 2}">
            <p class="serif">
              For <span class="highlight no-hover neon">Tropical cyclones</span> which mostly affect island states in the indian and pacific ocean, the increase in exposed land is far lower. But impacts are likely to be more severe due to highly populated coastal regions.
            </p>
          </IntersectionObserverFracture>
          <IntersectionObserverFracture class="io-2" :step="2" align="center" :class="{active: step >= 2}">
            <p class="serif">
              The Region of Pakistan, northern India and Nepal shows the highest exposure to <span class="highlight no-hover orange">Crop failure</span>. Given that thses events are confined to agricultural land, the exposure is also largely dependent on human factors.
            </p>
          </IntersectionObserverFracture>
          <!-- <IntersectionObserverFracture class="io-3" :step="3" align="center" :class="{active: step === 3}"/> -->
        </div>
      </template>
    </LayoutScrollytelling>
  </div>
</template>

<script>
import EarthWrapper from '@/components/EarthWrapper.vue'
import LayoutScrollytelling from 'library/src/components/LayoutScrollytelling.vue'
import IntersectionObserver from 'library/src/components/IntersectionObserver.vue'
import IntersectionObserverFracture from 'library/src/components/IntersectionObserverFracture.vue'
export default {
  name: 'maps',
  components: {
    EarthWrapper,
    LayoutScrollytelling,
    IntersectionObserverFracture,
    IntersectionObserver
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
  // padding: $spacing 0;
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
    padding: 25vh 0;
    text-align: center;

    opacity: 0.5;
    transition: opacity $transition;
    &.active {
      opacity: 1;
    }

    &.title {
      padding: $spacing * 2 0 0;
      min-height: 50vh;

      h1 {
        margin: $spacing / 2 0;
      }
    }

    &.io-0 {
      ::v-deep {
        > div {
          max-width: 640px;
        }
      }
    }

    &.io-2 {
      padding-bottom: 60vh;
    }

    ::v-deep {
      > div {
        background: none;
        -webkit-backdrop-filter: none;
        backdrop-filter: none;
        width: 100%;
        max-width: 640px;
      }
    }
  }
}
</style>
