---
title: 'Rapier Physics v1'
author: [nathan-mande, jaime-bboyjt, alvarosabu]
category: release
date: 2026-07-29
description: '@tresjs/rapier hits stable v1. Declarative physics for TresJS, powered by Rapier and WASM.'
draft: true
thumbnail: /blog/tresjs-rapier-v1/tresjs-rapier-v1.png
---

Since we launched Tres some years ago, I was looking specially to the moment we release a Physics module because the big majority of games out there, needs some level of collision handling and, honestly, because a scene where nothing ever falls, bounces or bumps into anything else stops being fun very quickly.

Today that moment is here: **[`@tresjs/rapier`](https://www.npmjs.com/package/@tresjs/rapier) v1.0.0 is stable** 🎉. Declarative physics for TresJS, powered by [Rapier](https://rapier.rs/), the Rust physics engine compiled to WASM by the folks at [Dimforge](https://dimforge.com/).

:blog-embed-lab{src="https://lab.tresjs.org/experiments/rapier-object-clump/" title="Rapier object clump physics demo"}

## Getting started

::code-group
```bash [npm]
npm install @tresjs/rapier
```

```bash [yarn]
yarn add @tresjs/rapier
```

```bash [pnpm]
pnpm add @tresjs/rapier
```
::

Wrap your world in a `<Physics>` provider, mark the things that should be simulated with `<RigidBody>` and that's it, no physics loop to hand-wire, no manual syncing between the simulation and the scene graph:

```vue
<script setup lang="ts">
import { Physics, RigidBody } from '@tresjs/rapier'
</script>

<template>
  <TresCanvas>
    <Suspense>
      <Physics>
        <RigidBody collider="ball" :restitution="0.5">
          <TresMesh :position="[0, 8, 0]">
            <TresSphereGeometry />
            <TresMeshNormalMaterial />
          </TresMesh>
        </RigidBody>

        <RigidBody type="fixed">
          <TresMesh :rotation="[-Math.PI / 2, 0, 0]">
            <TresPlaneGeometry :args="[20, 20]" />
            <TresMeshBasicMaterial color="#f4f4f4" />
          </TresMesh>
        </RigidBody>
      </Physics>
    </Suspense>
  </TresCanvas>
</template>
```

::prose-note
`<Physics>` loads the Rapier WASM binary asynchronously, so it needs a `<Suspense>` boundary around it. If you are using Nuxt, the module handles the auto-imports for you.
::

## Frame-rate independent stepping

This is the change that earned the `1.0.0` more than any other. In the alpha, the simulation advanced once per rendered frame, which meant your physics behaved differently on a 60Hz laptop than on a 144Hz monitor: bodies fell faster, bounces were snappier and anything tuned on one machine felt wrong on another.

v1 steps the world on a **fixed timestep with an accumulator**. The renderer runs at whatever rate the display gives it, each frame's delta goes into an accumulator, and the world is stepped in exact `timeStep` sized chunks (`1/60` by default) as many times as fit. The delta is also clamped before it goes in, so a long hitch (a background tab, a GC pause) can't hand the solver half a second of catch-up and spiral the frame budget into the ground.

```vue
<Physics :time-step="1 / 120" :time-scale="0.5">
  <!-- slow motion, simulated at 120Hz -->
</Physics>
```

If you actually want the old behaviour, `timeStep="vary"` steps once per frame with the raw delta. It's cheaper, and fine for purely decorative physics, just don't expect two machines to agree on the outcome.

`timeStep`, `timeScale`, `pause` and `debug` are all reactive, so you can wire them straight to a UI control and tweak them at runtime.

## All the collider shapes

`<RigidBody>` derives a collider from the geometry it wraps. Pass `collider` to pick the shape:

::prose-list
- `cuboid` (default), `ball`, `capsule`, `cone`, `cylinder`
- `convexHull` for convex approximations of arbitrary meshes
- `trimesh` for exact geometry
- `heightfield` for terrain
::

::blog-rapier-demo{label="collider shapes demo"}
:blog-embed-scene-rapier-shapes
::

One body per shape, dropped into a box. Hit **Show colliders** to see the difference between the mesh you rendered and the shape Rapier is actually solving against.

When the automatic shape isn't what you want, drop in **custom colliders** as standalone components and compose several of them inside a single body:

```vue
<script setup lang="ts">
import { BallCollider, CuboidCollider, Physics, RigidBody } from '@tresjs/rapier'
</script>

<template>
  <RigidBody :collider="false">
    <CuboidCollider :args="[1, 0.5, 1]" :position="[0, 0.5, 0]" />
    <BallCollider :args="[0.5]" :position="[0, 1.5, 0]" />
    <TresMesh>
      <!-- your visual mesh, decoupled from the collision shape -->
    </TresMesh>
  </RigidBody>
</template>
```

::prose-note
Avoid `trimesh` colliders on **dynamic** bodies. They are exact but expensive, and Rapier can't compute a reliable mass distribution from them. Use `convexHull` for moving objects and keep trimeshes for static geometry.
::

## Reacting to impacts

A physics engine that you can't listen to is just an animation. `<RigidBody>` emits events for the four things you usually care about:

```vue
<script setup lang="ts">
import { RigidBody } from '@tresjs/rapier'

function onHit({ totalForceMagnitude }) {
  if (totalForceMagnitude > 50) {
    playSound('crash')
  }
}
</script>

<template>
  <RigidBody
    @collision-enter="onCollisionEnter"
    @collision-exit="onCollisionExit"
    @contact-force="onHit"
  >
    <TresMesh>
      <TresBoxGeometry />
      <TresMeshNormalMaterial />
    </TresMesh>
  </RigidBody>
</template>
```

Mark a body as a sensor and you get `intersection-enter` / `intersection-exit` instead: overlap detection without a physical response, which is what you want for trigger zones, checkpoints and pickups.

`contact-force` is the one I'm most excited about. It gives you the magnitude of the impact, so "played a soft thud" versus "shattered the crate" becomes a threshold check rather than a guess.

## Collision and solver groups

Not everything should collide with everything. Both `collisionGroups` and `solverGroups` take a bitmask, and they are separate on purpose:

::prose-list
- **`collisionGroups`** decides which pairs are even tested for contact
- **`solverGroups`** decides which pairs actually generate a physical response
::

That split is what lets you build things like a player that passes through enemies but still triggers their hitboxes.

## Joints

Six joint types ship in v1, each connecting two rigid bodies:

::prose-list
- **`RevoluteJoint`**: a hinge, for doors, wheels and levers
- **`PrismaticJoint`**: a slider along one axis
- **`SphericalJoint`**: ball-and-socket, for ragdolls and chains
- **`SpringJoint`**: elastic, with stiffness and damping
- **`RopeJoint`**: a maximum distance constraint
- **`GenericJoint`**: configure the locked axes yourself
::

Three balls hanging off a kinematic anchor, each link tied to the next with a `<SphericalJoint>`:

::blog-rapier-demo{label="joint chain demo"}
:blog-embed-scene-rapier-joints
::

```vue
<SphericalJoint
  :bodies="[anchorRef?.instance, linkRef?.instance]"
  :params="[[0, -0.7, 0], [0, 0.7, 0]]"
/>
```

`params` are the anchor points in each body's local space, so the chain hangs from the bottom of one link and the top of the next.

Scale that exact pattern up and you get a wrecking ball: a fixed pole, six dynamic links and a ball 25 times heavier than any of them, all strung together with `SphericalJoint`. Grab the ball, pull it back and let go.

:blog-embed-lab{src="https://lab.tresjs.org/experiments/rapier-wrecking-ball/" title="Rapier wrecking ball physics demo"}

Three details are what make that chain read as steel instead of rubber:

::prose-list
- `collisionGroups` and `solverGroups` on the links, so they swing through each other instead of fighting over the same space
- `setAdditionalSolverIterations(8)` on the chain bodies, because Rapier's default four iterations let a long joint chain stretch visibly
- `enableCcd` on the ball, so all that mass at speed can't tunnel straight through a brick
::

The chain links themselves are invisible ball colliders. What you see is a single `TresInstancedMesh` of torus rings, positioned along each link every frame, which is a good reminder that the simulation and the thing you render don't have to be the same object.

## Hundreds of bodies with InstancedRigidBody

Simulating a thousand individual `<RigidBody>` components means a thousand Vue components and a thousand draw calls. `<InstancedRigidBody>` pairs the simulation with a `TresInstancedMesh`, so a whole crowd of objects sharing one geometry and one material stays cheap.

```vue
<InstancedRigidBody collider="ball" :args="[0.25]" :restitution="0.5">
  <TresInstancedMesh ref="instanceRef" :args="[geometry, material, 500]" />
</InstancedRigidBody>
```

You seed the starting transforms with `setMatrixAt` like any other instanced mesh; Rapier takes over the matrix buffer from there.

## Dropping into the world with `useRapier`

Anywhere inside `<Physics>`, `useRapier()` hands you the underlying world:

```ts
import { useRapier } from '@tresjs/rapier'

const { world, rapier, isDebug, isPaused, timeStep, timeScale, step, onBeforeStep } = useRapier()

onBeforeStep((timestep) => {
  // runs once per physics substep, not per rendered frame
})
```

`useRapier()` is exported as well and is the exact same composable, so whichever name you picked up during the alpha keeps working.

::prose-note
Put your physics logic in `onBeforeStep`, not in the render loop. With a fixed timestep the two no longer run at the same rate, and applying forces from the render loop means applying them an inconsistent number of times per second.
::

And when things misbehave, `<Physics debug>` draws every collider wireframe so you can see the difference between what you rendered and what Rapier is actually simulating. It's usually a two second fix once you can see it.

## One gotcha worth repeating

Don't mutate `position` or `rotation` directly on a mesh wrapped by a dynamic `<RigidBody>`. Rapier owns those transforms, and writing to them fights the solver: you'll get teleporting, jitter, or bodies tunnelling through the floor. Use forces, impulses, or a kinematic body type if you need direct control.

## Resources

::prose-list
- **[rapier.tresjs.org](https://rapier.tresjs.org/)**: the full `@tresjs/rapier` reference, every component and every prop
- **[rapier.rs](https://rapier.rs/)**: the engine underneath. Worth a read whenever you need something we don't wrap yet, since `useRapier()` gives you the raw world anyway
- **[Object clump](https://lab.tresjs.org/experiments/rapier-object-clump/)**: the one at the top of this post. Forty instanced spheres pulled toward the centre, with a kinematic body following your pointer to shove them around
- **[Wrecking ball](https://lab.tresjs.org/experiments/rapier-wrecking-ball/)**: a six link `SphericalJoint` chain and a very heavy ball, against a wall you can resize
- **[Car](https://lab.tresjs.org/experiments/rapier-car/)**: Rapier's own `DynamicRayCastVehicleController`, driven from `useRapier()` inside `onBeforeStep`
::

## Thanks

This release exists because of [Nathan Mande](https://github.com/Neosoulink) and [Jaime Torrealba](https://github.com/JaimeTorrealba) who did the heavy lifting on colliders, joints and the reactivity work that makes all of this feel like Vue instead of like a physics API with a Vue costume on. 🙌

Full release notes are on [GitHub](https://github.com/Tresjs/tres/releases/tag/%40tresjs%2Frapier%401.0.0) and the docs live at [rapier.tresjs.org](https://rapier.tresjs.org).

Now go make something fall over. Share it with us on [Discord](https://discord.gg/tresjs), we want to see it 🚀.
