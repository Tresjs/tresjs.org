<script setup lang="ts">
import { joinURL } from 'ufo'

const site = useSiteConfig()
const title = 'TresJS'
const description = 'Build Interactive 3D experiences with Vue'

useHead({
  title: `${title} | ${description}`,
})

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage: joinURL(site.url, '/social/og-home.png'),
  ogUrl: site.url,
  twitterTitle: title,
  twitterDescription: description,
  twitterImage: joinURL(site.url, '/social/og-home.png'),
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
