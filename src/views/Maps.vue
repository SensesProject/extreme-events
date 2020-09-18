<template>
  <div class="maps">
    <LayoutScrollytelling>
      <template v-slot:vis="{ width, height, step }">
        <EarthWrapper :width="width" :height="height" :step="step"/>
      </template>
      <template v-slot:text="{ step }">
        <div class="observers wide serif">
          <IntersectionObserver class="title" :step="0" align="center" :class="{active: step < 1}">
            <div v-html="getText('intro')[0]"/>
          </IntersectionObserver>
          <IntersectionObserverFracture class="io-0" :step="0" align="center" :class="{active: step < 1}">
            <div v-html="getText('intro')[1]"/>
          </IntersectionObserverFracture>
          <IntersectionObserverFracture class="io-1" :step="1" align="center" :class="{active: step >= 1  && step < 2}">
            <div v-html="getText('intro')[2]"/>
          </IntersectionObserverFracture>
          <IntersectionObserverFracture class="io-2" :step="2" align="center" :class="{active: step >= 2}">
            <div v-html="getText('intro')[3]"/>
          </IntersectionObserverFracture>
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
import { mapGetters } from 'vuex'
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
    ...mapGetters(['getText'])
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

  ::v-deep .intersection-observer {
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

    // ::v-deep {
    > div {
      background: none;
      -webkit-backdrop-filter: none;
      backdrop-filter: none;
      width: 100%;
      max-width: 640px;
    }
    // }
  }
}
</style>
