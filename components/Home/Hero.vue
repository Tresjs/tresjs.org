<script setup lang="ts">
import { useDark, useClipboard  } from '@vueuse/core'

const isDark = useDark()
const { copy, copied } = useClipboard()

const isInstallCommandHover = ref(false)

const colors = {
  DARK: '#1e1f22',
  LIGHT: '#f8f8f8',
}
</script>

<template>
  <UContainer class="border-x border-dashed border-gray-300/50 py-16 !px-0">
    <div class="relative w-full intro h-[600px]">
      <span class="absolute top-[18px] right-[-30px] text-sm text-gray-300 rotate-90 font-mono">WebGL</span>
      <UIcon name="lucide-plus" size="24"  class="absolute -bottom-3 -left-3 text-gray-300 z-10" />
      <div class="absolute top-0 left-0 w-full h-full">
        <TresCanvas :clear-color="isDark ? colors.DARK : colors.LIGHT">
          <HomeHeroExperience />
        </TresCanvas>
      </div>
      <div class="bg-gradient-to-b from-90% from-white to-transparent absolute top-0 left-0 w-full py-16 flex flex-col  justify-center items-center">
        <h1 class="text-4xl font-display font-bold mb-8">Build Interactive 3D experiences with <span class="text-primary-400">Vue</span></h1>
        <div class="flex gap-4 justify-center items-center mb-8">
          <UButton to="https://docs.tresjs.org/" color="neutral" size="lg" icon="lucide-rocket">
            Get Started
          </UButton>
          <UButton to="https://play.tresjs.org/" color="neutral" variant="subtle" size="lg">
            Playground
          </UButton>
        </div>
        <div class="flex gap-2 justify-start items-center px-8">
          <span
          class="text-sm text-gray-400 font-mono cursor-pointer" 
          :class="{ 'text-gray-500': isInstallCommandHover }" 
          @mouseenter="isInstallCommandHover = true" 
          @mouseleave="isInstallCommandHover = false"
          @click="copy('npm install @tresjs/core')"
        >~ npm install @tresjs/core</span>
          <UIcon :name="isInstallCommandHover ? (copied ? 'lucide-check' : 'lucide-copy') : ''" class="w-4 h-4" />
        </div>
      </div>
    </div>
  </UContainer>
</template>

<style scoped>

.intro::before {
  content: "";
  position: absolute;
  top: 0;
  left: calc(var(--ui-line-offset) / 2 * -1);
  width: calc(100% + var(--ui-line-offset));
  height: 1px;
  background: linear-gradient(to right, var(--ui-border), var(--ui-border) 50%, transparent 0, transparent);
  background-size: var(--ui-line-gap) var(--ui-line-width);
  z-index: 1;
}
.intro::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: calc(var(--ui-line-offset) / 2 * -1);
  width: calc(100% + var(--ui-line-offset));
  height: 1px;
  background: linear-gradient(to right, var(--ui-border), var(--ui-border) 50%, transparent 0, transparent);
  background-size: var(--ui-line-gap) var(--ui-line-width)
}
</style>
