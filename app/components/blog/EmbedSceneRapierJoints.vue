<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import { Physics, RigidBody, SphericalJoint } from '@tresjs/rapier'
import type { ExposedRigidBody } from '@tresjs/rapier'

// Demo for the @tresjs/rapier v1 post: a three link chain hanging off a
// kinematic anchor, each link tied to the next by a <SphericalJoint>.
const GAP = 1.4
const ANCHOR_Y = 5

const anchorRef = shallowRef<ExposedRigidBody | null>(null)
const linkARef = shallowRef<ExposedRigidBody | null>(null)
const linkBRef = shallowRef<ExposedRigidBody | null>(null)
const linkCRef = shallowRef<ExposedRigidBody | null>(null)
// Colliders on by default: the joint anchors only make sense once you can see the
// shapes they connect.
const isDebug = shallowRef(true)

// Local anchors: bottom of the upper body, top of the lower one.
const jointParams: [[number, number, number], [number, number, number]] = [
  [0, -GAP / 2, 0],
  [0, GAP / 2, 0],
]

// An auto derived ball collider sits exactly on the mesh surface, and the debug
// lines are depth tested, so solid meshes hide their own wireframe. Fade the
// bodies while debug is on to make the colliders and joint anchors visible.
const bodyMaterial = computed(() => ({
  transparent: isDebug.value,
  opacity: isDebug.value ? 0.35 : 1,
}))

function swing() {
  const tail = linkCRef.value?.instance
  if (!tail) { return }
  tail.applyImpulse({ x: 18, y: 4, z: (Math.random() - 0.5) * 12 }, true)
}
</script>

<template>
  <div class="relative h-full w-full overflow-hidden">
    <div class="absolute top-3 left-3 z-10 flex items-center gap-2 text-xs">
      <button
        type="button"
        class="cursor-pointer rounded-md bg-zinc-900/80 px-3 py-1.5 font-medium text-white backdrop-blur transition hover:bg-zinc-900"
        @click="swing"
      >
        Give it a push
      </button>
      <button
        type="button"
        class="cursor-pointer rounded-md bg-zinc-900/80 px-3 py-1.5 font-medium text-white backdrop-blur transition hover:bg-zinc-900"
        @click="isDebug = !isDebug"
      >
        {{ isDebug ? 'Hide' : 'Show' }} colliders
      </button>
    </div>

    <TresCanvas clear-color="#82DBC5">
      <TresPerspectiveCamera :position="[1, 3.2, 9]" :look-at="[0, 3, 0]" />
      <OrbitControls :target="[0, 3, 0]" :enable-pan="false" />

      <Suspense>
        <Physics :debug="isDebug">
          <RigidBody ref="anchorRef" type="kinematic" :position="[0, ANCHOR_Y, 0]">
            <TresMesh>
              <TresBoxGeometry :args="[1, 0.5, 1]" />
              <TresMeshStandardMaterial color="#f4f4f4" v-bind="bodyMaterial" />
            </TresMesh>
          </RigidBody>

          <RigidBody ref="linkARef" collider="ball" :position="[0, ANCHOR_Y - GAP, 0]">
            <TresMesh>
              <TresSphereGeometry :args="[0.5, 32, 32]" />
              <TresMeshStandardMaterial color="#5672cd" v-bind="bodyMaterial" />
            </TresMesh>
          </RigidBody>

          <RigidBody ref="linkBRef" collider="ball" :position="[0, ANCHOR_Y - GAP * 2, 0]">
            <TresMesh>
              <TresSphereGeometry :args="[0.5, 32, 32]" />
              <TresMeshStandardMaterial color="#5672cd" v-bind="bodyMaterial" />
            </TresMesh>
          </RigidBody>

          <RigidBody ref="linkCRef" collider="ball" :position="[0, ANCHOR_Y - GAP * 3, 0]" :restitution="0.4">
            <TresMesh>
              <TresSphereGeometry :args="[0.5, 32, 32]" />
              <TresMeshStandardMaterial color="#ff5d8f" v-bind="bodyMaterial" />
            </TresMesh>
          </RigidBody>

          <SphericalJoint :bodies="[anchorRef?.instance, linkARef?.instance]" :params="jointParams" />
          <SphericalJoint :bodies="[linkARef?.instance, linkBRef?.instance]" :params="jointParams" />
          <SphericalJoint :bodies="[linkBRef?.instance, linkCRef?.instance]" :params="jointParams" />

          <BlogRapierArena :size="16" :height="3" />
        </Physics>
      </Suspense>

      <TresAmbientLight :intensity="0.6" />
      <TresDirectionalLight :position="[5, 10, 5]" :intensity="1.5" />
    </TresCanvas>
  </div>
</template>
