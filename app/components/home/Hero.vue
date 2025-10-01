<script setup lang="ts">
import { useClipboard  } from '@vueuse/core'
import { useDarkMode } from '~/composables/useDarkMode'

const { isDark, colors } = useDarkMode()

const { copy, copied } = useClipboard()

const isInstallCommandHover = ref(false)

const { data: page } = useAsyncData('home-hero', () => queryCollection('index').first())
</script>

<template>
 <div class="px-8 ">
  <div class="border-x border-dashed border-gray-200 dark:border-default py-16 md:py-32 mx-auto max-w-(--ui-container)">
    <div class="blueprint relative w-full h-[600px]">
      <span class="absolute top-[18px] right-[-30px] text-sm text-gray-300 dark:text-gray-600 rotate-90 font-mono">WebGL</span>
      <UIcon name="lucide-plus" size="24"  class="absolute -bottom-3 -left-3 text-gray-300 z-10" />
      <div class="absolute top-0 left-0 w-full h-full">
        <TresCanvas class="!pointer-events-none" :clear-color="isDark ? colors.DARK : colors.LIGHT">
          <HomeHeroExperience />
        </TresCanvas>
      </div>
      <div class="bg-gradient-to-b from-90% from-white dark:from-default to-transparent absolute top-0 left-0 w-full pb-16 pt-4 flex flex-col  justify-center items-center">
        <h1 class="text-4xl  tracking-tighter text-balance sm:text-5xl lg:text-6xl font-display font-extrabold mb-8 text-center">
           {{ page?.hero.title }} <span class="text-primary-400">{{ page?.hero.titleHighlight }}</span>
        </h1>
        <div class="hidden md:flex flex-col gap-4 justify-center items-center mb-8 blueprint relative  w-full">
          <!-- <p class="text-center text-gray-500 dark:text-gray-400 py-8 max-w-2xl mx-auto">
            TresJS is a <strong>declarative, component-driven approach</strong> layer on top of Three.js and WebGL that makes creative coding intuitive and fun.
          </p> -->
          <LazyMDC class="text-center text-gray-500 dark:text-gray-400 py-8 max-w-2xl mx-auto" :value="page.hero.body" :cache-key="`index-hero-body`" />
        </div>
        <div class="flex gap-4 justify-center items-center mb-8">
          <UButton v-for="cta in page?.hero.ctas" :key="cta.label" :to="cta.to" :color="cta.color" :variant="cta.variant" :size="cta.size" :icon="cta.icon">
            {{ cta.label }}
          </UButton>
        </div>
        <div class="flex gap-2 justify-start items-center px-8">
          <span
          class="text-sm text-gray-400 font-mono cursor-pointer" 
          :class="{ 'text-gray-500': isInstallCommandHover }" 
          @mouseenter="isInstallCommandHover = true" 
          @mouseleave="isInstallCommandHover = false"
          @click="copy('npx create-tres@latest')"
        >~ npx create-tres@latest</span>
          <UIcon :name="isInstallCommandHover ? (copied ? 'lucide-check' : 'lucide-copy') : ''" class="w-4 h-4" />
        </div>
      </div>
    </div>
  </div>
 </div>
</template>

