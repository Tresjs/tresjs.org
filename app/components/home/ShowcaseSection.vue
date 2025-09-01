<script setup lang="ts">
import { useIntersectionObserver } from '@vueuse/core'

const { data: showcase } = await useAsyncData('showcase', () =>
  queryCollection('showcase').all().then(items =>
    items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 6)
  )
)

const items = computed(() => showcase.value || [])

const target = ref<HTMLElement | null>(null)
const isVisible = ref(false)

useIntersectionObserver(
  target,
  ([entry]) => {
    if (entry?.isIntersecting && !isVisible.value) {
      isVisible.value = true
    }
  },
  {
    threshold: 0.3,
    rootMargin: '50px'
  }
)
</script>

<template>
  <div ref="target" class="px-8">
    <div class="border-x border-dashed border-gray-200 dark:border-default py-16 md:py-32 mx-auto max-w-(--ui-container)">
      <div class="blueprint relative w-full">
         <header class="blueprint relative">
          <h2 class="px-8 py-16 w-full sm:w-1/2 text-4xl tracking-tighter text-balance sm:text-5xl lg:text-6xl font-display font-extrabold">
            Built with  <br> <span class="text-primary-400">Tres</span>
          </h2>
        </header>
        <span class="absolute top-[-20px] left-[5px] text-sm text-gray-300 dark:text-gray-600 font-mono">Showcase</span>
        <UIcon name="lucide-plus" size="24"  class="absolute -bottom-3 -right-3 text-gray-300 z-10" />
        <div v-if="isVisible" class="flex-1 w-full bg-gray-100 dark:bg-neutral-800">
          <UCarousel
            ref="carousel"
            v-slot="{ item }"
            :items="items"
            class-names
            :ui="{
              item: 'md:basis-[40%] transition-opacity [&:not(.is-snapped)]:opacity-75'
            }"
            class="relative p-4"
            indicators
            wheel-gestures
          >
            <div class="p-4">
              <UCard>
                <NuxtImg :src="item.thumbnail" sizes="100vw sm:50vw md:744px" :alt="item.title" format="webp" class="w-full aspect-video object-cover h-auto rounded-lg" />
                <div class="flex justify-between items-center relative py-2 px-4 ">
                  <div>
                    <h3 class="text-lg font-bold font-display mb-2">{{ item.title }}</h3>
                    <p class="text-xs text-gray-500 font-mono opacity-75">{{ item.description }}</p>
                  </div>

                  <UButton :to="item.url" variant="soft" color="neutral" icon="i-lucide-arrow-up-right" class="rounded-full" />
                  
                </div>
              </UCard>
            </div>
          </UCarousel>
        </div>
        <div v-else class="flex-1 w-full bg-gray-100 min-h-[300px] flex items-center justify-center">
          <div class="flex items-center gap-2 text-gray-500">
            <div class="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
            Loading showcase...
          </div>
        </div>
        <footer v-if="isVisible" class="w-full p-8 flex items-center justify-center">
          <UButton
            to="/showcase"
            color="neutral"
            class="mx-auto mt-8"
            >Check all projects</UButton>
        </footer>
      </div>
    </div>
  </div>
</template>

  