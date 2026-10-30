---
title: "The Loop Chronicles: October 2026 Recap"
author: alvarosabu
category: updates
date: 2026-10-29
description: WebGPU gets its own entry in TresJS! A recap of October 2026 - @tresjs/core 5.10, TSL ports in Cientos, N8AO ambient occlusion and two TresJS talks at Vue Fes Japan 2026.
draft: false
thumbnail: /blog/whats-new-october-2026/the-loop-chronicles-october-2026.png
---

Yo! Welcome back to **The Loop Chronicles** 🎃 👻. This edition comes to you from Tokyo 🗼. October was a big month: TresJS was on stage **twice** at Vue Fes Japan 2026, and WebGPU stopped being a setup trick and became a proper entry point in `@tresjs/core@5.10`, `@tresjs/cientos@5.10` and `@tresjs/nuxt@5.8`. Let's go 🚀.

## TresJS at Vue Fes Japan 2026

![TresJS at Vue Fes Japan 2026](/blog/whats-new-october-2026/vuefes-japan-2026.png)

[Vue Fes Japan 2026](https://vuefes.jp/2026/en) took place on October 24 at Otemachi Place in Tokyo. Two of the talks were about TresJS, and for us that is a dream come true 🇯🇵.

### Spatial Computing, Written in Vue

:magic-link{label="Shingo Hiranuma" to="https://github.com/hiranuma"} ([@mistorun](https://x.com/mistorun)), CTO at GENEROSITY inc., gave [**Spatial Computing with Vue: Frontend Development for XR Devices Using TresJS and WebXR**](https://vuefes.jp/2026/en/speaker/hiranuma).

The idea: you can build spatial computing apps for devices like the Meta Quest 3 and the Samsung Galaxy XR with the Vue Composition API you already know. No new framework to learn. Shingo showed implementation patterns for XR frontends with Vue, TresJS and WebXR:

::prose-list
- Gaze and gesture interaction
- Declarative scene construction
- Support for both hand tracking and controllers
- Physics engine integration
::

With glasses-type devices like XREAL Project Aura and Snap Specs arriving this fall, this talk is a great map of where Vue can go next. The slides are available in [English](https://speakerdeck.com/hiranuma/spatial-computing-written-in-vue-front-end-development-for-xr-devices-with-tresjs-and-webxr) and in [Japanese](https://speakerdeck.com/hiranuma/vue-de-kaku-kuukan-tresjs-to-webxr-o-tsukata-xr-debaisu-no-furonto-endo-kaihatsu). Thank you, Shingo, for taking TresJS into XR 🥽🙌.

### How I recreated the Vue Fes Japan 2025 website using TresJS and TSL

Later that afternoon, I gave [**How I recreated Vue Fes Japan 2025 website using TresJS and TSL (WebGPU)**](https://vuefes.jp/2026/en/speaker/alvarosabu).

The Vue Fes Japan 2025 website had a beautiful hero: a V-shaped cone for Vue and a sphere for the Hinomaru of the Japanese flag, both masked with a *suminagashi* shader. Suminagashi is a Japanese ink-marbling technique that is hundreds of years old. The original scene was made with raw Three.js r178 by the **Vue Fes Japan 2025 team**, and all credit for the design goes to them.

In the talk, I showed how I ported that scene to Vue with TresJS components, and how I moved the GLSL shader to TSL on top of WebGPU. We went through the FBM noise that flows through warped vector fields, the ink bands, and the color palettes that change over time.

:blog-embed-lab{src="https://lab.tresjs.org/experiments/vuefes-japan-2025/" title="Vue Fes Japan 2025 hero demo"}

The live demo is in the [lab](https://lab.tresjs.org/experiments/vuefes-japan-2025/).

::read-more{to="https://vuefesjapan-2026.alvarosabu.dev/" title="Vue Fes Japan 2026 slides" icon="i-lucide-presentation"}
See the **slides** of the talk.
::

A big thank you to the [Vue.js Japan User Group](https://github.com/vuejs-jp) and all the Vue Fes Japan staff and volunteers. The event was organized with so much care, and the community made us feel at home ありがとうございます 🙏.

## WebGPU gets its own entry

The headline of this release. Until now, you had to pass a renderer factory to `TresCanvas` and `extend()` the node classes yourself to use WebGPU. In `@tresjs/core@5.10.0`, you change one import ([#1543](https://github.com/Tresjs/tres/pull/1543)):

```vue
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core/webgpu'
import { color, mix, positionLocal, sin, time } from 'three/tsl'

const colorNode = mix(
  color('#82dbc5'),
  color('#fbb03b'),
  sin(time.add(positionLocal.y.mul(4))).mul(0.5).add(0.5),
)
</script>

<template>
  <TresCanvas>
    <TresPerspectiveCamera :position="[3, 3, 3]" :look-at="[0, 0, 0]" />
    <TresMesh>
      <TresTorusKnotGeometry :args="[0.6, 0.2, 128, 32]" />
      <TresMeshStandardNodeMaterial :color-node="colorNode" :roughness="0.3" />
    </TresMesh>
    <TresDirectionalLight :position="[3, 5, 2]" />
  </TresCanvas>
</template>
```

What `@tresjs/core/webgpu` gives you:

::prose-list
- **A `TresCanvas` that creates a `WebGPURenderer`.** It passes `antialias`, `alpha`, `depth`, `stencil`, `powerPreference` and `logarithmicDepthBuffer` to the renderer. The `renderer` prop is still there for other options.
- **Node materials as tags.** The entry adds every class of `three/webgpu` to the catalogue, so `<TresMeshStandardNodeMaterial>` works with no `extend()`. The tags and their props are typed.
- **A typed `useTres()`.** `renderer` is a `WebGPURenderer`, so `renderer.backend` needs no cast.
- **No `WebGLRenderer` in your bundle.** An app that imports only from `@tresjs/core/webgpu` does not ship the WebGL renderer ([#1544](https://github.com/Tresjs/tres/pull/1544)).
::

The root entry `@tresjs/core` does not change. Its `TresCanvas` still uses `WebGLRenderer`, and a build check fails if the root entry can reach `three/webgpu` or `three/tsl`. When the browser has no WebGPU, `WebGPURenderer` falls back to its WebGL2 backend, and node materials still work.

The same release fixes a bug that made TSL feel broken: patching a node prop such as `colorNode` now recompiles the node material ([#1540](https://github.com/Tresjs/tres/pull/1540)). Before, the renderer kept the old pipeline and nothing changed on screen. `isNode` and `isNodeMaterial` are new public exports.

Everything is in the [WebGPU guide](https://docs.tresjs.org/api/advanced/web-gpu).

### Cientos speaks TSL

`@tresjs/cientos/webgpu` has the same names and props as the root entry, so you only change the import path:

```ts
import { TresCanvas } from '@tresjs/core/webgpu'
import { OrbitControls, Sparkles, Stars } from '@tresjs/cientos/webgpu'
```

Components that used GLSL in the root entry are now **TSL ports** in the WebGPU entry. `WebGPURenderer` compiles them to WGSL, or to GLSL on the WebGL2 fallback:

::prose-list
- `Grid`, `Outline`, `Html` and `Image`
- `Sparkles`, `Stars` and `Precipitation`
- `HolographicMaterial`, `MeshGlassMaterial`, `MeshWobbleMaterial`, `MeshDiscardMaterial` and `PointMaterial`
::

WebGPU draws `Points` at 1 pixel only, so `Sparkles`, `Stars` and `Precipitation` render one instanced `Sprite` with `PointsNodeMaterial` in their WebGPU versions.

Some components are not ported yet: the ones that write GLSL with render targets (`ContactShadows`, `MeshTransmissionMaterial`, `MeshPortalMaterial`...), the line components, and the ones built on three-stdlib shaders (`Sky`, `Reflector`, `Stage`...). If you import one of them from `@tresjs/cientos/webgpu`, the build and the type check fail and name the component. If you use one from the root entry on a WebGPU canvas, cientos logs one warning that names it. TSL versions will come one by one. The full list is in the [Cientos WebGPU guide](https://cientos.tresjs.org/getting-started/webgpu).

::prose-note
`@tresjs/cientos/webgpu` needs `three` r171 or newer and `@tresjs/core` 5.10 or newer. The root entry still supports `three` r133 and newer.
::

### Nuxt: one option

`@tresjs/nuxt@5.8.0` has a new `renderer` option ([#1527](https://github.com/Tresjs/tres/pull/1527)):

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  modules: ['@tresjs/nuxt'],
  tres: {
    renderer: 'webgpu',
  },
})
```

With it, `<TresCanvas>`, `useTres()` and the cientos components are auto-imported from the `/webgpu` entries. A cientos component with no WebGPU version yet still resolves, but it throws an error that names it when it mounts, instead of Vue's generic "Failed to resolve component". `@tresjs/post-processing` is not auto-imported in this mode, because its effects work only with `WebGLRenderer`, and the module tells you so.

## N8AO ambient occlusion

`@tresjs/post-processing@3.10.0` adds [N8AO](https://github.com/N8python/n8ao), the screen-space ambient occlusion pass by [N8python](https://github.com/N8python) ([#1518](https://github.com/Tresjs/tres/pull/1518)). AO darkens corners, crevices and the contact areas below objects, so flat scenes get depth. It comes in both families:

::prose-list
- [`<N8AOPmndrs />`](https://post-processing.tresjs.org/api/pmndrs/n8ao) for `<EffectComposerPmndrs>`
- [`<N8AO />`](https://post-processing.tresjs.org/api/three/n8ao) for the three family `<EffectComposer>`
::

```vue
<Suspense>
  <EffectComposerPmndrs :multisampling="0">
    <N8AOPmndrs :ao-radius="2" :intensity="3" />
    <SMAAPmndrs />
  </EffectComposerPmndrs>
</Suspense>
```

Every prop is reactive, and `renderMode` gives you debug views, including a split view with and without AO. Hardware multisampling does not work with AO, so add `<SMAAPmndrs />` or `<FXAAPmndrs />` after the pass. The [Rapier Object Clump](https://lab.tresjs.org/experiments/rapier-object-clump/) experiment in the lab now uses the package component.

## Fixes worth knowing about

### Core

::prose-list
- **Awaiting `useLoader` returns everything** ([#1548](https://github.com/Tresjs/tres/pull/1548)). `await useGLTF(...)`, or any loader built on `useLoader`, resolved with a partial object and dropped `nodes`, `materials`, `load` and `progress`. Now `const { state, nodes } = await useGLTF('/model.glb')` works as you would expect.
- **On-demand scenes stay idle after a prop update** ([#1499](https://github.com/Tresjs/tres/pull/1499)). A component that created a fresh position array could make an on-demand scene render again and again.
- **No devtools in production** ([#1498](https://github.com/Tresjs/tres/pull/1498)). `TresCanvas` registered the devtools in production builds too, and their performance monitor walked the scene even with on-demand rendering.
- **`PCFShadowMap` on WebGPU** ([#1508](https://github.com/Tresjs/tres/pull/1508)). three r186 removed `PCFSoftShadowMap` from `WebGPURenderer` and logged a warning on every WebGPU scene with shadows. From r186, `PCFShadowMap` is the default on WebGPU too, and it is already soft there, so you lose no quality.
::

The first two fixes come from [Felix Schwämmle](https://github.com/felixschwamm), in their first contributions to TresJS, with a reproduction test for each. Welcome, Felix 🎉!

### Cientos

`PointMaterial` converted its color to sRGB twice ([#1539](https://github.com/Tresjs/tres/pull/1539)). `color="#ffa500"` rendered yellow, now it renders orange.

::prose-note
This changes how existing scenes look: dots are darker and more saturated, the same as with `PointsMaterial`. If you tuned your colors for the old look, check them again.
::

### Rapier

`@tresjs/rapier@1.1.3` brings two fixes:

::prose-list
- **Custom colliders sit on their body** ([#1515](https://github.com/Tresjs/tres/pull/1515)). A `<CapsuleCollider>` inside a `<RigidBody>` with a `position` got the body offset twice, and a collider `position` was read as a world position. Collider `position` and `rotation` are now offsets from the body, as the types say. If you used world values to work around this, your colliders will move.
- **`<Physics debug>` lines are visible** ([#1514](https://github.com/Tresjs/tres/pull/1514)). They were almost black, and colliders inside a mesh did not show. They now draw on top in Rapier's colors.
::

### Tres Leches

Better dark mode contrast for folders and inputs ([#1517](https://github.com/Tresjs/tres/pull/1517)), slot content that stays visible when the panel height changes ([#1523](https://github.com/Tresjs/tres/pull/1523)), and a collapsed panel that keeps its size when the window resizes ([#1546](https://github.com/Tresjs/tres/pull/1546)).

## Everything in sync

The family moved together on October 6, October 22 and again on October 28. These are the latest:

::prose-list
- **`@tresjs/core@5.10.1`**
- **`@tresjs/cientos@5.10.1`**
- **`@tresjs/nuxt@5.8.1`**
- **`@tresjs/post-processing@3.11.1`**
- **`@tresjs/rapier@1.2.1`**
- **`@tresjs/leches@1.3.3`**
::

```bash
pnpm up @tresjs/core @tresjs/cientos @tresjs/nuxt @tresjs/post-processing @tresjs/rapier @tresjs/leches
```

### 👉 Full Release Notes

::read-more{to="https://github.com/Tresjs/tres/releases" title="Full Release Notes" icon="i-lucide-scroll-text"}
::

## From the community

<!-- TODO(alvaro): add 3-5 verified community projects from October 2026 (Discord #showcase, X, Bluesky). Verify authorship and originality before featuring, see June post for the :magic-link format. -->

## Thanks

Thank you to [Shingo Hiranuma](https://github.com/hiranuma) for bringing TresJS to XR devices on the Vue Fes stage, to the Vue Fes Japan 2025 team for the design that inspired my talk, to the [Vue.js Japan User Group](https://github.com/vuejs-jp) for an amazing conference, to [Felix Schwämmle](https://github.com/felixschwamm) for their first two core fixes, and to [N8python](https://github.com/N8python) for N8AO. And thanks to everyone who opened an issue this month 🙌.

## Coming next: TSL composables

`/webgpu` is the foundation. The next step is in review: a set of **experimental TSL composables** for `@tresjs/core/webgpu` ([#1545](https://github.com/Tresjs/tres/pull/1545)).

::prose-list
- **`useUniforms` and `useUniform`** bind plain values, refs, getters or Tres Leches controls to TSL uniforms. A change writes `uniform.value` with no shader recompile, and requests a frame in on-demand mode.
- **`useNodes` and `useLocalNodes`** share node graphs between components in the same canvas.
- **`useRenderPipeline`** renders the canvas through three's `RenderPipeline`, for post-processing on WebGPU.
::

The API can still change, so watch the PR. If you have a TSL use case you want us to cover, [tell us](https://github.com/Tresjs/tres/issues).

Got something cool built with Tres? Share it in our [Discord](https://discord.gg/UCr96AQmWn). It might headline the next *Loop Chronicles*.

Happy crafting ✌️.
