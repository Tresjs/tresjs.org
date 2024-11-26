---
title: 'TresJS Post-processing v1'
description: 'The post-processing library for TresJS is finally here!'
pubDate: 'Oct 18 2024'
author: alvaro-saburido
heroImage: '../assets/blog/tresjs-post-processing-v1/tresjs-post-processing.png'
---

We are happy to announce that the post-processing library for TresJS just hit stable v1! 🥳🥳🥳🥳🥳. 

This new library allows you to add post-processing effects to your TresJS scenes with ease. It is built on top of the core `@tresjs/core` and it is fully compatible with the latest version v4 and three.js.

## How to use

```bash
pnpm add @tresjs/post-processing
```

And then you can start using the effects in your TresJS components:

```html
<script setup lang="ts">
  import { EffectComposer, UnrealBloom, Glitch } from '@tresjs/post-processing/three'
</script>

<template>
  <TresCanvas shadows alpha>
    <TresPerspectiveCamera 
      :args="[45," 1, 0.1, 1000] />
    <EffectComposer>
      <UnrealBloom />
      <Glitch />
    </EffectComposer>
  </TresCanvas>
</template>
```


## What in earth is post-processing?

> Post-processing is about adding effects on the final image (the render). People mostly use this technique in filmmaking, but we can do it in WebGL too.

*Source: [Three.js Journey - Post-processing](https://threejs-journey.com/lessons/post-processing#introduction)*

These effects can be anything from simple color corrections to complex effects like bloom, depth of field, visual glitches and more elaborate fancy effects (like pixelating the whole scene).

![Post-processing](../assets/blog/tresjs-post-processing-v1/tresjs-post-processing-banner.png)

The TresJS `post-processing` package leverages both the excellent work done by the pmndrs [postprocessing](https://github.com/pmndrs/postprocessing) package and native [Three.js post-processing effects](https://threejs.org/examples/?q=postprocessing#webgl_postprocessing). Providing you with an easy-to-use, Vue-centric solution that makes the developer experience (DX) smoother and more delightful.

## Available effects

The library comes with a set of built-in effects that you can use out of the box, they divide into two groups:

- Pmndrs effects
- Three.js "native" efects

### Pmndrs

Based on Poimandres incredible [postprocessing](https://github.com/pmndrs/postprocessing) library, the Pmndrs effects are a set of high-quality post-processing effects that you can use in your TresJS scenes. Some of the available effects in this first version are:

- Bloom
- DepthOfField
- Glitch
- Noise
- Glitch
- Outline
- Pixelation

Poimandres effects can be used by importing them from the `@tresjs/post-processing/pmndrs` namespace:

```html
<script setup lang="ts">
  import { EffectComposer, Glitch, Noise, Vignette } from '@tresjs/post-processing/pmndrs'
</script>

<template>
  <TresCanvas>
    <EffectComposer>
      <Glitch />
      <Noise />
      <Vignette />
    </EffectComposer>
  </TresCanvas>
</template>
```

### Three.js

The native Three.js effects are the post-processing effects based on the official Three.js [examples](https://threejs.org/examples/?q=postprocessing#webgl_postprocessing_glitch). They are a set of effects that you can use in your TresJS scenes. Some of the available effects are:

- Glitch
- Halftone
- Output
- Pixelation
- SMAA (antialiasing)
- Unreal Bloom

Three.js effects can be used by importing them from the `@tresjs/post-processing/three` namespace:

```html
<script setup lang="ts">
  import { EffectComposer, UnrealBloom, SMAA } from '@tresjs/post-processing/three'
</script>

<template>
  <TresCanvas>
    <EffectComposer>
      <UnrealBloom />
      <SMAA />
    </EffectComposer>
  </TresCanvas>
</template>
```

You might find some of the effects duplicated in both namespaces, while the effects are similar, they might have different implementations and features. We recommend you to try both and see which one fits better your needs 😊.

Too see a full list of the props and methods available for each effect, please refer to the [official documentation](https://post-processing.tresjs.org/guide/).

## Give it a try!

<video class="w-full" controls>
  <source src="/blog/tresjs-post-processing-v1/tresjs-post-processing-promo.mp4" type="video/mp4"/>
</video>

We are excited to see what you can create with the new post-processing library for TresJS. If you have any questions, feedback, or just want to share your creations, feel free to join our [Discord](https://discord.gg/tresjs) community.

Happy coding! 🚀🚀🚀🚀🚀

