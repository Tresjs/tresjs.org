<script setup lang="ts">
// Inline badge link with an auto-resolved icon, usable in MDC blog content as
// :magic-link{label="..." to="..."}. Icons resolve from (in order): a known
// brand override, a GitHub avatar for github.com links, or the site favicon.
// A failed image silently drops to a clean text badge — no broken-image icon.
const reHtmlProtocol = /^https?:\/\//i
const reGitHubScope = /^(?:https?:\/\/)?github\.com\/([\w-]+)/i

const { label, to } = defineProps<{
  label: string
  to?: string
}>()

const linksMap: Record<string, string> = {
  'TresJS': 'https://tresjs.org',
  'ThreeJS': 'https://threejs.org',
  'Vue': 'https://vuejs.org',
  'Nuxt': 'https://nuxt.com',
  'Rapier': 'https://rapier.rs',
}

const imageOverrides: Record<string, string> = {
  'TresJS': 'https://tresjs.org/favicon.svg',
  'ThreeJS': 'https://threejs.org/files/favicon.ico',
  'Vue': 'https://vuejs.org/logo.svg',
  'Nuxt': 'https://nuxt.com/icon.png',
}

const href = computed(() => to ?? linksMap[label] ?? label)

const githubUser = computed(() => href.value.match(reGitHubScope)?.[1])

const resolvedAvatar = computed(() => {
  if (imageOverrides[label]) {
    return imageOverrides[label]
  }
  if (githubUser.value) {
    return `https://github.com/${githubUser.value}.png`
  }
  if (reHtmlProtocol.test(href.value)) {
    try {
      return `${new URL(href.value).origin}/favicon.ico`
    }
    catch {
      return undefined
    }
  }
  return undefined
})

const imgFailed = ref(false)
const avatar = computed(() => (imgFailed.value ? undefined : resolvedAvatar.value))

function onImgError() {
  imgFailed.value = true
}
</script>

<template>
  <a class="magic-link not-prose" :href target="_blank" rel="noopener noreferrer">
    <UBadge
      class="translate-y-0.5 rounded-full"
      :label
      variant="soft"
      color="neutral"
      size="sm"
    >
      <template v-if="avatar" #leading>
        <img
          :src="avatar"
          :alt="label"
          class="h-4 w-4 rounded-full object-cover"
          @error="onImgError"
        >
      </template>
    </UBadge>
  </a>
</template>
