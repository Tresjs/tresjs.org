<script setup lang="ts">
// Embeddable 16:9 frame for TresJS scenes inside MDC blog content.
// The slotted scene brings its own <TresCanvas>; this wrapper only provides a
// responsive, client-only container since WebGL can't render during prerender.
</script>

<template>
  <div class="not-prose my-6 overflow-hidden rounded-lg border border-gray-200 bg-gray-50 dark:border-default dark:bg-zinc-900">
    <div class="relative aspect-video w-full [&_canvas]:!absolute [&_canvas]:!inset-0 [&_canvas]:!block [&_canvas]:!h-full [&_canvas]:!w-full">
      <ClientOnly>
        <template #default>
          <slot />
        </template>
        <template #fallback>
          <div class="absolute inset-0 flex items-center justify-center text-sm text-gray-400 dark:text-gray-500">
            Loading scene…
          </div>
        </template>
      </ClientOnly>
    </div>
  </div>
</template>
