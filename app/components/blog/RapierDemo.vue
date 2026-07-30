<script setup lang="ts">
import { useIntersectionObserver } from '@vueuse/core'

// Same 16:9 frame as <EmbedScene>, but gated on the page wide rapier lock so
// only one physics world is ever alive. Scrolling a demo into view claims it.
const { label = 'physics demo' } = defineProps<{ label?: string }>()

const root = useTemplateRef<HTMLElement>('root')
const { isActive, claim } = useRapierDemoLock()

useIntersectionObserver(root, ([entry]) => {
  if (entry?.isIntersecting) { claim() }
}, { threshold: 0.4 })
</script>

<template>
  <div
    ref="root"
    class="not-prose my-6 overflow-hidden rounded-lg border border-gray-200 bg-gray-50 dark:border-default dark:bg-zinc-900"
  >
    <div class="relative aspect-video w-full [&_canvas]:!absolute [&_canvas]:!inset-0 [&_canvas]:!block [&_canvas]:!h-full [&_canvas]:!w-full">
      <ClientOnly>
        <template #default>
          <slot v-if="isActive" />
          <div v-else class="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <p class="text-sm text-gray-500 dark:text-gray-400">
              Only one physics demo runs at a time.
            </p>
            <button
              type="button"
              class="cursor-pointer rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-700"
              @click="claim"
            >
              Run the {{ label }}
            </button>
          </div>
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
