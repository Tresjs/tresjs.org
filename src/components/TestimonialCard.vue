<script setup lang="ts">
defineProps<{
  name: string
  subtitle: string
  avatar: string
  twitter: string
}>()
</script>
<template>
<div class="bg-white dark:bg-dark 
    rounded-xl border border-2 border-gray-100 dark:border-gray-700 
    w-full p-4 shadow-xl dark:shadow-gray-700 text-gray-500 dark:text-light">
    <header class="w-full flex">
      <img :src="avatar" alt="avatar" class="w-12 h-12 rounded-full mr-4" />
      <div class="flex flex-col justify-center mb-8">
        <a :href="`https://x.com/${twitter}`" class="text-gray-600 dark:text-light hover:text-primary transition-color ease-in duration-300ms">
          <h3 class="text-lg font-semibold mb-1">{{ name }}</h3>
        </a>
        <span class="text-xs text-gray-400 font-regular">{{ subtitle }}</span>
      </div>
    </header>
  <slot />
</div>
</template>

