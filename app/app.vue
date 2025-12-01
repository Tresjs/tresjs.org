<script setup lang="ts">
import { joinURL } from 'ufo'

const colorMode = useColorMode()

const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set(_isDark) {
    colorMode.preference = _isDark ? 'dark' : 'light'
  },
})

const site = useSiteConfig()

useHead({
  titleTemplate: title => title ? `${title} · TresJS` : 'TresJS: The Intuitive 3D Framework for Vue',
  link: [
    { rel: 'icon', href: isDark.value ? '/favicon-dark.svg' : '/favicon.svg' },
  ],
})

if (import.meta.server) {
  useHead({
    meta: [
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
    htmlAttrs: {
      lang: 'en',
    },
  })

  useSeoMeta({
    ogSiteName: site.name,
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterSite: 'tresjs_dev',
    icon: joinURL(site.url, '/favicon.ico'),
  })

  useSchemaOrg([
    defineOrganization({
      name: site.name,
      url: site.url,
      logo: joinURL(site.url, '/favicon.svg'),
    }),
  ])
}
</script>

<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

