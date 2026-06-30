<script setup lang="ts">
import { Environment, MeshTransmissionMaterial, OrbitControls } from '@tresjs/cientos'
import type { Mesh } from 'three'

// Demo for the June 2026 recap: a glass torus knot using cientos'
// MeshTransmissionMaterial, refracting the colored shapes behind it.
const knotRef = ref<Mesh>()

function onRender() {
  if (knotRef.value) {
    knotRef.value.rotation.y += 0.005
  }
}
</script>

<template>
  <TresCanvas :clear-color="'#1a1a2e'" @render="onRender">
    <TresPerspectiveCamera :position="[0, 0, 7]" :look-at="[0, 0, 0]" />
    <OrbitControls :auto-rotate="true" :auto-rotate-speed="0.5" :enable-zoom="false" />

    <TresAmbientLight :intensity="0.6" />
    <TresDirectionalLight :position="[5, 5, 5]" :intensity="1.5" />

    <!-- Colored shapes behind the glass, to show off the refraction -->
    <TresMesh :position="[-1.6, 0.8, -2]">
      <TresIcosahedronGeometry :args="[0.7, 0]" />
      <TresMeshStandardMaterial color="#ff5d8f" />
    </TresMesh>
    <TresMesh :position="[1.7, -0.6, -2.2]">
      <TresBoxGeometry :args="[1, 1, 1]" />
      <TresMeshStandardMaterial color="#4cc9f0" />
    </TresMesh>
    <TresMesh :position="[0.2, -1.4, -1.8]">
      <TresSphereGeometry :args="[0.6, 32, 32]" />
      <TresMeshStandardMaterial color="#ffd166" />
    </TresMesh>

    <!-- The glass piece -->
    <TresMesh ref="knotRef">
      <TresTorusKnotGeometry :args="[1, 0.32, 200, 32]" />
      <MeshTransmissionMaterial
        :thickness="0.6"
        :roughness="0"
        :transmission="1"
        :ior="1.5"
        :chromatic-aberration="0.06"
        :anisotropic-blur="0.1"
        :distortion="0.2"
        :distortion-scale="0.4"
      />
    </TresMesh>

    <Environment preset="city" :environment-intensity="1" />
  </TresCanvas>
</template>
