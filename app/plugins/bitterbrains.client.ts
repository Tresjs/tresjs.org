/**
 * Bitterbrains banner script plugin
 * Loads the script asynchronously on all pages using nuxt-scripts
 * warmupStrategy: false disables preloading to avoid console warnings
 */
export default defineNuxtPlugin(() => {
  useScript({
    src: 'https://media.bitterbrains.com/main.js?from=ALVARO&type=top',
    async: true,
  }, {
    // Disable preloading to avoid "resource was preloaded but not used" warning
    warmupStrategy: false,
  })
})

