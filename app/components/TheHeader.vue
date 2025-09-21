<script lang="ts" setup>

const { headerLinks } = useHeaderLinks()
</script>

<template>
  <UHeader>
    <template #title>
      <TheLogo />
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
