<script setup lang="ts">
defineProps<{
  title: string
  video?: string
  status: string
  repo?: string
  demo?: string
  author: string
  authorLink: string
}>()

const isHover = ref(false)

</script>
<template>
  <div class="flex flex-col items-center gap-8">
    <div class="relative bg-white dark:bg-dark 
      rounded-xl border border-2 border-gray-100 dark:border-gray-700 
      w-full p-4 shadow-xl dark:shadow-dark-800  text-gray-500 dark:text-light"
    >
      <img v-if="status === 'Soon'" src="/soon.png" class="w-32 absolute -top-8 right-0 sm:-right-8 z-2" alt="Soon">
      <a :href="demo"
        @mouseenter="isHover = true"
        @mouseleave="isHover = false"
        target="_blank" class="block mb-16 text-gray-500 dark:text-light hover:text-primary transition-color duration-400 ease-in">
        <span class="block aspect-video mb-8 rounded overflow-hidden bg-gray-100">
          <TransitionGroup name="fade">

          <video v-if="video && isHover" :autoplay="isHover" class="h-full transform scale-110">
            <source :src="video" type="video/mp4">
            Your browser does not support the video tag.
          </video>
          <template v-else :src="thumbnail">
            <slot name="thumbnail" />
          </template>
          </TransitionGroup>
        </span>
        <h3 class="font-bold text-2xl">{{title}}</h3>
      </a>
      <footer class="flex justify-between items-end text-right">
        <div class="flex gap-2">
          <a v-show="repo" class="i-carbon-logo-github text-gray-500 dark:text-light hover:text-primary transition-color duration-400 ease-in" href="repo" target="_blank"></a>
          <a v-show="demo" class="i-carbon-launch text-gray-500 dark:text-light hover:text-primary transition-color duration-400 ease-in" href="demo" target="_blank"></a>
        </div>
        <div>
          <p class="text-xl mb-0">{{author}}</p>
          <a :href="authorLink" class="text-gray-400 dark:text-light hover:text-primary transition-color duration-400 ease-in" target="_blank">@{{authorLink.split('/').pop()}}</a> 
        </div>
      </footer>
    </div>
    <slot name="avatar" />
  </div>
</template>