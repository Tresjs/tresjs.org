<script setup lang="ts">
useHead({
  title: 'TresJS | Team',
})

useSeoMeta({
  title: 'TresJS | Team',
  description: 'The development of TresJS is led by a small but passionate team.',
  ogTitle: 'TresJS | Team',
  ogDescription: 'The development of TresJS is led by a small but passionate team.',
  ogImage: '/social/og-home.png',
  ogUrl: 'https://tresjs.org',
  twitterTitle: 'TresJS',
  twitterDescription: 'The development of TresJS is led by a small but passionate team.',
  twitterImage: '/social/og-home.png',
  twitterCard: 'summary_large_image',
})

const { data: team } = await useAsyncData('team', () => $fetch('/api/teams'))

// Debug: log team data to console
if (import.meta.client) {
  console.log('Team data:', team.value)
}
</script>
<template>
  <div class="grid min-h-dvh grid-cols-1 grid-rows-[1fr_1px_auto_1px_auto] justify-center [--gutter-width:2.5rem] lg:grid-cols-[var(--gutter-width)_minmax(0,var(--ui-container))_var(--gutter-width)] overflow-hidden">
    <div class="hidden lg:block col-start-1 row-span-full row-start-1 pattern-bg border-r border-solid border-gray-100 dark:border-default"/>
    <div class="pl-2 row-span-full row-start-1 mb-32">
      <header class="mt-24">
        <h1 class="text-lg font-mono font-medium">Team</h1>
      </header>
      <div class="px-2 relative before:absolute before:top-0 before:h-px before:w-[200vw] before:border-t before:border-dashed before:border-gray-200 dark:before:border-default before:-left-[100vw] after:w-[200vw] after:absolute after:bottom-0 after:h-px after:border-t after:border-dashed after:border-gray-200 dark:after:border-default after:-left-[100vw]">
        <h2 class=" py-16 w-full sm:w-1/2 text-4xl tracking-tighter text-balance sm:text-5xl lg:text-6xl font-display font-extrabold">
          Meet the team behind TresJS
        </h2>
        <p class="text-lg text-gray-400 dark:text-gray-400">
          The development of TresJS is led by a small but passionate team.
        </p>
      </div>
      
      <!-- Core Team Section -->
      <div class="px-2 mt-8">
        <h3 class="mb-6 text-2xl font-semibold">Core Team</h3>
        <div v-if="team?.core?.length" class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <UPageCard v-for="member in team?.core" :key="member.login" spotlight class="text-center">
            <div class="flex flex-col items-center space-y-4">
              <img 
                :src="member.avatarUrl" 
                :alt="member.name"
                class="w-20 h-20 rounded-full object-cover"
              >
              <div>
                <h4 class="font-semibold text-lg">{{ member.name }}</h4>
                <p class="text-sm text-gray-600 dark:text-gray-400">@{{ member.login }}</p>
                <p v-if="member.location" class="text-sm text-gray-500">{{ member.location }}</p>
              </div>
              
              <div class="space-y-3">
                <div class="flex justify-center gap-2">
                  <template v-for="(account, provider) in member.socialAccounts" :key="provider">
                    <UButton 
                      :to="account.url" 
                      external 
                      variant="ghost" 
                      size="xl"
                      square
                      :icon="provider === 'github' ? 'i-simple-icons-github' : 
                             provider === 'twitter' ? 'i-simple-icons-twitter' : 
                             provider === 'linkedin' ? 'i-simple-icons-linkedin' :
                             provider === 'bluesky' ? 'i-simple-icons-bluesky' :
                             'i-heroicons-link'"
                    />
                  </template>
                  <UButton 
                    v-if="member.websiteUrl" 
                    :to="member.websiteUrl" 
                    external 
                    variant="ghost" 
                    size="xl"
                    square
                    icon="i-heroicons-globe-alt"
                  />
                </div>
                <UButton 
                  v-if="member.sponsorsUrl" 
                  :to="member.sponsorsUrl" 
                  external 
                  color="neutral"
                  variant="subtle"
                  size="sm"
                  icon="i-heroicons-heart"
                  label="Sponsor"
                  :ui="{
                    leadingIcon: 'text-pink-500'
                  }"
                />
              </div>
            </div>
          </UPageCard>
        </div>
        <div v-else class="text-center py-8">
          <p class="text-gray-500">Loading team members...</p>
        </div>
      </div>

      <!-- Maintainers Section -->
      <div v-if="team?.mantainers?.length" class="px-2 mt-12">
        <h3 class="mb-6 text-2xl font-semibold">Maintainers</h3>
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <UPageCard v-for="member in team?.mantainers" :key="member.login" spotlight class="text-center">
            <div class="flex flex-col items-center space-y-4">
              <img 
                :src="member.avatarUrl" 
                :alt="member.name"
                class="w-20 h-20 rounded-full object-cover"
              >
              <div>
                <h4 class="font-semibold text-lg">{{ member.name }}</h4>
                <p class="text-sm text-gray-600 dark:text-gray-400">@{{ member.login }}</p>
                <p v-if="member.location" class="text-sm text-gray-500">{{ member.location }}</p>
              </div>
              
              <div class="space-y-3">
                <div class="flex justify-center gap-2">
                  <template v-for="(account, provider) in member.socialAccounts" :key="provider">
                    <UButton 
                      :to="account.url" 
                      external 
                      variant="ghost" 
                      size="xl"
                      square
                      :icon="provider === 'github' ? 'i-simple-icons-github' : 
                             provider === 'twitter' ? 'i-simple-icons-twitter' : 
                             provider === 'linkedin' ? 'i-simple-icons-linkedin' :
                             provider === 'bluesky' ? 'i-simple-icons-bluesky' :
                             'i-heroicons-link'"
                    />
                  </template>
                  <UButton 
                    v-if="member.websiteUrl" 
                    :to="member.websiteUrl" 
                    external 
                    variant="ghost" 
                    size="xl"
                    square
                    icon="i-heroicons-globe-alt"
                  />
                </div>
                <UButton 
                  v-if="member.sponsorsUrl" 
                  :to="member.sponsorsUrl" 
                  external 
                  color="neutral"
                  variant="subtle"
                  size="sm"
                  icon="i-heroicons-heart"
                  :ui="{
                    leadingIcon: 'text-pink-500'
                  }"
                  label="Sponsor"
                />
              </div>
            </div>
          </UPageCard>
        </div>
      </div>
    </div>
    <div class="row-span-full row-start-1 hidden lg:block pattern-bg border-l border-solid border-gray-100 dark:border-default"/>
  </div>
</template>