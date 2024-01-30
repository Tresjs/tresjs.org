<script setup lang="ts">
defineProps<{
  text?: string
}>()
</script>
<template>
<span class="inline-block rounded-full px-3 py-0 line-height-[22px] text-[14px] bg-yellow-200 -translate-y-0.5">
  <slot>{{ text }}</slot>
</span>
</template>