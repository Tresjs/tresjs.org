<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)

const showMenu = ref(false)

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
<div class="inline-flex sm:hidden">
  <div class="relative">
    <button 
      aria-label="Mobile navigation menu"
      :aria-expanded="showMenu" 
      class="p-2 inline-flex border-2 border-transparent dark:text-light rounded hover:border-gray-400" @click="showMenu = !showMenu">
      <i class="i-bi-list"></i>
    </button>
    <Transition name="fade">
      <div v-if="showMenu" class="absolute right-0 mt-2 p-2 w-48 bg-white dark:(bg-dark text-light) rounded shadow-xl z-30">
        <ul>
          <li><a href="http://docs.tresjs.org/" target="_blank" class="block dark:text-light px-4 py-2 hover:bg-gray-100">Docs</a></li>
          <li><a href="/blog" class="block dark:text-light px-4 py-2 hover:bg-gray-100">Blog</a></li>
          <li><a href="/playground" class="block dark:text-light px-4 py-2 hover:bg-gray-100">Playground</a></li>
          <hr>
          <br>
          <li>
            <button
              title="Toggle dark mode"
              class="bg-transparent block px-4 py-2"
              @click="toggleDark()"
            >
              <i
                v-if="isDark"
                class="i-carbon-sun text-light mr-3"
              />
              <i
                v-else
                class="i-carbon-moon text-gray-600 mr-3"
              />
              {{ isDark ? 'Light' : 'Dark'  }}
            </button>
          </li>
          <li
            v-for="{ name, icon, url } in socials"
            :key="icon"
          >
            <a
              :href="url"
              target="_blank"
              class="block dark:text-light px-4 py-2 hover:bg-gray-100"
              
            >
              <i class="mr-3" :class="icon" />
              {{ name }}
            </a>
          </li>
          <!-- Add more links as needed -->
        </ul>
      </div>
    </Transition>
  </div>
</div>
</template>