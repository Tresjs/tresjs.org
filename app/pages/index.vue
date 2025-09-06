<script setup lang="ts">
useHead({
  title: 'TresJS | Build Interactive 3D experiences with Vue',
})

useSeoMeta({
  title: 'TresJS',
  description: 'Build Interactive 3D experiences with Vue',
  ogTitle: 'TresJS',
  ogDescription: 'Build Interactive 3D experiences with Vue',
  ogImage: '/social/og-home.png',
  ogUrl: 'https://tresjs.org',
  twitterTitle: 'TresJS',
  twitterDescription: 'Build Interactive 3D experiences with Vue',
  twitterImage: '/social/og-home.png',
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <div>
    <HomeHero />
    <LazyHomeDiagramSection />
    <LazyHomeScenesTabSection />
    <LazyHomeShowcaseSection />
    <LazyHomeTestimonialsSection />
  </div>
</template>

<style scoped></style>
