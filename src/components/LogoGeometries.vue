<script setup lang="ts">
import { useGLTF, Levioso } from '@tresjs/cientos';
import { toRefs, watch } from 'vue';

const props = defineProps<{
  progress?: number
}>()
const { nodes } = await useGLTF('/tres.glb', { draco: true })

const triangle = nodes['Triangle']
const cube = nodes['Cube']
const sphere = nodes['Sphere']

triangle.position.set(-4, 4, 0)
cube.position.set(0, 2, 0)
sphere.position.set(4, 0, 0)

const leviosoRange = [-0.005, 0.005] as [number, number]

const { progress } = toRefs(props)

watch(progress, (value) => {
  cube.rotation.x = value * 100
  cube.rotation.y = value * 20
  cube.position.x = - value * 120
  cube.position.z = value * 140

  triangle.rotation.x = - value * 100
  triangle.rotation.y = value * 20
  triangle.position.x = -4  -value * 50
  triangle.position.z = - value * 150
  triangle.position.y = 4 + value * 200

  sphere.position.x = 4 + value * 1200
  sphere.position.z = - value * 750
  sphere.position.y = - value * 50

})

</script>

<template>
  <Levioso :speed="progress > 0.1 ? 0: 1" :range="leviosoRange">
    <primitive :object="triangle" />
  </Levioso>
  <Levioso :speed="progress > 0.1 ? 0: 1" :range="leviosoRange">
    <primitive :object="cube" />
  </Levioso>
  <Levioso :speed="progress > 0.1 ? 0: 1" :range="leviosoRange">
    <primitive :object="sphere" />
  </Levioso>
</template>