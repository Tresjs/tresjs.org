---
title: 'Announcing Tres 5.0'
description: 'Introducing Tres 5.0 with ESM-only architecture, experimentalWebGPU support, and enhanced developer experience'
date: '2025-08-15'
category: 'release'
author: [alvarosabu, tino-koch]
thumbnail: '/blog/tresjs-v5/tresjs-v5-thumbnail.png'
---

After months of development since March 21st, we're thrilled to announce TresJS v5! This major release represents a significant evolution of the declarative Three.js framework for Vue, bringing modern architecture, enhanced performance, and cutting-edge WebGPU support.

## 🎯 What's New?

Tres 5 is our most ambitious release yet, it's all about making your developer experience better, increasing performance, and future-proofing the framework for the next generation of web graphics in Vue.

- **Start a Tres project quickly**: with the new `create-tres` CLI tool, you can start a new Tres project in seconds.
- **ESM-Only Architecture**: We've made the bold decision to embrace the future by going **ESM-only**.
- **WebGPU Native Support**: The future of web graphics is here! TresJS v5 introduces **experimental WebGPU support**
- **Completly refactor composables**: We've completely refactored our composables system for better reliability and type safety.

### 🚀 New way to start a Tres project

![Tres 5.0 CLI](/blog/tresjs-v5/create-tres.png)

We've created a new CLI tool to help you scaffold a new Tres project with the best practices and the most popular packages.

::code-group
```bash [npm]
npx create-tres my-tres-project
```

```bash [yarn]
yarn create tres my-tres-project
```

```bash [pnpm]
pnpm create tres my-tres-project
```
::

The CLI provides an **interactive wizard** that guides you through:

::prose-list
- 🎯 **Template selection**: Choose between Vue + Vite or Nuxt
- 📦 **Ecosystem packages**: Select from TresJS ecosystem packages (Cientos, Post-processing, Leches)
- 🔧 **TypeScript support**: Type safe development with TypeScript
- 📏 **ESLint integration**: Code quality with TresJS ESLint config
::

::prose-note
This is the **recommended approach** for new projects as it handles all the configuration automatically and lets you choose exactly what you need.
::


### 🌟 ESM-Only Architecture

We've made the bold decision to embrace the future by going **ESM-only**. This means:

- **Smaller bundle sizes** with better tree-shaking
- **Faster loading** and improved performance
- **Modern JavaScript standards** alignment
- **Better compatibility** with modern build tools

::prose-warning
**Breaking Change**: UMD builds are no longer supported. If you're using TresJS in a legacy environment, you'll need to update your build pipeline.
::

### ⚡ WebGPU Native Support 

<UBadge color="primary" variant="soft">Experimental</UBadge>

The future of web graphics is here! TresJS v5 introduces **experimental WebGPU support**, bringing:

- **Next-generation performance** for complex 3D scenes
- **Better GPU utilization** and compute shader support
- **Future-ready architecture** for upcoming web standards
- **Seamless fallback** to WebGL when WebGPU isn't available

```vue
<TresCanvas webgpu>
  <TresPerspectiveCamera :position="[0, 0, 5]" />
  <!-- Your WebGPU-powered scene -->
</TresCanvas>
```

### 🔄 Enhanced Composables API

We've completely refactored our composables system for better reliability and type safety:

#### Improved `useLoader`
```typescript
// New initialValue support
const { scene, progress, error } = await useLoader(GLTFLoader, '/model.gltf', {
  initialValue: defaultScene // Prevent flickering during load
})

// Better loading state management
if (progress.value < 100) {
  // Show loading indicator
}
```

#### Streamlined Event System
- **Renamed events** for clarity:
  - `onAfterRender` → `onRender`
  - `onBeforeRender` → `onBeforeLoop`
- **Better performance** with optimized event handling
- **More intuitive** API that matches the actual execution flow

### 🛠️ Developer Experience Improvements

#### Enhanced DevTools
- **Performance metrics tracking** in development
- **Better debugging** with improved error messages
- **Real-time monitoring** of render performance

#### Improved Type Safety
- **Stronger TypeScript integration** across all composables
- **Better IntelliSense** support in your IDE
- **Fewer runtime errors** with compile-time checks

## 💔 Breaking Changes & Migration

### Removed Composables
- **`useSeek`**: Deprecated and removed (use native Three.js animation APIs)
- **`useTexture`**: Moved to `@tresjs/cientos` for better organization

### Event Renaming
Update your event handlers:
```vue
<!-- Before (v4) -->
<TresCanvas 
  @after-render="handleAfterRender"
  @before-render="handleBeforeRender"
>

<!-- After (v5) -->
<TresCanvas 
  @render="handleRender"
  @before-loop="handleBeforeLoop"
>
```

### Module Loading
Ensure your bundler supports ESM:
```javascript
// ✅ Works in v5
import { TresCanvas } from '@tresjs/tres'

// ❌ No longer supported
const { TresCanvas } = require('@tresjs/tres')
```

## 🚀 Performance Improvements

TresJS v5 brings significant performance enhancements:

- **Optimized render loop** with better frame timing
- **Improved memory management** with smarter resource disposal
- **Faster component initialization** through architectural improvements
- **Better Three.js integration** with updated to v0.177.0

## 🌐 Ecosystem Updates

With v5, the entire TresJS ecosystem is evolving:

- **@tresjs/cientos** will receive `useTexture` and other utility composables
- **Better modularization** allows you to import only what you need
- **Consistent API** across all TresJS packages

## 🔮 Looking Forward

TresJS v5 sets the foundation for exciting future developments:

- **Full WebGPU feature support** as the specification stabilizes
- **Enhanced compute shader integration** for advanced effects
- **Better Vue 3 Composition API integration** with upcoming features
- **Expanded ecosystem** with specialized packages for different use cases

## 🛠️ Getting Started with v5

Ready to upgrade? Here's how:

```bash
# Update TresJS
pnpm add @tresjs/tres@^5.0.0

# Update your dependencies
pnpm add @tresjs/cientos@latest # for useTexture and other utilities
```

Check out our [migration guide](https://tres.tresjs.org/migration/v5) for step-by-step instructions on updating your existing projects.

## 🙏 Community & Contributors

TresJS v5 wouldn't be possible without our amazing community. Special thanks to everyone who provided feedback, reported issues, and contributed code during the development process.

Join our [Discord community](https://discord.gg/UCr96AQmWn) to share your v5 creations and get help with migration!

---

*Ready to build the future of web 3D with TresJS v5? [Get started today](https://tres.tresjs.org/guide/getting-started) and experience the next generation of declarative Three.js development!*