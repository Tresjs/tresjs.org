<script setup lang="ts">
import { useClipboard } from '@vueuse/core'

interface PaletteColor {
  name: string
  main: string
  tint: string
  shade: string
  hex: string
}

defineProps<{
  color: PaletteColor
}>()

const { copy } = useClipboard()
const toast = useToast()

function copyColor(colorValue: string, colorType: string) {
  copy(colorValue)
  toast.add({
    title: `${colorType} color copied!`,
    description: colorValue,
    icon: 'i-heroicons-check-circle',
    color: 'success'
  })
}
</script>

<template>
  <div class="w-full">
    <UCard :ui="{ body: 'p-0' }">
      <div class="flex h-32">
        <div 
          class="flex-1 flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity" 
          :style="{ backgroundColor: color.main }"
          :title="`Click to copy ${color.main}`"
          @click="copyColor(color.main, `${color.name} main`)"
        />
        <div class="w-16 flex flex-col">
          <div 
            class="flex-1 cursor-pointer hover:opacity-90 transition-opacity" 
            :style="{ backgroundColor: color.tint }"
            :title="`Click to copy ${color.tint}`"
            @click="copyColor(color.tint, `${color.name} tint`)"
          />
          <div 
            class="flex-1 cursor-pointer hover:opacity-90 transition-opacity" 
            :style="{ backgroundColor: color.shade }"
            :title="`Click to copy ${color.shade}`"
            @click="copyColor(color.shade, `${color.name} shade`)"
          />
        </div>
      </div>
    </UCard>

    <div class="flex items-center justify-between pt-2">
      <div>
        <h5 class="font-semibold text-gray-900 dark:text-white text-base">
          {{ color.name }}
        </h5>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          {{ color.hex }}
        </p>
      </div>

      <div class="flex items-center">
        <UButton
          variant="link"
          icon="i-tabler-copy"
          size="xl"
          aria-label="Copy hex color"
          @click="copyColor(color.hex, `${color.name} hex`)"
        />
      </div>
    </div>
  </div>
</template>