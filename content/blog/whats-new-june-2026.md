---
title: "The Loop Chronicles: June 2026 Recap"
author: alvarosabu
category: updates
date: 2026-06-30
description: Physics lands in TresJS! A recap of June 2026 - the first alpha of @tresjs/rapier, transmission materials and more.
draft: false
thumbnail: /blog/whats-new-june-2026/the-loop-chronicles-june-2026.png
---

Yo! Welcome to the first edition of **The Loop Chronicles**, our monthly pass through everything that landed across the TresJS ecosystem. And what a month to kick things off: June 2026 brought *physics* to the scene graph. Let's dive in 🤿.

## Rapier Physics has entered the scene

The big one. We shipped the **first alpha of [`@tresjs/rapier`](https://www.npmjs.com/package/@tresjs/rapier)**: declarative physics for TresJS, powered by [Rapier](https://rapier.rs/) and its official `@dimforge/rapier3d-compat` WASM bindings.

No more hand-wiring a physics loop. Wrap your world in a `<Physics>` provider, drop in some `<RigidBody>` and let the simulation do the rest:

```vue
<script setup lang="ts">
import { Physics, RigidBody } from '@tresjs/rapier'
</script>

<template>
  <TresCanvas>
    <Physics>
      <RigidBody>
        <TresMesh>
          <TresBoxGeometry />
          <TresMeshNormalMaterial />
        </TresMesh>
      </RigidBody>

      <RigidBody type="fixed">
        <TresMesh :rotation="[-Math.PI / 2, 0, 0]">
          <TresPlaneGeometry :args="[10, 10]" />
        </TresMesh>
      </RigidBody>
    </Physics>
  </TresCanvas>
</template>
```

Here it is in action: a clump of rigid bodies pulled toward a center point, colliding and jostling in real time. Move your mouse around to push them.

:blog-embed-lab{src="https://lab.tresjs.org/experiments/rapier-object-clump/" title="Rapier object clump physics demo"}

What's in the box for `1.0.0-alpha.0`:

::prose-list
- **`<Physics>`** **provider** with `RigidBody`, automatic **and** custom colliders, and joints
- **Full collider shapes** support: cuboids, balls, capsules, trimeshes and friends
- **Collision events** and **contact force events** so you can react when things actually hit
- **`collisionGroups`** **and** **`solverGroups`** for fine-grained filtering of what collides with what
- **`useRapierContext`** to reach into the physics world from your own composables
- Smarter collider position & rotation handling, plus extra `RigidBody` props
::

::prose-note
This package is in **alpha**, so the API isn't stable yet and breaking changes can land between releases without a major bump. Install with `pnpm add @tresjs/rapier@alpha` and pin the exact version. Docs live at [rapier.tresjs.org](https://rapier.tresjs.org).
::

Huge thanks to [Jaime Torrealba](https://github.com/JaimeTorrealba) and [Nathan Mande](https://github.com/Neosoulink) for pushing this one over the line 🙌.

## New features landed in Cientos

Cientos `@tresjs/cientos@5.8.1` got a few genuinely fun additions this month.

### `Decal`


::embed-scene
:blog-embed-scene-decal
::

Technically this one slipped in on **May 28**, but it's too good to leave on the cutting-room floor. The new **`Decal`** abstraction projects a flat texture onto the surface of a mesh, conforming to its geometry instead of sitting flat like a plane. Stickers, logos, bullet holes, labels: stamp them right onto your models.

```vue
<script setup lang="ts">
import { Decal, DecalDebugUI, useGLTF, useTextures } from '@tresjs/cientos'

// A palette of stickers to stamp onto the mesh
const { textures } = useTextures([
  '/decal/tresjs-dark.png',
  '/decal/vue.png',
  '/decal/threejs.png',
])

const { nodes } = useGLTF('/models/Mug.glb', { draco: true })

// Decals serialize to plain JSON via v-model:data
const decals = reactive([
  { id: 'logo', position: [-0.9, 2, 0.4], orientation: [0, -1.1, 0], size: [0.9, 0.2, 1], zIndex: 0, map: 'tresjs-dark.png' },
])

const decalRef = ref()
const session = computed(() => decalRef.value?.editor ?? null)
</script>

<template>
  <!-- Drop-in editor: place, rotate, scale, layer, undo/redo -->
  <DecalDebugUI :session="session" :textures="textures ?? []" :data="{ mug: decals }" />

  <primitive :object="nodes.Mug">
    <Decal ref="decalRef" v-model:data="decals" :map="textures" editable />
  </primitive>
</template>
```


It does more than stamp-and-forget: multiple decals stack with z-layering, layouts serialize to plain JSON via `v-model:data`, and an `editable` mode plus `DecalDebugUI` give you an in-canvas editor to place and tweak decals by hand (with undo/redo). See the [Decal docs](https://cientos.tresjs.org/api/abstractions/decal.html) for the full editor workflow.

### `MeshTransmissionMaterial`

That gorgeous glass / frosted look, with thickness, roughness and chromatic aberration, is now one component away ([#1436](https://github.com/Tresjs/tres/pull/1436)).

::embed-scene
:blog-embed-scene-transmission
::

### A sharper `Environment`

The new **`quality` prop** ([#1418](https://github.com/Tresjs/tres/issues/1418)) lets you serve **2k or 4k** preset HDRs depending on how crisp (or how light) you need your reflections. We also fixed `Environment url` reactivity and cleaned up the docs demo ([#1407](https://github.com/Tresjs/tres/issues/1407)).

### More reliable `PointerLockControls`

`PointerLockControls` got its event-listener logic refactored for more dependable lock/unlock handling.

Thanks to Alfarish Fizikri, [Jaime Torrealba](https://github.com/JaimeTorrealba) and everyone who reviewed and tested these.

## Everything in sync

To keep the ecosystem aligned, we also rolled out matching releases for the rest of the family:

::prose-list
- **`@tresjs/cientos@5.8.1`**
- **`@tresjs/post-processing@3.7.4`**
- **`@tresjs/nuxt@5.6.3`**
::

Updating is the usual one-liner. Bump them together and you're good:

```bash
pnpm up @tresjs/core @tresjs/cientos @tresjs/post-processing @tresjs/nuxt
```

## From the community

The best part of any month is seeing what you all ship. Here's a handful of things built with TresJS that caught our eye 👀:

::prose-list
- :magic-link{label="ChanIok" to="https://github.com/ChanIok"} built :magic-link{label="BuildingMomo" to="https://build.infinitymomo.com"}, a visual home-design editor for *Infinity Nikki* that lets players move, copy and merge whole building clusters in 3D. Easily the most ambitious thing we saw this month.
- :magic-link{label="Akshara Hegde" to="https://github.com/aksharahegde"} shipped :magic-link{label="usb-tressa" to="https://usb-tressa.vercel.app"}, an interactive USB-connector showcase with product, exploded and wireframe views, all in Nuxt + Tres.
- :magic-link{label="Lucie Haberer" to="https://github.com/lihbr"} released :magic-link{label="Farbe Films" to="https://nuxt-starter-prismic-farbe.vercel.app"}, an open 3D e-commerce starter for Nuxt + Prismic with real-time product rendering and scroll-driven motion, built on `@tresjs/nuxt`.
- :magic-link{label="lumixraku" to="https://github.com/lumixraku"} made an :magic-link{label="interactive 3D periodic table" to="https://3d-periodic-table-liart.vercel.app"}: click an element to dive into its atomic structure, then explore compounds as ball-and-stick molecules.
- :magic-link{label="Vasileios Varveroglou" to="https://github.com/VarveroglouVasileios"} built a :magic-link{label="3D portfolio" to="https://varveroglouvasileios.github.io"} where projects and social links float in an interactive universe, reacting to your cursor with GSAP-driven motion.
::

## See you next month

Physics is the headline, but it's just the start. The rapier API will keep evolving through alpha, so jump in early, break things, and [tell us what hurts](https://github.com/Tresjs/tres/issues). Your feedback shapes where it lands for `1.0.0`.

Got something cool built with Tres? Share it in our [Discord](https://discord.gg/UCr96AQmWn). It might headline the next *Loop Chronicles*.

Happy 3D ✌️.
