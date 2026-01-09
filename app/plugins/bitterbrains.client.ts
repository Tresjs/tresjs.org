/**
 * Bitterbrains banner script plugin
 * Loads the script asynchronously on all pages using nuxt-scripts
 */
export default defineNuxtPlugin(() => {
  useScript({
    src: 'https://media.bitterbrains.com/main.js?from=ALVARO&type=top',
    async: true,
  })
})

