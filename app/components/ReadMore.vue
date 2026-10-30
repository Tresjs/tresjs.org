<script setup lang="ts">
import { splitByCase, upperFirst } from 'scule'

const { to, title, icon = 'i-lucide-bookmark' } = defineProps<{
  to: string
  title?: string
  icon?: string
}>()

const createBreadcrumb = (link: string = 'Missing link') => {
  if (link.startsWith('http')) {
    return link
  }
  return link
    .split('/')
    .filter(Boolean)
    .map(part =>
      splitByCase(part)
        .map(p => upperFirst(p))
        .join(' '),
    )
    .join(' > ')
    .replace('Api', 'API')
}

const computedTitle = computed<string>(() => title || createBreadcrumb(to))
</script>

<template>
  <ProseCallout
    :icon
    :to="to"
    :aria-label="computedTitle"
  >
    <slot mdc-unwrap="p">
      Read more in <span
        class="font-bold"
        v-text="computedTitle"
      />.
    </slot>
  </ProseCallout>
</template>
