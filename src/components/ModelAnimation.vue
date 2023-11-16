<script setup>
import { TresCanvas } from '@tresjs/core'
import { BasicShadowMap, SRGBColorSpace, NoToneMapping } from 'three'

import UgglyBunny from './UgglyBunny.vue';

const gl = {
  clearColor: '#F78B3D',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}
</script>
<template>
  <div class="w-full h-full">
    <TresCanvas v-bind="gl">
      <TresPerspectiveCamera
      :position="[2, 2, 5]"
      :look-at="[0, 1, 0]"
    />
      <Suspense>
        <UgglyBunny />
      </Suspense>
      <TresDirectionalLight
        color="#F78B3D"
        :position="[3, 3, 3]"
        :intensity="1"
      />
      <TresAmbientLight :intensity="2" />

    </TresCanvas>
  </div>
</template>