// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  css: ['~/assets/styles/main.css'],
  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/devtools',
    '@tresjs/nuxt',
  ],
  fonts: {
    families: [
      { name: 'Manrope', provider: 'google' },
      { name: 'Inter', provider: 'google' },
    ],
  },
})