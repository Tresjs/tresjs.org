<script setup lang="ts">
import { useIntersectionObserver } from '@vueuse/core'

const { data: page } = useAsyncData('home-scenes', () => queryCollection('index').first())

const tabs = computed(() => page.value?.scenes.tabs.map(tab => ({
  label: tab.title,
  icon: tab.icon,
  descriptionTitle: tab.descriptionTitle,
  description: tab.description,
  content: tab.content,
  value: tab.title.toLowerCase().replace(/\s+/g, '-')
})))
const activeTab = ref('declarative')

const activeTabDescription = computed(() => tabs.value?.find(tab => tab.value === activeTab.value))

const target = ref<HTMLElement | null>(null)
const isVisible = ref(false)

useIntersectionObserver(
  target,
  ([{ isIntersecting }]) => {
    if (isIntersecting && !isVisible.value) {
      isVisible.value = true
    }
  },
  {
    threshold: 0.2,
    rootMargin: '100px'
  }
)
</script>
<template>
<div ref="target" class="relative px-8">
  <div class="min-h-screen border-x border-dashed border-gray-200 dark:border-default py-16 sm:pt-96 mx-auto max-w-(--ui-container)">
    <div v-if="isVisible" class="grid grid-cols-1 sm:grid-cols-2 gap-8">
      <div class="relative w-full aspect-video  rounded-lg">
        <div class="sm:absolute sm:-top-56 sm:-right-32 w-full sm:w-[350px] aspect-video sm:aspect-square">
          <HomeScene :scene="activeTab" />
        </div>
        <div id="scenes-description" class="px-2 sm:p-8">
          <h2 class="text-3xl tracking-tighter text-balance sm:text-5xl lg:text-6xl font-display font-extrabold mb-8 text-left sm:w-1/2" v-html="activeTabDescription?.descriptionTitle"/>
          <p class="text-gray-500 dark:text-gray-400 text-sm sm:text-lg">{{ activeTabDescription?.description }}</p>
        </div>
      </div>
      <div>
        <UPageCard 
        class="overflow-auto lg:absolute [@media(min-width:2400px)]:relative [@media(min-width:2400px)]:mt-8 right-0 lg:w-screen [@media(min-width:2400px)]:right-auto lg:w-[calc(50%-2rem)] [@media(min-width:2400px)]:w-full max-w-[800px] [@media(min-width:2400px)]:mx-auto rounded-none lg:rounded-l-[calc(var(--ui-radius)*4)] [@media(min-width:2400px)]:rounded-2xl -mx-4 sm:-mx-6 lg:mx-0"
        variant="subtle"
        :ui="{ container: 'bg-default/75 backdrop-blur px-2 sm:pt-4.5 lg:pr-0 [@media(min-width:2400px)]:px-6 w-full' }">
          <UTabs
            v-if="tabs"
            v-model="activeTab"
            :items="tabs"
            :unmount-on-hide="false"
            :ui="{
              list: 'px-0 bg-transparent lg:pr-4 overflow-x-auto',
              trigger: 'group data-[state=active]:text-highlighted',
              indicator: 'bg-default',
              leadingIcon: 'group-data-[state=active]:text-primary size-4 hidden sm:inline-flex',
              content: 'lg:h-[450px] bg-default [@media(min-width:2400px)]:border-e [@media(min-width:2400px)]:border-default [@media(min-width:2400px)]:rounded-l-[calc(var(--ui-radius)*1.5)] transition-opacity duration-500 data-[state=inactive]:opacity-0 opacity-100'
            }"
          >
            <template #content="{ item, index }">
              <LazyMDC  :value="item.content" :cache-key="`index-hero-tab-${index}`" hydrate-on-idle />
            
            </template>
          </UTabs>
        </UPageCard>
      </div>
    </div>
    <div v-else class="min-h-screen flex items-center justify-center">
      <div class="flex items-center gap-2 text-gray-500">
        <div class="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
        Loading interactive scenes...
      </div>
    </div>
  </div>
</div>
</template>