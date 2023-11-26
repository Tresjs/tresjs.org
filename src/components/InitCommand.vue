<script setup lang="ts">
import { useClipboard } from '@vueuse/core'

const source = ref('npm install @tresjs/core three')
const { copy, copied } = useClipboard({ source })

</script>
<template>
   <code class="important-bg-dark flex justify-between items-center rounded p-4 text-sm text-gray-500 important-text-light opacity-0 animate-fade-in animate-delay-1.5s animate-forwards">
    npm install @tresjs/core three 
    <i @click="copy(source)" 
      class="ml-2 text-gray-600 hover:text-gray-400 cursor-pointer" 
      :class="copied ? 'i-carbon-checkmark' : 'i-carbon-copy'">
    </i>
  </code>
</template>