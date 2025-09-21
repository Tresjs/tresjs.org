---
title: 'TresJS 3.7 - Devtools'
description: 'Check out the new features of TresjS 3.7, including the highly anticipated Vue Devtools'
date: '2024-01-30'
category: 'Release'
author: alvarosabu
thumbnail: '/blog/what-is-new-3-7-devtools/what-is-new-3-7-devtools.png'
---


TresJS 3.7 is now available! 🎉 This release includes the highly anticipated TresJS custom inspector view for Vue Devtools, as well as some new handy features like native directives like `v-distance-to`.

## How to update

::code-group
```bash [npm]
npm install @tresjs/core@latest
```
```bash [yarn]
yarn add @tresjs/core@latest
```
```bash [pnpm]
pnpm upgrade @tresjs/core --latest
```
::

## Vue Devtools

One of the most difficult things a developer faces when creating 3D experiences on the browser is debugging. The browser canvas is a black box, and it's hard to know what's going on inside. The imperative nature of ThreeJS makes it incredibly difficult to debug, having to depend on `console.log` to see what's going on, or third party to fine-tune and inspect the scene.

![debugging](../assets/blog/what-is-new-3-7-devtools/debug-3D.png)


TresJS now has a custom inspector view for Vue Devtools. This means that you can now inspect your 3D scene and components with the same ease as you would inspect a Vue component. You can see the properties of your components, as well as the scene graph and the state of the scene.

<video class="w-full" controls>
  <source src="/blog/what-is-new-3-7-devtools/official-vue-chrome-devtools.mp4" type="video/mp4"/>
</video>

## Features

### Scene Graph

The scene inspector is a tree view of the scene graph. You can see the hierarchy of the scene, as well as the components attached to each object. You can also see the memory allocation of each component.

![scene graph](../assets/blog/what-is-new-3-7-devtools/scene-graph.png)

### Component Inspector

The component inspector shows the properties of the 3D instance, it will also highlight the object in the 3D rendering. You can also see the component's state, and the component's children.

![component inspector](../assets/blog/what-is-new-3-7-devtools/component-inspector.png)

And guess what? You can also edit the properties of the component in real time! This is a great way to fine-tune your scene. 🤭

You can check the [official documentation](https://docs.tresjs.org/debug/devtools.html) to learn more about the Vue Devtools for TresJS.

### Future

This is just the beginning of the TresJS Devtools. We have a lot of ideas for the future, like a timeline, a profiler, and a lot more. This version is compatible with [the chrome extension of Vue Devtools](https://devtools.vuejs.org/) <Badge text="^6.x.x" />. 

We are currently developing a better TreJS devtools as a custom tab for the brand new [Vue Devtools Next](https://devtools-next.vuejs.org/guide/getting-started) 

This is planned to be released in the next major version `v4` of TresJS and will be similar in functionality to the current [Nuxt Devtools](/blog/tres-nuxt-devtools) 

<video class="w-full" controls>
  <source src="/blog/what-is-new-3-7-devtools/tresjs-vue-devtools-next.mp4" type="video/mp4"/>
</video>

## Native Directives

[Directives in Vue](https://vuejs.org/guide/reusability/custom-directives.html#introduction) are a great way to add reusable functionality to your components. TresJS now has some native directives that you can use in your components.

So now we have 4 Directives that we migrated from `cientos` to the core package:

### v-log

With `v-log` you can inspect your instance without the need to use template ref and watch... Just import the directive, and log what you need.

```html
<script setup lang="ts">
import { OrbitControls, Sphere, vLog } from '@tresjs/cientos'
</script>

<template>
  <TresCanvas >
    <TresPerspectiveCamera :position="[0, 2, 5]" />
    <Sphere
      ref="sphereRef"
      :scale="0.5"
      v-log:material  <!-- will print just the material 🎉 -->
    />
    <OrbitControls v-log />
  </TresCanvas>
</template>
```

Check [here](https://docs.tresjs.org/directives/v-log.html) for more info.

### v-light-helper

Also for debug purposes, `v-light-helper` aims to add the current helper for the light, this way you don't have to worry about any reference or bloated code, just import and use it with a light, and you'll get the right helper.

```html
<script setup lang="ts">
import { TresCanvas, vLightHelper } from '@tresjs/core'
import { OrbitControls, Sphere } from '@tresjs/cientos'
</script>

<template>
  <TresCanvas >
    <TresPerspectiveCamera :position="[0, 2, 5]" />
    <TresDirectionalLight
      v-light-helper
    />
    <TresPointLight
      v-light-helper
    />
    <TresSpotLight
      v-light-helper
    />
    <TresHemisphereLight
      v-light-helper
    />
  </TresCanvas>
</template>
```

Visit the [official documentation](https://docs.tresjs.org/directives/v-light-helper.html) to learn more.


### v-always-look-at

With the `v-always-look-at` as the name suggest you can force the element to always look at a point (even if this is in movement).

```html
<script setup lang="ts">
import { TresCanvas, vAlwaysLookAt } from '@tresjs/core'
import { Box } from '@tresjs/cientos'
</script>

<template>
  <TresCanvas>
    <TresPerspectiveCamera :position="[0, 2, 5]" />
    <Box
      v-always-look-at="new Vector3(0, 0, 0)"
    />
  </TresCanvas>
</template>
```

Learn more [here](https://docs.tresjs.org/directives/v-always-look-at.html)

### v-distance-to

![v-distance-to directive tresjs](../assets/blog/what-is-new-3-7-devtools/v-distance-to.png)

Have you ever tried to measure the distance between objects in threejs? Well now it's easier than ever. Just use the `v-distance-to` and you'll get the exact distance. Example:

```html
<Sphere
  ref="sphere1Ref"
  :position="[-2, slider, 0]"
  :scale="0.5"
/>
<Sphere
  v-distance-to="sphere1Ref"
  :position="[2, 0, 0]"
  :scale="0.5"
/>
```

Hope you like this new release, and stay tuned for more updates! 🚀. Tell us what do you think about this new features on [@tresjs_dev](https://twitter.com/tresjs_dev) 😊



