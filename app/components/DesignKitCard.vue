<script setup lang="ts">
// Inspired in Nuxt's Design Kit https://github.com/nuxt/nuxt.com/blob/main/app/components/content/design-kit/DesignKitImageCard.vue
defineProps<{
  name: string,
  path: string,
  background: string,
  full?: boolean
}>()

const toast = useToast()

function handleDownload(format: string, name: string) {
  toast.add({
    title: `${format.toUpperCase()} downloaded!`,
    description: `${name} ${format.toUpperCase()} file`,
    icon: 'i-heroicons-arrow-down-tray',
    color: 'info'
  })
}
</script>
<template>
  <div class="w-full">
    <UCard :ui="{ body: full ? 'p-16 sm:p-16 ' : 'p-6 sm:p-6' }" :class="background">
      <img :src="`/design-kit/${path}.svg`" :alt="name" class="mx-auto" :class="full ? 'h-10' : 'h-16'">
    </UCard>

    <div class="flex items-center justify-between pt-2">
      <h5 class="font-semibold text-gray-900 dark:text-white text-base">
        {{ name }}
      </h5>

      <div class="flex items-center">
        <UButton
          variant="link"
          icon="i-tabler-svg"
          size="xl"
          :to="`/design-kit/${path}.svg`"
          download
          external
          aria-label="Download svg"
          @click="handleDownload('svg', name)"
        />
        <UButton
          variant="link"
          icon="i-tabler-png" 
          size="xl"
          :to="`/design-kit/${path}.png`"
          download
          external
          aria-label="Download png"
          @click="handleDownload('png', name)"
        />
      </div>
    </div>
  </div>
</template>