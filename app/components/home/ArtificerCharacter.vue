<script setup lang="ts">
import type { Bone, Object3D, SkinnedMesh } from 'three'

const { state: model, nodes } = useGLTF('/artificer/Artificer.glb')
const animations = computed(() => model.value?.animations || [])

const { state: weapon } = useGLTF('/artificer/Artificer_Wrench.glb')

const findBoneByName = (object: Object3D, name: string): Bone | null => {
  let bone: Bone | null = null
  
  object.traverse((child) => {
    if (child.type === 'SkinnedMesh') {
      const skinnedMesh = child as SkinnedMesh
      bone = skinnedMesh.skeleton.bones.find(b => b.name === name) || null
    }
  })
  
  return bone
}

const rig = computed(() => {
  return nodes.value?.Engineer_Rig
})

watch((rig), (newRig) => {
  if (!newRig || !weapon.value) return
  
  const rightHandBone = findBoneByName(newRig, 'handslotr')
  if (rightHandBone) {
    rightHandBone.add(weapon.value.scene)
    weapon.value.scene.position.set(0, 0, 0)
    weapon.value.scene.rotation.set(0, Math.PI / 3, 0)
    weapon.value.scene.scale.set(1, 1, 1)
  }
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