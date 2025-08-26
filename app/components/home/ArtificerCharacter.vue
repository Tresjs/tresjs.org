<script setup lang="ts">
const { state: model, nodes } = useGLTF('/artificer/Artificer.glb')
const animations = computed(() => model.value?.animations || [])

watch(model, (newNodes) => {
  console.log(newNodes)
})

const rig = computed(() => {
  return nodes.value?.Engineer_Rig
})

const { actions } = useAnimations(animations, rig)

watch(actions, (newActions) => {
  if(!newActions) return
  newActions.Running_A?.play()
})
</script>
<template>
  <primitive v-if="rig" :object="rig" />
</template>