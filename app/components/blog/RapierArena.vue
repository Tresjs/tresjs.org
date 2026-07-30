<script setup lang="ts">
import { RigidBody } from '@tresjs/rapier'

// Fixed floor + four walls, so bodies stay inside the embed's viewport instead
// of rolling off into the void. Shared by the rapier blog demos.
const { size = 12, height = 4 } = defineProps<{ size?: number, height?: number }>()

const half = computed(() => size / 2)
</script>

<template>
  <RigidBody type="fixed" :restitution="0.4">
    <TresMesh :rotation="[-Math.PI / 2, 0, 0]" :receive-shadow="true">
      <TresPlaneGeometry :args="[size, size]" />
      <TresMeshStandardMaterial color="#f4f4f4" />
    </TresMesh>
  </RigidBody>

  <RigidBody type="fixed" :restitution="0.4" :position="[0, height / 2, -half]">
    <TresMesh>
      <TresPlaneGeometry :args="[size, height]" />
      <TresMeshStandardMaterial color="#e8e8e8" :transparent="true" :opacity="0.35" />
    </TresMesh>
  </RigidBody>

  <RigidBody type="fixed" :restitution="0.4" :position="[0, height / 2, half]" :rotation="[0, Math.PI, 0]">
    <TresMesh>
      <TresPlaneGeometry :args="[size, height]" />
      <TresMeshStandardMaterial color="#e8e8e8" :transparent="true" :opacity="0.35" />
    </TresMesh>
  </RigidBody>

  <RigidBody type="fixed" :restitution="0.4" :position="[-half, height / 2, 0]" :rotation="[0, Math.PI / 2, 0]">
    <TresMesh>
      <TresPlaneGeometry :args="[size, height]" />
      <TresMeshStandardMaterial color="#e8e8e8" :transparent="true" :opacity="0.35" />
    </TresMesh>
  </RigidBody>

  <RigidBody type="fixed" :restitution="0.4" :position="[half, height / 2, 0]" :rotation="[0, -Math.PI / 2, 0]">
    <TresMesh>
      <TresPlaneGeometry :args="[size, height]" />
      <TresMeshStandardMaterial color="#e8e8e8" :transparent="true" :opacity="0.35" />
    </TresMesh>
  </RigidBody>
</template>
