---
title: 'Building Better: Our Migration to tsdown'
description: 'How we modernized the TresJS build system by migrating from Vite library mode to tsdown, reducing bundle sizes and simplifying our toolchain'
date: '2025-11-18'
category: 'engineering'
author: alvarosabu
thumbnail: '/blog/tresjs-tsdown-migration/thumbnail.png'
---

As part of our continuous effort to improve the TresJS ecosystem, we've made a significant change to how we build and distribute our packages. With the [release of v5.1.1](https://github.com/Tresjs/tres/releases/tag/%40tresjs%2Fcore%405.1.1), we've migrated our entire build system from Vite's library mode to [tsdown](https://tsdown.dev/)—a modern TypeScript bundler built on [Rolldown](https://rolldown.rs/).

This wasn't just a tooling change for the sake of change. Let me explain why we did it and what it means for you.

## The Problem: Bundle Size Bloat

While Vite has served us incredibly well as a development tool and application bundler, we started noticing issues when using it in library mode for package distribution. Our built packages were larger than they should be, which directly impacts:

- **Download times** for developers installing TresJS
- **Build performance** in your applications
- **Final bundle sizes** of your production apps

Issue [#1211](https://github.com/Tresjs/tres/issues/1211) highlighted these concerns, and we knew we needed a better solution.

## Why tsdown?

[tsdown](https://tsdown.dev/) is a modern TypeScript bundler specifically designed for building libraries. Unlike general-purpose bundlers, it focuses on creating optimal package distributions. Here's why we chose it:

If you also considering using `tsdown` take this into account:

::prose-note
`tsdown` will also be the base of the next iteration of Vite's library mode. Thanks to [@TheAlexLichter](https://x.com/TheAlexLichter) for the heads up.
::

### Built for Libraries

While Vite excels at building applications with its development server and HMR capabilities, tsdown is purpose-built for library authoring. It handles the specific needs of package distribution:

- **Multiple output formats** (ESM, CJS, types)
- **Optimal code splitting** for tree-shaking
- **TypeScript-first approach** with built-in declaration generation

### Simplified Configuration

With Vite, we needed multiple plugins to achieve our build goals:
- `vite-plugin-dts` for TypeScript declarations
- `vite-plugin-banner` for license headers
- Custom configuration for library mode

tsdown consolidates all of this into a single, focused configuration:

```ts
// tsdown.config.mts
import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: {
    tres: './src/index.ts', // Entry point with custom chunk name
  },
  platform: 'neutral', // Platform-agnostic output (no Node.js or browser-specific APIs)
  fromVite: true, // Enables Vite compatibility mode for seamless migration
  banner, // License header injection
  dts: {
    vue: true, // Generate TypeScript declarations with Vue support
  },
})
```

::prose-note
Note: `format: ['esm']` and `clean: true` are tsdown defaults and don't need to be specified.
::

### Modern Foundation

tsdown is built on top of [Rolldown](https://rolldown.rs/), a Rust-based bundler that's part of the next generation of JavaScript build tools. This gives us:

- **Better tree-shaking**: More aggressive dead code elimination
- **Faster builds**: Rust-powered performance
- **Future-proof**: Aligned with the direction of modern JavaScript tooling

## What Changed?

This migration affected three core packages across the TresJS ecosystem:

::prose-list
- **@tresjs/core** - The foundation of TresJS
- **@tresjs/cientos** - Our comprehensive abstraction library
- **@tresjs/postprocessing** - Post-processing effects for TresJS
::

And we can already see the results:

![Bundle size comparison for cientos 5.1.1](/blog/tresjs-tsdown-migration/bundle-difference-cientos.png)

**cientos bundle size reduction:**
- **v5.1.0** (Vite library mode): 1.2 MB (minified: 334.4 kB)
- **v5.1.1** (tsdown): 618.7 kB (minified: 165 kB)
- **Result**: ~50% smaller minified bundle size

The significant reduction is partly because we now only generate ESM with tsdown, whereas with Vite we were also emitting CJS or UMD formats—that accounts for the 50% reduction in total bundle size.

### For End Users

**The good news**: You don't need to change anything in your code. The migration is completely transparent—all exports, APIs, and functionality remain identical. 😊

**The better news**: You'll benefit from:
- Smaller download sizes when installing packages
- Better tree-shaking in your production builds
- Faster build times

### For Contributors

If you're contributing to TresJS packages, you'll notice:

**Removed dependencies:**
```json
// No longer needed ✨
- "vite-plugin-dts"
- "vite-plugin-banner"
```

**New configuration files:**
```
packages/
  core/
    tsdown.config.mts  // New build config
    package.json       // Updated export paths
```

**Updated scripts** remain familiar:
```bash
pnpm build  # Still works as expected
```

## The Results

While we're still gathering comprehensive metrics, early results are promising:

- **Reduced bundle sizes** across all three packages
- **Cleaner build output** with better source map generation
- **Simplified maintenance** with fewer build dependencies
- **Future-ready** for upcoming bundler optimizations

## Looking Forward

This migration is part of our broader commitment to making TresJS the best possible developer experience. Some upcoming benefits we're excited about:

::prose-list
- **Enhanced tree-shaking**: Rolldown's upcoming JSON tree-shaking will further reduce bundle sizes [Rolldown/JSON tree-shaking](https://github.com/rolldown/rolldown/pull/6626)
- **Faster iteration**: Simplified tooling means we can move faster on new features
- **Better debugging**: Improved source maps for development
::

## Technical Deep Dive

For those interested in the technical details, here's what the migration involved:

### Configuration Migration

**Before (Vite):**
```ts
// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import banner from 'vite-plugin-banner'

export default defineConfig({
  plugins: [
    vue(),
    dts({
      outDir: 'dist',
      include: ['src/**/*'],
    }),
    banner({
      content: '/* TresJS - MIT License */',
    }),
  ],
  build: {
    lib: {
      entry: 'src/index.ts',
      formats: ['es'],
    },
  },
})
```

**After (tsdown):**
```ts
// tsdown.config.mts
import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: {
    tres: './src/index.ts', // Entry point with custom chunk name
  },
  platform: 'neutral', // Platform-agnostic output (no Node.js or browser-specific APIs)
  fromVite: true, // Enables Vite compatibility mode for seamless migration
  banner, // License header injection
  dts: {
    vue: true, // Generate TypeScript declarations with Vue support
  },
})
```

::prose-note
Note: `format: ['esm']` and `clean: true` are tsdown defaults and don't need to be specified.
::

The difference is striking—we went from managing multiple plugins and complex configuration to a focused, declarative setup.

## Acknowledgments

This migration wouldn't have been possible without the incredible work and support from our community:

- **[@userquin](https://github.com/userquin)** for the hard work on implementing this migration across the TresJS ecosystem.
- **[@TheAlexLichter](https://github.com/TheAlexLichter)** for reviewing the article and providing some new insights.
- **[@sxzz](https://github.com/sxzz) (Kevin)** for creating tsdown and helping with the review.

Thank you all for making TresJS better! 🙌

If you encounter any issues with the new build system, please let us know on [GitHub](https://github.com/Tresjs/tres/issues) or join the discussion on our [Discord community](https://discord.gg/UCr96AQmWn).

---

*Happy 3D!*
