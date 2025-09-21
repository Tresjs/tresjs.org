<script setup lang="ts">
import type { Mesh } from 'three';

const props = defineProps<{
  scene: string
}>()

const { onBeforeRender } = useLoop()

onBeforeRender(({ elapsed }) => {
  if (props.scene === 'dx-focused' && dxCamera.value) {
    // Calculate initial angle from initial position [2,1,3]
    const initialAngle = Math.atan2(3, 2) // Initial angle from initial z,x position
    
    // Create oscillation between -30 and +30 degrees
    const oscillation = Math.sin(elapsed * 0.5) * (Math.PI / 6) // ±30 degrees in radians
    const angle = initialAngle + oscillation
    
    const radius = Math.sqrt(2*2 + 3*3) // Distance from origin to initial position
    
    // Calculate new camera position
    const x = Math.cos(angle) * radius
    const z = Math.sin(angle) * radius
    
    // Update camera position
    dxCamera.value.position.set(x, 1, z)
    dxCamera.value.lookAt(0, 1, 0)
  }
})

const dxCamera = ref<Mesh>()

</script>
<template>
  <TresPerspectiveCamera 
    v-if="scene === 'declarative'"
    :position="[5.5,5.5,5.5]"
    :look-at="[0, 1, 0]" 
  />
  <TresPerspectiveCamera 
    v-else-if="scene === 'dx-focused'" 
    ref="dxCamera" 
    :position="[2,1,3]" 
    :look-at="[0, 1, 0]" 
  />
</template>