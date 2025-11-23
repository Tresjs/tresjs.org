<script setup lang="ts">
const colorMode = useColorMode()

const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set(_isDark) {
    colorMode.preference = _isDark ? 'dark' : 'light'
  },
})

useSeoMeta({
  title: 'TresJS | The solution for 3D with Vue',
  description: 'TresJS is a library for building 3D web applications with Three.js.',
  ogTitle: 'TresJS | The solution for 3D with Vue',
  ogDescription: 'TresJS is a library for building 3D web applications with Three.js.',
  ogUrl: 'https://tresjs.org',
  twitterTitle: 'TresJS | The solution for 3D with Vue',
  twitterDescription: 'TresJS is a library for building 3D web applications with Three.js.',
  twitterImage: 'https://tresjs.org/og-image.png',
  twitterCard: 'summary'
})

useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
  ],
  link: [
    { rel: 'icon', href: isDark.value ? '/favicon-dark.svg' : '/favicon.svg' },
  ],
  htmlAttrs: {
    lang: 'en',
  },
})
</script>

<template>
  <UApp>
    <LenisScroll />

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

