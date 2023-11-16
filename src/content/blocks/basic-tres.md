```vue
<script setup>
import { TresCanvas } from '@tresjs/core'
</script>
<template>
  <TresCanvas clear-color=”#82DBC5” window-size>
    <TresPerspectiveCamera />
    <TresMesh 
      @click=”onClick”
     >
      <TresBoxGeometry :args="[1, 1, 1]" />
      <TresMeshNormalMaterial />
    </TresMesh>
  </TresCanvas>
</template>
```