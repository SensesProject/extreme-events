<template>
  <div class="intro">
    <section class="wide">

      <!-- <p>
        The extent and impact of crop failures, river floods, tropical cyclones, heatwaves, wildfires, and droughts depend on the underlying meteorological, hydrological, or climatological events as well as on human factors such as land use, water and agricultural management, and population density. Historical variations in these human factors impede the detection of climate change signals in observational records of hazards and exposure.
      </p>
      <p>
        In this module you'll learn how climate change contributes to extreme events and who is most affected by those.
      </p> -->
    </section>
    <LayoutScrollytelling>
      <template v-slot:vis="{ width, height, step }">
        <VisExtremeEvents :width="width" :height="height" :step="step"/>
      </template>
      <template v-slot:text="{ width, height, step }">
        <section class="observers">
          <!-- <IntersectionObserverFracture class="io-0" :step="0" no-styling :style="{height: `${height}px`}">
            <span class="tiny">{{ step }}</span>
          </IntersectionObserverFracture> -->
          <IntersectionObserver class="io-0" :step="0" align="left" :class="{active: step === 0}">
            <p class="tiny">With <span class="highlight no-hover blue">no global warming</span> both land and population remain mostly unaffected by extreme events.</p>
          </IntersectionObserver>
          <IntersectionObserver class="io-1" :step="1" align="right" :class="{active: step === 1}">
            <p class="tiny"><span class="highlight no-hover yellow">Today</span> at a global warming level of <span class="highlight no-hover yellow">+1°C</span> the world population is 2.7 times more exposed and land is 2.5 times more affected.</p>
          </IntersectionObserver>
          <IntersectionObserver class="io-2" :step="2" align="left" :class="{active: step === 2}">
            <p class="tiny">This trend continues. At <span class="highlight no-hover orange">+1.5°C</span> 6% of the global land area will be affected by extreme events.</p>
          </IntersectionObserver>
          <IntersectionObserver class="io-3" :step="3" align="right" :class="{active: step === 3}">
            <p class="tiny">And at <span class="highlight no-hover red">+2°C</span> 14% of the todays population – about 1 billion people – would be exposed.</p>
          </IntersectionObserver>
          <IntersectionObserver class="io-4" :step="4" align="left">
            <span/>
          </IntersectionObserver>
        </section>
      </template>
    </LayoutScrollytelling>
    <section class="wide">
      <p>
        The extent and impact of crop failures, river floods, tropical cyclones, heatwaves, wildfires, and droughts depend on the underlying meteorological, hydrological, or climatological events as well as on human factors such as land use, water and agricultural management, and population density. Historical variations in these human factors impede the detection of climate change signals in observational records of hazards and exposure.
      </p>
      <p>
        In this module you'll learn how climate change contributes to extreme events and who is most affected by those.
      </p>
    </section>
    <!-- <SensesMeta id="extreme-events"/> -->
  </div>
</template>

<script>
// import SensesMeta from 'library/src/components/SensesMeta.vue'
import LayoutScrollytelling from 'library/src/components/LayoutScrollytelling.vue'
import IntersectionObserver from 'library/src/components/IntersectionObserver.vue'
// import IntersectionObserverFracture from 'library/src/components/IntersectionObserverFracture.vue'
import VisExtremeEvents from '@/components/VisExtremeEvents.vue'
export default {
  name: 'intro',
  components: {
    LayoutScrollytelling,
    IntersectionObserver,
    // IntersectionObserverFracture,
    VisExtremeEvents
    // SensesMeta
  }
}
</script>
<style lang="scss" scoped>
@import "library/src/style/global.scss";
.intro {
  display: flex;
  align-items: center;
  flex-direction: column;
  section {
    h1 {
      margin-bottom: $spacing / 2;
    }

    + section {
      margin-top: $spacing;
    }

    p + p {
      margin-top: $spacing / 2;
    }
  }
  .layout-scrollytelling {
    width: 100vw;
    max-width: calc(768px + #{$spacing});
  }
  .observers {
    margin-top: $spacing * 2;
    .intersection-observer {
      padding: 0;
      opacity: 0;
      pointer-events: none;
      transition: opacity $transition;
      // height: 50vh;
      margin: 0 $spacing / 2;

      &.active {
        opacity: 1;
        pointer-events: all;
      }

      &.io-0 {
        margin-top: 50vh;
        padding-top: 20vh;
      }

      &.io-1 {
        padding-top: 20vh;
      }

      &.io-2 {
        padding-top: 10vh;
        padding-bottom: 10vh;
      }

      &.io-3 {
        padding-top: 25vh;
        // margin-bottom: -5vh;
      }

      &.io-4 {
        height: 50vh;
        // margin-bottom: 50vh;
      }

      > div {
        width: 50%;
      }

      p {
        width: 300px;
        // max-width: calc(50vw - #{$spacing * 2.5});
        // width: 50%;
        position: relative;
      }
    }
  }
}
</style>
