<script setup lang="ts">
import { useWindowScroll, useWindowSize } from '@vueuse/core'

const { height } = useWindowSize()
const { y } = useWindowScroll({
  behavior: 'smooth',
})
</script>
<template>
  <div class="fixed left-50% bottom-8 opacity-0 animate-bounce-in animate-delay-3s animate-forwards"  v-show="y < height / 2">
    <button aria-label="scroll indicator button" class="flex flex-col items-center  animate animate-pulse-alt hover:text-primary-400 transition-all ease-in-out" @click="y += height">
      <i class="i-bi-mouse text-2xl mb-1"></i>
      <i class="i-carbon-arrow-down text-lg"></i>
    </button>
  </div>
</template>