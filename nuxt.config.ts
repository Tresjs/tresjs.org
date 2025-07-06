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
    '@nuxt/ui-pro',
    '@nuxt/devtools',
    '@tresjs/nuxt',
  ],
  uiPro: {
    license: process.env.NUXT_UI_PRO_LICENSE
  },
  fonts: {
    families: [
      { name: 'Manrope', provider: 'google', weights: ['500', '600', '800'] },
      { name: 'Inter', provider: 'google' },
    ],
  },
  nitro: {
    prerender: {
      routes: [
        '/',
      ],
      crawlLinks: true,
    },
  },
})