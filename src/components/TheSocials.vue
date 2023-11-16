<script lang="ts" setup>
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)

const socials = [
  {
    name: 'GitHub',
    icon: 'i-carbon-logo-github',
    url: 'https://tresjs.org/',
  },
  {
    name: 'Discord',
    icon: 'i-carbon-logo-discord',
    url: 'https://discord.gg/V8ZPvGHSQd',
  },
]
</script>

<template>
  <ul class="hidden sm:inline-flex items-center justify-end gap-4">
    <li>
      <button
        title="Toggle dark mode"
        class="bg-transparent"
        @click="toggleDark()"
      >
        <i
          v-if="isDark"
          class="i-carbon-sun text-light"
        />
        <i
          v-else
          class="i-carbon-moon text-gray-600"
        />
      </button>
    </li>
    <li
      v-for="{ icon, url } in socials"
      :key="icon"
    >
      <a
        :href="url"
        target="_blank"
        class="text-gray-600 dark:text-light text-xl hover:text-gray-500 transition-colors duration-200 ease-in-out"
        :class="icon"
      />
    </li>
  </ul>
</template>

<style scoped></style>
