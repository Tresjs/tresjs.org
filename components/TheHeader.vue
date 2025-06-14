<script lang="ts" setup>
import type { NavigationMenuItem } from '@nuxt/ui'

const route = useRoute()

const items = computed<NavigationMenuItem[]>(() => [
  {
    label: 'Docs',
    to: '/getting-started',
    active: route.path.startsWith('/getting-started')
  },
  {
    label: 'Showcase',
    to: '/showcase',
    active: route.path.startsWith('/showcase')
  },
  {
    label: 'Roadmap',
    to: '/roadmap'
  },
  {
    label: 'Releases',
    to: 'https://github.com/Tresjs/tres/releases',
    target: '_blank'
  }
])
</script>

<template>
  <UHeader>
    <template #title>
      <div class="flex items-center">
        <img src="/logo.svg" alt="Tres.js" class="h-3 mr-4">
        <a class="font-bold text-dark font-sans" href="/" title="Home">Tres<span class="text-primary-300">JS</span></a>
      </div>
    </template>
    <UNavigationMenu :items="items" />

    <template #right>
      <UColorModeButton />

      <UTooltip text="Open on GitHub" :kbds="['meta', 'G']">
        <UButton
          color="neutral"
          variant="ghost"
          to="https://github.com/nuxt/ui"
          target="_blank"
          icon="i-simple-icons-github"
          aria-label="GitHub"
        />
      </UTooltip>
    </template>
  </UHeader>
  <!-- <header class="bg-(--ui-bg)/75 backdrop-blur border-b border-(--ui-border) h-(--ui-header-height) sticky top-0 z-50">
    <UContainer class="h-full flex items-center justify-between">
      <div class="flex items-center">
        <img src="/logo.svg" alt="Tres.js" class="h-3 mr-4">
        <a class="font-bold text-dark font-sans" href="/" title="Home">Tres<span class="text-primary-300">JS</span></a>
      </div>
      <ul class="flex gap-4 justify-between items-center">
        <button title="Toggle dark mode" class="bg-transparent -mt-1" @click="toggleDark()">
          <i v-if="isDark" class="i-carbon-sun" />
          <i v-else class="i-carbon-moon" />
        </button>
        <a href="https://tresjs.org/" target="_blank" class="i-carbon-document" />
        <a href="https://github.com/Tresjs/lab" target="_blank" class="i-carbon-logo-github" />
      </ul>
    </UContainer>
  </header> -->
</template>
