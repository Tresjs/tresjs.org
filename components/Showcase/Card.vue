<script setup lang="ts">
import type { ShowcaseItem } from '~/types/showcase'

defineProps<{
  item: ShowcaseItem
}>()
</script>
<template>
  <div class="bg-default border-x sm:max-lg:nth-[2n+1]:border-l-0 lg:nth-[3n+1]:border-l-0 lg:nth-[3n]:border-r-0 border-solid border-gray-100 dark:border-default">
    <div class="p-4 relative py-2 px-4 before:absolute before:top-0 before:h-px before:w-[200vw] before:border-t before:border-solid before:border-gray-100 dark:before:border-default before:-left-[100vw] ">
      <NuxtImg :src="item.thumbnail" :alt="item.title" class="w-full aspect-video object-cover h-auto rounded-lg" />
    </div>
    <div class="flex justify-between items-center relative py-2 px-4 before:absolute before:top-0 before:h-px before:w-[200vw] before:border-t before:border-solid before:border-gray-100 dark:before:border-default before:-left-[100vw]  after:w-[200vw] after:absolute after:bottom-0 after:h-px after:border-t after:border-solid after:border-gray-100 dark:after:border-default after:-left-[100vw]">
      <div>
        <h3 class="text-lg font-bold font-display mb-2">{{ item.title }}</h3>
        <p class="text-xs text-gray-500 font-mono opacity-75">{{ item.description }}</p>
      </div>

      <UButton :to="item.url" variant="soft" color="neutral" icon="i-lucide-arrow-up-right" class="rounded-full" />
      
    </div>
  </div>
</template>