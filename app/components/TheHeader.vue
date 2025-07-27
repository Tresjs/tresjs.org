<script lang="ts" setup>

const { headerLinks } = useHeaderLinks()
</script>

<template>
  <UHeader>
    <template #title>
      <div class="flex items-center">
        <img src="/logo.svg" alt="Tres.js" class="h-3 mr-4">
        <a class="font-bold text-dark font-sans text-sm" href="/" title="Home">Tres<span class="text-primary-300">JS</span></a>
      </div>
    </template>
    <UNavigationMenu :items="headerLinks" />

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
    <template #body>
      <UNavigationMenu :items="headerLinks" orientation="vertical" class="-mx-2.5" />
    </template>
  </UHeader>
</template>
