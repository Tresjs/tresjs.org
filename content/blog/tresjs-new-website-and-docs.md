---
title: 'New look, new docs, new website'
description: 'We are trilled to release the new tresjs.org and docs.tresjs.org, powered by Nuxt UI.'
date: '2025-10-01'
category: 'announcement'
author: [alvarosabu, tino-koch]
thumbnail: '/blog/tresjs-new-website-and-docs/tresjs-new-landing.png'
---

TresJS has grown a lot since we started in 2022, and tresjs.org has been the main entry point when you want to start you journey with 3D on Vue. It was time to give it a new look and feel that matches the current state of the library, modern and powerful, but same sprit as the beginning.

## New design

![New TresJS website](/blog/tresjs-new-website-and-docs/tresjs-new-landing.png)

We decided to refactor the website to **Nuxt 4**, and in an effort to have a consistent design language across the TresJS ecosystem, we are leveraging the incredible [Nuxt UI](https://ui.nuxt.com/)
 library.

::div{class="grid sm:grid-cols-2 gap-2"}
  ::div{class="flex flex-col"}
    ::nuxt-link{to="https://docs.tresjs.org" target="_blank" class="hover:border-transparent"}
      ::nuxt-img{src="/blog/tresjs-new-website-and-docs/docs.tresjs.org.png" alt="TresJS Docs" width="600" height="375" class="m-0 border rounded-md border-gray-200"}
      ::
    ::
    ::span{class="italic text-xs text-gray-500"}
      New docs website
    ::
  ::
  ::div{class="flex flex-col"}
    ::nuxt-link{to="https://docs.tresjs.org/getting-started/installation#nuxt-project" target="_blank" class="hover:border-transparent"}
      ::nuxt-img{src="/blog/tresjs-new-website-and-docs/tresjs-devtools.png" alt="TresJS Nuxt Devtools" width="600" height="375" class="m-0 border rounded-md border-gray-200"}
      ::
    ::
    ::span{class="italic text-xs text-gray-500"}
      TresJS Nuxt Devtools
    ::
  ::
  ::div{class="flex flex-col"}
    ::nuxt-link{to="https://lab.tresjs.org" target="_blank" class="hover:border-transparent"}
      ::nuxt-img{src="/blog/tresjs-new-website-and-docs/labs.png" alt="TresJS Labs" width="600" height="375" class="m-0 border rounded-md border-gray-200"}
      ::
    ::
    ::span{class="italic text-xs text-gray-500"}
      New labs website
    ::
  ::
::

This is just a glance towards many improvements on the ecosystem

## Same spirit

The brand is made to be minimalist and playful, we chosed [Manrope](https://fonts.google.com/specimen/Manrope) for the headlines, [Inter](https://fonts.google.com/specimen/Inter) stayed as the main font and mono is now [Geist Mono](https://vercel.com/font) from Vercel, creating a lot of contrast between bold headers and body text.

::design-kit-board
::

We also incorporated some elements to make it feel like a technical blueprint, being **Tres code**: the schematics to bring those interactive experiences to life 🤓.

::read-more{to="/design-kit" icon="i-lucide-palette"}
Discover the **TresJS Design Kit**.
::

## New Docs

We also migrate our documentation from previous [Vitepress](https://vitepress.dev/) to a tailored Nuxt 4 + Nuxt UI v4 customized Docs template. And we have to warn you, we were highly "inspired" (shamelessly copy 😜) by ideas from the Nuxt website.

Like the new navigation where you can easily jump between categories:

::video{poster="/blog/tresjs-new-website-and-docs/docs-navigation-poster.png" controls class="rounded-lg w-full aspect-video overflow-hidden border border-gray-200"}
  :source{src="/blog/tresjs-new-website-and-docs/docs-navigation.mp4" type="video/mp4"}
::

Or the other side (right), you can also navegate through each page's table of contents as well as community shortcuts.

![Table of Contents](/blog/tresjs-new-website-and-docs/table-contents.png)

## Search command palette

You can now navigate faster by hitting :kbd{value="meta"} :kbd{value="K"}. We leverage the Nuxt UI [`<CommandPalette>`](https://ui.nuxt.com/components/command-palette) components combined with Nuxt Content data (search & navigation) to provide a better search experience.

With the command palette, you can:

- Jump to a page
- Search in the documentation

::video{poster="/blog/tresjs-new-website-and-docs/search-poster.png" controls class="rounded-lg w-full aspect-video overflow-hidden border border-gray-200"}
  :source{src="/blog/tresjs-new-website-and-docs/search.mp4" type="video/mp4"}
::

## Cookbook and community resources

We heard your feedback and we improved the format of the Cookbook recipes with step by step guides and we added a whole new page dedicated to Community resources, such as:

- Community plugins and packages
- Talks
- TresJS courses

::div{class="grid sm:grid-cols-2 gap-4"}
  ::div{class="flex flex-col"}
    ::nuxt-link{to="https://docs.tresjs.org/cookbook" target="_blank" class="hover:border-transparent"}
      ::nuxt-img{src="/blog/tresjs-new-website-and-docs/cookbook-recipes.png" alt="TresJS Cookbook recipes" width="600" height="375" class="m-0 border rounded-md border-gray-200"}
      ::
    ::
    ::span{class="italic text-xs text-gray-500"}
      Cookbook 🍳🧑‍🍳
    ::
  ::
  ::div{class="flex flex-col"}
    ::nuxt-link{to="https://docs.tresjs.org/community/awesome-resources" target="_blank" class="hover:border-transparent"}
      ::nuxt-img{src="/blog/tresjs-new-website-and-docs/community-resources.png" alt="TresJS Community resources" width="600" height="375" class="m-0 border rounded-md border-gray-200"}
      ::
    ::
    ::span{class="italic text-xs text-gray-500"}
      Community resources
    ::
  ::
::

::read-more{to="https://github.com/Tresjs/tres/edit/next/docs/content/5.community/awesome-resources.md" icon="i-lucide-pencil"}
If you want to showcase your own packages or resources, edit this page `tresjs/tres/docs` on Github.
::

## What's next?

This new websites are just the beginning of upcoming changes we are planing for the ecosystem, some of them are:
- New docs for `@tresjs/cientos`
- New docs for `@tresjs/postprocessing`
- Contributors page

**We are looking forward to your feedback on [Twitter](https://x.com/tresjs_dev), [Discord](https://discord.gg/WTpvaxr5) or [GitHub](https://github.com/tresjs/tresjs.org)**.


## Big shoutout to the Nuxt UI team

We want to give a big shoutout to the[ Nuxt UI team](https://nuxt.com/blog/nuxt-ui-v4) for their incredible work on the library and for making all the pro components available for free. We are very grateful for their support and for the incredible library they have created.

Thank you for reading this blog post, and happy 3D ✌️