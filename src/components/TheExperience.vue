<script setup lang="ts">
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

import { TresCanvas } from '@tresjs/core'
import { BasicShadowMap, SRGBColorSpace, NoToneMapping } from 'three'
import { ScrollControls } from '@tresjs/cientos'
import { EffectComposer, Noise, DepthOfField } from '@tresjs/post-processing'
import LogoGeometries from './LogoGeometries.vue';

const gl = {
  windowSize: true,
  shadows: true,
  alpha: true,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

const scrollProgress = ref(0)

const gridHelperRef = ref(null)

watch(scrollProgress, (value) => {
  if(gridHelperRef) {
    gridHelperRef.value.position.y = value * 100
  }
})
const breakpoints = useBreakpoints(breakpointsTailwind)

const smAndLarger = breakpoints.greaterOrEqual('sm') // sm and larger
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="smAndLarger ? [-10,5,20] : [-10,5,30]" :look-at="smAndLarger ? [-7,0,0] : [0,-6,0]" />
    <TresGridHelper ref="gridHelperRef" />
    <ScrollControls
      ref="scRef"
      v-model="scrollProgress"
      :distance="10"
      :smooth-scroll="0.1"
      html-scroll
    >
    <Suspense>
      <LogoGeometries :progress="scrollProgress" />
    </Suspense>
    </ScrollControls>
 

    <TresAmbientLight :intensity="2" />
    <TresDirectionalLight :intensity="1" :position="[10,5,5]"/>
    <Suspense>
      <EffectComposer>
        <Noise
          premultiply
        />
        <DepthOfField 
          :focus-distance="1"
          :world-focus-distance="2"
          :world-focus-range="1"
          :bokeh-scale="Math.pow(scrollProgress * 20, 4)"
          :focus-range="0.8"
        />
      </EffectComposer>
    </Suspense>
  </TresCanvas>

</template>

