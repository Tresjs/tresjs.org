<script setup lang="ts">
useSeoMeta({
  title: 'Design Kit | TresJS',
  description: 'Design Kit of projects built with TresJS, the declarative ThreeJS framework for Vue',
  ogTitle: 'Design Kit',
  ogDescription: 'Design Kit of projects built with TresJS, the declarative ThreeJS framework for Vue',
  ogImage: '/social/og-design-kit.png',
  twitterTitle: 'Design Kit',
  twitterDescription: 'Design Kit of projects built with TresJS, the declarative ThreeJS framework for Vue',
  twitterImage: '/social/og-design-kit.png',
  twitterCard: 'summary_large_image',
})


</script>
<template>
  <div class="grid min-h-dvh grid-cols-1 grid-rows-[1fr_1px_auto_1px_auto] justify-center [--gutter-width:2.5rem] lg:grid-cols-[var(--gutter-width)_minmax(0,var(--ui-container))_var(--gutter-width)] overflow-hidden">
    <div class="hidden lg:block col-start-1 row-span-full row-start-1 pattern-bg border-r border-solid border-gray-100 dark:border-default"/>
    <div class="row-span-full row-start-1 mb-32">
      <header class="mt-24">
        <h1 class="mx-2 text-lg font-mono font-medium">Design Kit</h1>
      </header>
      <div class="relative before:absolute before:top-0 before:h-px before:w-[200vw] before:border-t before:border-dashed before:border-gray-200 dark:before:border-default before:-left-[100vw]  after:w-[200vw] after:absolute after:bottom-0 after:h-px after:border-t after:border-dashed after:border-gray-200 dark:after:border-default  after:-left-[100vw]">
        <h2 class="px-2 py-16 w-full sm:w-1/2 text-4xl tracking-tighter text-balance sm:text-5xl lg:text-6xl font-display font-extrabold">
         TresJS  <br>
         Brand <span class="text-primary-300">Assets</span> 
        </h2>
      </div>
      <div class="p-8 bg-neutral-100 dark:bg-neutral-800 relative after:w-[200vw] after:absolute after:bottom-0 after:h-px after:border-t after:border-dashed after:border-gray-200 dark:after:border-default  after:-left-[100vw]">
        <div class="grid grid-cols-1 gap-8 md:grid-cols-2 ">
          <UPageCard 
            :title="'Isotypes'"
            description="Download the TresJS isotypes in various formats."
            icon="i-tres-favicon"
          >
            <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
              <DesignKitCard
                name="Dark"
                path="isotype-dark"
                background="bg-white"
                :full="true"
              />
              <DesignKitCard
                name="Light"
                path="isotype-light"
                background="bg-neutral-800"
                :full="true"
              />
            </div>
          </UPageCard>
        </div>
      </div>
      <div class="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"/>
    </div>
    <div class="row-span-full row-start-1 hidden lg:block pattern-bg border-l border-solid border-gray-100 dark:border-default"/>
  </div>
</template>