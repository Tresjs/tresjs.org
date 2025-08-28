<script setup lang="ts">
const { data: testimonials } = await useAsyncData('testimonials', () =>
  queryCollection('testimonials').all()
)

const items = computed(() => testimonials.value || [])
</script>

<template>
  <div class="px-8 ">
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
              :animate="{ opacity: 1, y: 0 }"
              :transition="{ duration: 0.5, delay: index * 0.1 }"
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
                    <UButton
                      v-if="(testimonial as any).twitter"
                      :to="`https://twitter.com/${(testimonial as any).twitter}`"
                      variant="ghost"
                      color="neutral"
                      icon="i-lucide-twitter"
                      size="xs"
                      target="_blank"
                      class="rounded-full"
                    />
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

  