<script setup lang="ts">
// Embeds a live experiment from lab.tresjs.org inside MDC blog content.
// Uses the same 16:9 framed container as EmbedScene, but renders an iframe
// instead of an inline TresCanvas so we can showcase full lab experiments.
const { src, title = 'TresJS Lab experiment' } = defineProps<{
  src: string
  title?: string
}>()
</script>

<template>
  <div class="not-prose my-6 overflow-hidden rounded-lg border border-gray-200 bg-gray-50 dark:border-default dark:bg-zinc-900">
    <div class="relative aspect-video w-full">
      <iframe
        :src
        :title
        loading="lazy"
        class="absolute inset-0 block h-full w-full border-0"
        allow="fullscreen; xr-spatial-tracking; accelerometer; gyroscope"
      />
    </div>
  </div>
</template>
