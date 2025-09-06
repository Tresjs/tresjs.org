<script setup lang="ts">
import { useIntersectionObserver, useBreakpoints } from '@vueuse/core'
import { Motion } from 'motion-v'

const { data: testimonials } = await useAsyncData('testimonials', () =>
  queryCollection('testimonials').all()
)

const items = computed(() => testimonials.value || [])

const target = ref<HTMLElement | null>(null)
const isVisible = ref(false)

// Detect mobile breakpoint
const breakpoints = useBreakpoints({
  mobile: 768,
})
const isMobile = breakpoints.smaller('mobile')

// Reactive options for intersection observer
const observerOptions = computed(() => ({
  threshold: isMobile.value ? 0.3 : 0.5, // 0.1 for mobile, 0.5 for desktop
  rootMargin: isMobile.value ? '100px' : '50px' // More buffer for mobile
}))

useIntersectionObserver(
  target,
  ([entry]) => {
    if (entry && entry.isIntersecting && !isVisible.value) {
      isVisible.value = true
    }
  },
  observerOptions.value
)
</script>

<template>
  <div ref="target" class="px-8">
    <div class="border-x border-dashed border-gray-200 dark:border-default py-16 md:py-32 mx-auto max-w-(--ui-container)">
      <div class="blueprint relative w-full">
         <header class="blueprint relative">
          <h2 class="px-8 py-16 w-full sm:w-1/2 text-4xl tracking-tighter text-balance sm:text-5xl lg:text-6xl font-display font-extrabold">
            Hear it from <br>the <span class="text-primary-400">community</span>
          </h2>
        </header>
        <UIcon name="lucide-plus" size="24"  class="absolute -bottom-3 -right-3 text-gray-300 z-10" />
        <div class="flex-1 w-full p-4">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Motion
              v-for="(testimonial, index) in items"
              :key="testimonial.path"
              :initial="{ opacity: 0, y: 20 }"
              :animate="isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }"
              :transition="{ duration: 0.5, delay: isVisible ? index * 0.1 : 0 }"
            >
              <UPageCard class="h-full" spotlight>
                <template #description>
                  <div class="prose prose-sm max-w-none dark:prose-invert">
                    <ContentRenderer :value="testimonial" />
                  </div>
                </template>
                
                <template #footer>
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-3">
                      <UAvatar :src="testimonial.avatar" :alt="testimonial.name" size="sm" />
                      <div>
                        <h3 class="text-sm font-semibold">{{ testimonial.name }}</h3>
                        <p class="text-xs text-gray-500">{{ testimonial.subtitle }}</p>
                      </div>
                    </div>
                  </div>
                </template>
              </UPageCard>
            </Motion>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

  