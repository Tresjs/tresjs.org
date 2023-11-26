<script setup lang="ts">
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import { TresCanvas } from '@tresjs/core'
import { EffectComposer, Noise, DepthOfField } from '@tresjs/post-processing'
import { BasicShadowMap, SRGBColorSpace, NoToneMapping } from 'three'
import LogoGeometries from './LogoGeometries.vue';
import ScrollCtrls from './ScrollCtrls.vue'

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
  if(gridHelperRef.value) {
    gridHelperRef.value.position.y = value * 100
  }
})

watch(gridHelperRef, (value) => {
  if(value) {
    value.position.y = scrollProgress.value * 100
  }
})
const breakpoints = useBreakpoints(breakpointsTailwind)

const smAndLarger = breakpoints.greaterOrEqual('sm') // sm and larger
const cameraPosition = ref(smAndLarger.value ?[-10,5,20]: [-10,5,30])
const cameraLookAt = ref(smAndLarger.value ?[-7,0,0]: [0, -6,0])

</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="cameraPosition" :look-at="cameraLookAt" />
    <TresGridHelper ref="gridHelperRef" />
    <ScrollCtrls
      ref="scRef"
      v-model="scrollProgress"
      :distance="10"
      :smooth-scroll="0.1"
      html-scroll
    >
      <Suspense>
        <LogoGeometries :progress="scrollProgress" />
      </Suspense>
    </ScrollCtrls>
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

