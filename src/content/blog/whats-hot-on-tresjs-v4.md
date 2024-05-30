---
title: What's hot in TresJS v4 🔥
description: The biggest version of TresJS is here! 🎉
pubDate: May 29 2024
author: alvaro-saburido
heroImage: '../assets/blog/whats-hot-v4/tresjs-v4.png'
---



TresJS v4 is the biggest version of TresJS yet! 🎉 We are super excited to show you all the new features we have stored for you in this new major version

The truth is, after 1 year of life, TresJS has grown a lot and we have learned a lot from the community and the users. 

We recollected feedback, A LOT of it:

- Performance issues 😅
- On-demand rendering 👀
- Type issues after ThreeJS v156 🥲
- Memory Leak on route change 🫠
- Events propagation issues 🤯
- Event handlers on `primitives` 🫣
- Please add a take-over render loop mode
- Lot of issues with current loop approach.

And we have been working hard to solve all of them.

# What's hot in TresJS v4

- On-demand Rendering 
- Refactored Event Store and Propagation logic
- Added event handlers to primitives
- `object` prop on primitives is now reactive.
- Better disposal of resources for memory management
- New approach for the render and update loops
- A LOT of bug fixes and improvements

## On-demand Rendering

Until now, the render loops **always** render.

The `renderMode` prop has been added: 

- `on-demand` will automatically invalidate the frame on:
   - Instances prop changes
   - Context state change (resize, clearColor etc)
   - remove nodes (v-if)


```html
<TresCanvas
  render-mode="on-demand"
  clear-color="#82DBC5"
  @render="onRender"
>
```

<video class="w-full" controls>
  <source src="/blog/whats-hot-v4/on-demand-rendering.mp4" type="video/mp4"/>
</video>


Since it is not really possible to observe all the possible changes in your application, you can also manually invalidate the frame by calling the `invalidate()` method from the `useTres` composable:

```ts
import { useTres } from '@tresjs/core'

const boxRef = ref()
const { invalidate } = useTres()

watch(boxRef.value, () => {
  boxRef.value.position.x = 1
  invalidate()
})
```

## Mode manual

If you want to have full control of when the scene is rendered, you can set the render-mode prop to manual:

```html
<TresCanvas render-mode="manual">
  <!-- Your scene goes here -->
</TresCanvas>
```

In this mode, Tres will not render the scene automatically. You will need to call the `advance()` method from the `useTres` composable to render the scene:

```html
<script setup>
import { useTres } from '@tresjs/core'

const { advance } = useTres()

onMounted(() => {
  advance()
})
</script>
```

## Refactored Event Store and Propagation logic

We have refactored the event store and propagation logic to make it more efficient and reliable.The following pointer events are available on `v3` and previous:

- `click`
- `pointer-move`
- `pointer-enter`
- `pointer-leave`

From `v4.x` on, the following pointer events are been added to the list:

- `context-menu` (right click)
- `double-click`
- `pointer-down`
- `pointer-up`
- `wheel`
- `pointer-missed`

### Event bubbling 🫧

![](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZmdlajBqejNiNDNtbDJvOWh6MjBsZDR2OGJoZ2x2Zjd3b3VwZ3AzNyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l3q2P2l54336ew5iM/giphy.gif)

The event bubbling is now available in TresJS. You can stop the event propagation by calling the `stopPropagation` method from the event object:

```html
<TresMesh
  @click="(event) => {
    console.log('click')
    event.stopPropagation()
  }"
/>
```

<video class="w-full" controls>
  <source src="/blog/whats-hot-v4/event-bubbling.mp4" type="video/mp4"/>
</video>

## Primitives enhancements

You can now add event handlers to primitives, specially usefull to add pointer events to models:

```html
<script setup>
import { useGLTF } from '@tresjs/cientos'

const { scene: model } = await useGLTF(
  'models/ugly-bunny.gltf',
)
function handleClick(ev) {
  console.log('clicked', ev)
}
</script>

<template>
  <primitive 
    :object="model"
    @click="handleClick"
  />
</template>
```

### Reactive `object` prop

```html {2|7}
<script setup>
const isCube = ref(false)
</script>

<template>
  <primitive 
    :object="isCube ? CubeModel : AkuAkuModel" 
  />
</template>
```

### Conditionally render primitives

You can now conditionally render primitives using vue `v-if` directive.

```html {2|7}
<script setup>
const isVisible = ref(false)
</script>

<template>
  <primitive 
    v-if="isVisible" 
    :object="CubeModel" 
  />
</template>
```

## Memory management

- Automatic disposal of resources when the component is unmounted.
- Manual `dispose` utility method to dispose of resources manually (primitives)
- Frees `CPU` and `GPU` memory.


## Render and Update loops

Until `v4` the render and update loops were managed by the [useRenderLoop composable](https://docs.tresjs.org/api/composables.html#userenderloop). This approach covered most of the basic usecases but it was not enough for more complex scenarios:

- Since is a global composable, multiple canvas would share the same loop.
- The loop was not bounded to the context of the canvas.
- Pause and resume was availablle but not working as expected.
- No way to control the loop from the outside.
- No way to have multiple loops in the same canvas. No posibility to prioritize order of execution.
- No take-over mode for the render loop.

In `v4` we have introduce a new composable called `useLoop` that will allow you to have full control of the loop:

```html
<script setup>
import { useLoop } from '@tresjs/core'

const boxRef = ref()

const { onBeforeRender } = useLoop()

onBeforeRender(({ delta }) => {
  boxRef.value.rotation.y += delta
})
</script>

<template>
  <TresMesh ref="boxRef">
    <TresBoxGeometry />
    <TresMeshBasicMaterial color="teal" />
  </TresMesh>
</template>
```

The callback function will be triggered just before a frame is rendered and it will be deregistered automatically when the component is destroyed.

#### Take over the render loop

You can take over the render call by using the `render` method.

```ts
const { render } = useLoop()

render(({ renderer, scene, camera }) => {
  renderer.render(scene, camera)
})
```

<div class="bg-yellow-200 text-yellow-700 p-4 rounded">
<i class="i-carbon-warning-alt"></i>
Consider that if you take over the render loop, you will need to manually render the scene and take care of features like the conditional rendering yourself.
</div>

#### Register after render callbacks (ex physics calculations)

You can also register callbacks which are invoked after rendring by using the `onAfterRender` method.

```ts
const { onAfterRender } = useLoop()

onAfterRender(({ renderer }) => {
  // Calculations
})
```

#### Render priority

Both useBeforeRender and useAfteRender provide an optional priority number. This number could be anything from `Number.NEGATIVE_INFINITY` to `Number.POSITIVE_INFINITY` being the 0 by default. The lower the number, the earlier the callback will be executed.

```ts
onBeforeRender(() => {
  console.count('triggered first')
}, -1)

onBeforeRender(() => {
  console.count('triggered second')
}, 1)
```

#### Params of the callback

All callbacks receive an object with the following properties:

- `delta`: The delta time between the current and the last frame. This is the time in miliseconds since the last frame.
- `elapsed`: The elapsed time since the start of the render loop.
- `clock`: The [THREE clock](https://threejs.org/docs/?q=clock#api/en/core/Clock) instance.
- `renderer`: The [WebGLRenderer](https://threejs.org/docs/#api/en/renderers/WebGLRenderer) of your scene.
- `scene`: The [scene](https://threejs.org/docs/?q=sce#api/en/scenes/Scene) of your scene.
- `camera`: The currently active camera.
- `raycaster`: The global raycaster used for pointer events.
- `controls`: The controls of your scene.
- `invalidate`: A method to invalidate the render loop. This is only required if you set the `render-mode` prop to `on-demand`.
- `advance`: A method to advance the render loop. This is only required if you set the `render-mode` prop to `manual`.

#### Pausing and resuming the update loop

You can use `pause` and `resume` methods:

```ts
const { onBeforeRender, pause, resume } = useLoop()

onBeforeRender(({ elapsed }) => {
  sphereRef.value.position.y += Math.sin(elapsed) * 0.01
})

pause() // This will pause the loop
resume() // This will resume the loop
```

#### Pausing and resuming the render

You can use `pauseRender` and `resumeRender` methods:

```ts
const { pauseRender, resumeRender } = useLoop()

onBeforeRender(({ elapse }) => {
  sphereRef.value.position.y += Math.sin(elapsed) * 0.01
})

pauseRender() // This will pause the renderer
resumeRender() // This will resume the renderer
```

#### Unregistering callbacks

You can unregister a callback by calling the method `off` returned by the `onBeforeRender` or `onAfterRender` method.

```ts
const { onBeforeRender } = useLoop()

const { off } = onBeforeRender(({ elapsed }) => {
  sphereRef.value.position.y += Math.sin(elapsed) * 0.01
})
```

## Devtools improvements

![](/blog/whats-hot-v4/devtools.png)

- Renderer `info` available when inspecting the scene
- All the shaders programs (materials) are available to inspect
- Search scene three objects by name

## Conclusion

We are super excited about this new version of TresJS. Please give it a try and let us know what you think on the [Discord channel](https://discord.gg/V8ZPvGHSQd). We are always looking for feedback to improve the library.

Give some love to the contributors that make it happen. 🙌 💚