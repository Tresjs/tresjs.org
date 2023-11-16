<script setup lang="ts">
import { useTabs } from '../composables/useTabs'

const props = defineProps<{
  title: string,
  uuid: number
}>()
const { currentTab } = useTabs(props.uuid)

watch(currentTab, (value) => {
  console.log('Tab Selected', value)
})
</script>
<template>
  <div class="tab-content min-h-[455px] bg-[#24292e]" v-show="title === currentTab">
    <slot></slot>
  </div>
</template>