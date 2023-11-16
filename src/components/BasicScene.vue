<script setup>
import { TresCanvas } from '@tresjs/core'
</script>
<template>
  <div class="w-full h-full">
    <TresCanvas clear-color="#82DBC5">
      <TresPerspectiveCamera />
      <TresMesh >
        <TresBoxGeometry :args="[1, 1, 1]" />
        <TresMeshNormalMaterial />
      </TresMesh>
    </TresCanvas>
  </div>
</template>