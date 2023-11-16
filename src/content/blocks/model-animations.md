```vue
<script setup>
import { TresCanvas } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'
import UgglyBunny from '/@/components'
</script>
<template>  
  <TresCanvas clear-color=”#82DBC5”>
    <TresPerspectiveCamera />
    <OrbitControls />
    <Suspense>
      <UgglyBuny />
    </Suspense>  
  </TresCanvas>
</template>
```