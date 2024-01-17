import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import UnoCSS from 'unocss/astro';
import sitemap from '@astrojs/sitemap';
import { templateCompilerOptions } from '@tresjs/core';
import AutoImport from 'unplugin-auto-import/astro';
import vue from "@astrojs/vue";
import visualizer from 'rollup-plugin-visualizer';

// https://astro.build/config
export default defineConfig({
  site: 'https://tresjs.org',
  integrations: [
    mdx(),
    sitemap(),
    UnoCSS({
      injectReset: true
    }), 
    vue(templateCompilerOptions), 
    AutoImport({
      /* options */
      include: [/\.[tj]sx?$/,
      // .ts, .tsx, .js, .jsx
      /\.vue$/, /\.vue\?vue/,
      // .vue
      /\.md$/,
      // .md
      /\.astro$/],
      imports: [
      // presets
      'vue'],
      dts: true //
    })
  ],
  
});