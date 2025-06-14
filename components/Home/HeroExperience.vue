<script setup>
import { OrbitControls } from '@tresjs/cientos'
</script>
<template>
<TresPerspectiveCamera :position="[0, 0, 22]" :fov="45" :near="0.1" :far="1000" :look-at="[0, 5, 0]" />
  <OrbitControls />
  <TresAmbientLight :intensity="1" />
  <HomeImagotype />
  <HomeBrownianDistributionGroup />
  <TresDirectionalLight :position="[0, 8, 4]" :intensity="0.7" cast-shadow />
  <TresDirectionalLight :position="[0, 2, 4]" :intensity="1" cast-shadow />
</template>