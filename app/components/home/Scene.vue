<script setup lang="ts">
import type { Mesh } from 'three';

defineProps<{
  scene: string
}>()

const boxRef = ref<Mesh>()

function onRender() {
  if (boxRef.value) {
    boxRef.value.rotation.y +=  0.01
    boxRef.value.rotation.x +=  0.01
  }
}
</script>
<template>
<TresCanvas :clear-alpha="0" :antialias="false" alpha @render="onRender">
  <HomeCameraController :scene="scene" />

  <TresAmbientLight :intensity="1" />
  <TresDirectionalLight :position="[5, 10, 5]" :intensity="2" />
  <TresDirectionalLight :position="[-5, 5, 0]" :intensity="1.2" color="blue"  />
  <TresMesh v-if="scene === 'declarative'" ref="boxRef" :position="[0, 3, 0]">
    <TresBoxGeometry :args="[2,2,2]" />
    <TresMeshNormalMaterial />
  </TresMesh>
  <HomeArtificerCharacter v-if="scene === 'dx-focused'" />
  <ContactShadows  :opacity="0.5" :scale="10" :blur="2" :far="10" />
</TresCanvas>   
</template>