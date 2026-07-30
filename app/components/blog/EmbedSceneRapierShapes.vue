<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import { Physics, RigidBody } from '@tresjs/rapier'
import type { RigidBodyCollidersShape } from '@tresjs/rapier'

// Demo for the @tresjs/rapier v1 post: one body per built in collider shape,
// dropped into a box. Toggling debug draws what Rapier actually simulates.
interface Body {
  id: number
  shape: RigidBodyCollidersShape
  color: string
  position: [number, number, number]
}

const SHAPES: { shape: RigidBodyCollidersShape, color: string }[] = [
  { shape: 'ball', color: '#5672cd' },
  { shape: 'cuboid', color: '#ff5d8f' },
  { shape: 'capsule', color: '#ffd166' },
  { shape: 'cone', color: '#06d6a0' },
  { shape: 'cylinder', color: '#9b5de5' },
]

const MAX_ROUNDS = 6

const bodies = shallowRef<Body[]>([])
const isDebug = shallowRef(false)
const rounds = computed(() => bodies.value.length / SHAPES.length)

let nextId = 0

function dropRound() {
  if (rounds.value >= MAX_ROUNDS) { return }

  bodies.value = [
    ...bodies.value,
    ...SHAPES.map(({ shape, color }, index) => ({
      id: nextId++,
      shape,
      color,
      position: [
        (index - (SHAPES.length - 1) / 2) * 1.8 + (Math.random() - 0.5),
        8 + Math.random() * 3,
        (Math.random() - 0.5) * 3,
      ] as [number, number, number],
    })),
  ]
}

function reset() {
  bodies.value = []
  dropRound()
}

dropRound()
</script>

<template>
  <div class="relative h-full w-full overflow-hidden">
    <div class="absolute top-3 left-3 z-10 flex items-center gap-2 text-xs">
      <button
        type="button"
        class="cursor-pointer rounded-md bg-zinc-900/80 px-3 py-1.5 font-medium text-white backdrop-blur transition hover:bg-zinc-900 disabled:cursor-not-allowed disabled:opacity-40"
        :disabled="rounds >= MAX_ROUNDS"
        @click="dropRound"
      >
        Drop more
      </button>
      <button
        type="button"
        class="cursor-pointer rounded-md bg-zinc-900/80 px-3 py-1.5 font-medium text-white backdrop-blur transition hover:bg-zinc-900"
        @click="reset"
      >
        Reset
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
      <TresPerspectiveCamera :position="[11, 9, 15]" :look-at="[0, 1, 0]" />
      <OrbitControls :target="[0, 1, 0]" :enable-pan="false" />

      <Suspense>
        <Physics :debug="isDebug">
          <RigidBody
            v-for="body in bodies"
            :key="body.id"
            :collider="body.shape"
            :position="body.position"
            :restitution="0.35"
          >
            <TresMesh>
              <TresSphereGeometry v-if="body.shape === 'ball'" :args="[0.6, 32, 32]" />
              <TresBoxGeometry v-else-if="body.shape === 'cuboid'" :args="[1.1, 1.1, 1.1]" />
              <TresCapsuleGeometry v-else-if="body.shape === 'capsule'" :args="[0.45, 0.9, 8, 24]" />
              <TresConeGeometry v-else-if="body.shape === 'cone'" :args="[0.7, 1.4, 32]" />
              <TresCylinderGeometry v-else :args="[0.6, 0.6, 1.3, 32]" />
              <TresMeshStandardMaterial :color="body.color" />
            </TresMesh>
          </RigidBody>

          <BlogRapierArena :size="13" :height="5" />
        </Physics>
      </Suspense>

      <TresAmbientLight :intensity="0.6" />
      <TresDirectionalLight :position="[5, 10, 5]" :intensity="1.5" />
    </TresCanvas>
  </div>
</template>
