<script setup>
import { VueLenis } from 'lenis/vue'

const lenisOptions = {
  autoRaf: true,
  smoothWheel: true,
  syncTouch: true,
}

const lenisRef = ref()

// watchEffect((onInvalidate) => {
//   if (!lenisRef.value?.lenis)
//     return

//   const lenis = lenisRef.value.lenis
// })

onUnmounted(() => {
  lenisRef?.value?.destroy()
})
</script>

<template>
  <VueLenis ref="lenisRef" root :options="lenisOptions" />
</template>
