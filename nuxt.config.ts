// https://nuxt.com/docs/api/configuration/nuxt-config

import { parseMdc } from './helpers/mdc-parser.mjs'

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  css: ['~/assets/styles/main.css'],
  site: {
    url: 'https://tresjs.org',
    name: 'TresJS',
    logo: '/favicon.svg',
  },
  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/content',
    '@nuxt/devtools',
    '@tresjs/nuxt',
    'motion-v/nuxt',
    '@nuxt/scripts',
    '@nuxtjs/seo',
    'nuxt-studio',
  ],
  image: {
    format: ['webp', 'avif'],
    domains: ['avatars.githubusercontent.com'],
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536
    }
  },
  fonts: {
    families: [
      { name: 'Manrope', provider: 'google', weights: ['500', '600', '800'] },
      { name: 'Inter', provider: 'google' },
    ],
  },
  content: {
    build: {
      markdown: {
        highlight: {
          theme: {
            default: 'catppuccin-latte',
            light: 'catppuccin-latte',
            dark: 'catppuccin-frappe',
          }
        },
      },
    }
  },
  hooks: {
    'content:file:afterParse': async ({ file, content }) => {
      if (file.id === 'index/index.yml') {
        // @ts-expect-error -- TODO: fix this
        for (const tab of content.scenes.tabs) {
          tab.content = await parseMdc(tab.content)
        }
        // @ts-expect-error -- TODO: fix this
        delete content.meta.body
      }
    }
  },
  mdc: {
    highlight: {
      noApiRoute: false
    }
  },
  nitro: {
    preset: 'netlify',
    prerender: {
      routes: [
        '/',
        '/blog',
      ],
      crawlLinks: true,
      concurrency: 1, // Limit concurrent prerendering to reduce memory usage
    },
  },
  icon: {
    customCollections: [{
      prefix: 'tres',
      dir: './app/assets/icons'
    }],
    serverBundle: {
      collections: ['heroicons', 'simple-icons', 'lucide']
    }
  },
  routeRules: {
    '/': { prerender: true },
    '/team': { prerender: true },
    '/blog/**': { prerender: true },
    '/blog/rss.xml': { prerender: true },
    '/discord': { redirect: { to: 'https://discord.gg/atuJunqHzc', statusCode: 301 } },
    // Enable SSR for Nuxt Studio routes
    '/_studio/**': { ssr: true },
    '/api/_studio/**': { ssr: true },
  },
  $production: {
    devtools: { enabled: false },
    scripts: {
      registry: {
        fathomAnalytics: {
          site: 'OWBUVCJK',
        },
      },
    },
  },
  studio: {
    // Studio admin login route
    route: '/_studio', // default

    // Git repository configuration
    repository: {
      provider: 'github', // 'github' or 'gitlab' (default: 'github')
      owner: 'tresjs', // your GitHub/GitLab owner (required)
      repo: 'tresjs.org', // your repository name (required)
      branch: 'main', // branch to commit to (default: 'main')
      rootDir: '', // subdirectory for monorepos (default: '')
      private: false, // request access to private repos (default: true)
    },
  }
})