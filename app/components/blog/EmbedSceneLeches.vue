<script setup lang="ts">
import { TresLeches, useControls } from '@tresjs/leches'

// Own frame instead of <EmbedScene>: at phone width a 16:9 frame is too short
// for the panel, so the panel moves below the scene there.
const colorMode = useColorMode()

function brightnessFor(mode: string) {
  return mode === 'dark' ? -0.2 : 0.2
}

function between(min: number, max: number) {
  return min + Math.random() * (max - min)
}

const reducedMotion = import.meta.client && window.matchMedia('(prefers-reduced-motion: reduce)').matches

const speed = ref(reducedMotion ? 0 : 0.4)
const scale = ref(2.5)
const warp = ref(4)
const contrast = ref(1.3)
const brightness = ref(brightnessFor(colorMode.value))
const grain = ref(0.08)
const invert = ref(false)

watch(() => colorMode.value, (mode) => {
  brightness.value = brightnessFor(mode)
})

// A page-specific id, so this panel never picks up controls from another demo.
const uuid = 'blog-summer-2026-leches'

useControls({
  speed: { value: speed, min: 0, max: 2, step: 0.01 },
  scale: { value: scale, min: 0.5, max: 8, step: 0.1 },
  warp: { value: warp, min: 0, max: 8, step: 0.1 },
  contrast: { value: contrast, min: 0, max: 3, step: 0.01 },
  brightness: { value: brightness, min: -1, max: 1, step: 0.01 },
  grain: { value: grain, min: 0, max: 0.5, step: 0.01 },
  // Passed as a bare ref: `{ value: invert }` with no `type` is inferred as a text control.
  invert,
}, { uuid })

useControls({
  randomize: {
    type: 'button',
    value: {
      label: 'Randomize',
      variant: 'primary',
      size: 'md',
      onClick: () => {
        scale.value = +between(1, 6).toFixed(1)
        warp.value = +between(0.5, 7).toFixed(1)
        contrast.value = +between(0.8, 2.2).toFixed(2)
      },
    },
  },
}, { uuid })

useControls('fpsgraph', { uuid })
</script>

<template>
  <div class="not-prose relative my-6 overflow-hidden rounded-lg border border-gray-200 bg-gray-50 dark:border-default dark:bg-zinc-900">
    <ClientOnly>
      <div
        aria-hidden="true"
        class="relative aspect-video w-full [&_canvas]:!absolute [&_canvas]:!inset-0 [&_canvas]:!block [&_canvas]:!h-full [&_canvas]:!w-full"
      >
        <BlogLechesNoise
          :speed="speed"
          :scale="scale"
          :warp="warp"
          :contrast="contrast"
          :brightness="brightness"
          :grain="grain"
          :invert="invert"
        />
      </div>
      <div class="flex justify-center p-3 md:absolute md:top-3 md:right-3 md:p-0">
        <div class="w-[280px] max-w-full">
          <TresLeches :uuid="uuid" :float="false" />
        </div>
      </div>
      <template #fallback>
        <div class="flex aspect-video w-full items-center justify-center text-sm text-gray-400 dark:text-gray-500">
          Loading scene…
        </div>
      </template>
    </ClientOnly>
  </div>
</template>
