<script setup>
import { TresCanvas, useRenderLoop } from '@tresjs/core'

const { onLoop } = useRenderLoop()
const boxRef = ref()

onLoop(({delta}) => {
 
  if (boxRef.value) {
    boxRef.value.rotation.x += delta
    boxRef.value.rotation.y += delta
  }
})

</script>
<template>
  <div class="w-full h-full">
    <TresCanvas clear-color="#82DBC5">
      <TresPerspectiveCamera />
      <TresMesh ref="boxRef">
        <TresBoxGeometry :args="[1, 1, 1]" />
        <TresMeshNormalMaterial />
      </TresMesh>
    </TresCanvas>
  </div>
</template>