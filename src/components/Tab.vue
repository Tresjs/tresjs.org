<script setup lang="ts">
import { useTabs } from '../composables/useTabs'

const props = defineProps<{
  title: string,
  uuid: number
}>()
const { currentTab } = useTabs(props.uuid)

</script>
<template>
  <div class="tab-content bg-[#24292e]" v-show="title === currentTab">
    <slot></slot>
  </div>
</template>