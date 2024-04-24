<script lang="ts" setup>
import { useDark, useToggle } from '@vueuse/core'
import { useGithub } from '../composables/useGithub';

const isDark = useDark()
const toggleDark = useToggle(isDark)
const isHover = ref(false)
const { getRepos, repos } = useGithub()
await getRepos()

const socials = [
  {
    name: 'X',
    icon: 'i-bi-twitter-x',
    url: 'https://x.com/tresjs_dev',
  },
  {
    name: 'Discord',
    icon: 'i-carbon-logo-discord',
    url: 'https://discord.gg/V8ZPvGHSQd',
  },
]
</script>

<template>
  <ul class="inline-flex items-center justify-end gap-4">
    <li>
      <a
        class="
        flex items-center w-23 h-7 px-2 py-1
        bg-transparent hover:bg-gray-600 dark:hover:bg-light
        rounded border border-dark dark:border-light
        text-gray-600 dark:text-light hover:text-light dark:hover:text-dark text-sm font-medium
        transition-colors duration-200 ease-in-out"
        href="https://github.com/Tresjs/tres"
        target="_blank"
        @mouseenter="isHover = true"
        @mouseleave="isHover = false"
        >
          <i
            class="i-carbon-logo-github mr-3 shrink-0"
          />
          <i v-show="isHover" class="i-carbon-star-filled text-yellow ml-1" />
          <span v-show="!isHover">{{ repos[0]?.stargazers_count || 1174 }}</span>
        </a>
    </li>
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
        class="text-gray-600 dark:text-light text-base hover:text-gray-500 transition-colors duration-200 ease-in-out"
        :class="icon"
      />
    </li>
  </ul>
</template>

<style scoped></style>
