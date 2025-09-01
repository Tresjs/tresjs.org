<script setup lang="ts">

const { footerLinks } = useFooterLinks()

// Randomly select an icon from the available pool
const randomIcon = computed(() => {
  const icons = ['i-tres-cube-boy', 'i-tres-cientos-heart', 'i-tres-postprocessing-skull']
  const randomIndex = Math.floor(Math.random() * icons.length)
  return icons[randomIndex]
})
</script>
<template>
  <div>
    <USeparator :icon="randomIcon" class="h-px" />
    <UFooter :ui="{ top: 'border-b border-default' }">
      <template #top>
        <UContainer>
          <UFooterColumns :columns="footerLinks">
            <template #right>
             <!--  <NewsletterForm /> -->
            </template>
          </UFooterColumns>
        </UContainer>
      </template>

      <template #left>
        <p class="text-muted text-sm">
          Copyright © 2022-{{ new Date().getFullYear() }} Tres - <NuxtLink class="hover:underline" to="https://github.com/Tresjs/tres/blob/main/LICENSE" target="_blank">
            MIT License
          </NuxtLink>
        </p>
      </template>

      <template #right>
        <UButton
          color="neutral"
          variant="ghost"
          to="https://x.com/tresjs_dev"
          target="_blank"
          icon="i-simple-icons-x"
        >
          <span class="sr-only">Tres on X</span>
        </UButton>
        <UButton
          color="neutral"
          variant="ghost"
          to="https://bsky.app/profile/tresjs.org"
          target="_blank"
          icon="i-simple-icons-bluesky"
        >
          <span class="sr-only">Tres on BlueSky</span>
        </UButton>
        <UButton
          color="neutral"
          variant="ghost"
          to="https://discord.gg/rW8mtAQd"
          target="_blank"
          icon="i-simple-icons-discord"
        >
          <span class="sr-only">Tres on Discord</span>
        </UButton>
        <UButton
          color="neutral"
          variant="ghost"
          to="https://github.com/Tresjs"
          target="_blank"
          icon="i-simple-icons-github"
        >
          <span class="sr-only">Tres on GitHub</span>
        </UButton>
      </template>
    </UFooter>
  </div>
</template>