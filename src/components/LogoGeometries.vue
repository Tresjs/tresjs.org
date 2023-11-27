<script setup lang="ts">
import { useRenderLoop } from '@tresjs/core';
import { useGLTF, Levioso } from '@tresjs/cientos';
import { toRefs, watch } from 'vue';
import { gsap } from 'gsap'

const props = defineProps<{
  progress?: number
}>()
const { nodes } = await useGLTF('/tres.glb', { draco: true })

const triangle = nodes['Triangle']
const cube = nodes['Cube']
const sphere = nodes['Sphere']

triangle.position.set(-4, 4, 0)
triangle.scale.set(0, 0, 0)
cube.position.set(0, 2, 0)
cube.scale.set(0, 0, 0)
sphere.position.set(4, 0, 0)
sphere.scale.set(0, 0, 0)

const leviosoRange = [-0.005, 0.005] as [number, number]

const { progress } = toRefs(props)

watch(progress, (value) => {
  cube.rotation.x = value * 100
  cube.rotation.y = value * 20

  triangle.rotation.x = - value * 100
  triangle.rotation.y = value * 20
}, {
  immediate: true
})

onMounted(() => {
  gsap.to(triangle.scale, {
    delay: 0.5,
    duration: 1, // Duration of the animation in seconds
    x: 1,
    y: 1,
    z: 1,
    ease: 'elastic.out', // Easing function for smoother animation
  })
  gsap.to(cube.scale, {
    delay: 0.75,
    duration: 1, // Duration of the animation in seconds
    x: 1,
    y: 1,
    z: 1,
    ease: 'elastic.out', // Easing function for smoother animation
  })
  gsap.to(sphere.scale, {
    delay: 1,
    duration: 1, // Duration of the animation in seconds
    x: 1,
    y: 1,
    z: 1,
    ease: 'elastic.out', // Easing function for smoother animation
  })
})

const smoothFactor = 0.15
const { onLoop } = useRenderLoop()

onLoop(() => {
  cube.position.x += (- progress?.value * 120 - cube.position.x) * smoothFactor
  cube.position.z += (progress?.value * 140 - cube.position.z) * smoothFactor

  sphere.position.x += (4 + progress?.value * 1200 - sphere.position.x) * smoothFactor
  sphere.position.z += (- progress?.value * 750 - sphere.position.z) * smoothFactor
  sphere.position.y += (- progress?.value * 50 - sphere.position.y) * smoothFactor

  triangle.position.x += (-4 - progress?.value * 50 - triangle.position.x) * smoothFactor
  triangle.position.z += (- progress?.value * 150 - triangle.position.z) * smoothFactor
  triangle.position.y += (4 + progress?.value * 200 - triangle.position.y) * smoothFactor

})
</script>

<template>
  <Levioso :speed="progress > 0 ? 0 : 1" :range="leviosoRange">
    <primitive :object="triangle" />
  </Levioso>
  <Levioso :speed="progress > 0 ? 0 : 1" :range="leviosoRange">
    <primitive :object="cube" />
  </Levioso>
  <Levioso :speed="progress > 0 ? 0 : 1" :range="leviosoRange">
    <primitive :object="sphere" />
  </Levioso>
</template>