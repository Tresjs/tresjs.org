const state = reactive({})

export function useTabs(uuid:number) {
  if (!state[uuid]) {
    state[uuid] = {
      currentTab: 'app.vue',
    }
  }
  function setCurrentTab(tab: string) {
    state[uuid].currentTab = tab
  }
  return {
    state,
    setCurrentTab,
    currentTab: computed(() => state[uuid].currentTab),
  }
}