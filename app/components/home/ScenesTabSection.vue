<script setup lang="ts">
const activeTab = ref('Declarative.vue')
const contentMap = {
  'Declarative.vue': `
   ## Declarative <span class="text-primary">Scenes</span>
   TresJS enables you to utilise all capabilities of Three.js declaratively by using Vue components and let <TresCanvas /> manage the rest. Utilise the lifecycle of Vue components to engage with events and manage state transitions.

  `
} as const
const tabs = [
  {
    label: 'Declarative.vue',
    icon: 'lucide-plus',
    content: `
    <div>
      <h1>Declarative</h1>
    </div>
    `,
  },
  {
    label: 'DxFocused.vue',
    icon: 'lucide-plus',
    content: `
    <div>
      <h1>DxFocused</h1>
    </div>
    `,
  }
]
</script>
<template>
<div class="px-8">
  <div class="min-h-screen border-x border-dashed border-gray-200 dark:border-default py-32 mx-auto max-w-(--ui-container)">
    <div class="blueprint grid grid-cols-1 sm:grid-cols-2 gap-8">
      <div class="relative w-full aspect-video  rounded-lg">
        <div class="absolute -top-24 -right-4 w-[250px] h-[250px]">
          <TresCanvas :clear-alpha="0" :antialias="false" alpha>
            <TresMesh>
              <TresBoxGeometry />
              <TresMeshNormalMaterial />
            </TresMesh>
            <ContactShadows :position="[-1, -1, -1]" :scale="10" :blur="2" :far="10" />
          </TresCanvas>   
        </div>
        <div class="p-8">
          <<h2 class="text-4xl tracking-tighter text-balance sm:text-5xl lg:text-6xl font-display font-extrabold mb-8 text-left ">{{ contentMap[activeTab].title }}</h2>
          <p class="text-gray-500 dark:text-gray-400 text-lg">{{ contentMap[activeTab].description }}</p>>
        </div>
      </div>
      <div class="w-full h-full">
        <UPageCard 
        class="overflow-auto lg:absolute [@media(min-width:2400px)]:relative [@media(min-width:2400px)]:mt-8 right-0 [@media(min-width:2400px)]:right-auto w-screen lg:w-[calc(50%-2rem)] [@media(min-width:2400px)]:w-full max-w-[800px] [@media(min-width:2400px)]:mx-auto rounded-none lg:rounded-l-[calc(var(--ui-radius)*4)] [@media(min-width:2400px)]:rounded-2xl -mx-4 sm:-mx-6 lg:mx-0"
        variant="subtle"
        :ui="{ container: 'sm:pt-4.5 lg:pr-0 [@media(min-width:2400px)]:px-6 w-full' }">
          <UTabs
           
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
              <LazyMDC :value="item.content" :cache-key="`index-hero-tab-${index}`" hydrate-on-idle />
            </template>
          </UTabs>
        </UPageCard>
      </div>
    </div>
  </div>
</div>
</template>