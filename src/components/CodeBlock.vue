<script setup lang="ts">
import { useTabs } from '../composables/useTabs'
const props = defineProps<{
  uuid: number
  tabs: string[]
}>()

const slots = defineSlots<{
  default: () => VNode[]
}>()
const { currentTab, setCurrentTab, state } = useTabs(props.uuid)
setCurrentTab(props.tabs[0])

</script>
<template>
  <div class="rounded-lg border-2 border-solid border-gray-200 dark:border-dark-500 shadow-lg dark:shadow-gray-700 w-full sm:w-2/3 overflow-hidden">
    <header class="p-2 bg-white dark:bg-dark ">
      <button 
        v-for="(tab) in tabs" 
        :key="tab" class="font-bold dark:text-light rounded text p-2 hover:bg-gray-100 dark:hover:bg-dark-500 transition-all duration-400"
        :class="{'bg-gray-100 dark:bg-dark-500 dark:text-light': currentTab === tab}"
        @click="setCurrentTab(tab)"><i class="i-logos-vue mr-2"></i>{{ tab }}
      </button>
    </header>
    <slot :current-tab="currentTab" />
  </div>
</template>