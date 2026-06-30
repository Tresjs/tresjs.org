<script setup lang="ts">
import type { BlogCollectionItem } from '@nuxt/content'
import { Motion } from "motion-v"
import { joinURL } from 'ufo'
import { useClipboard } from '@vueuse/core'

const route = useRoute()
const img = useImage()
const site = useSiteConfig()
const { data: blogPost } = await useAsyncData(route.path, () => {
  return queryCollection('blog').path(route.path).first()
})

// Unknown slugs must 404 — otherwise the page renders with null data and
// social scrapers read "undefined made with TresJS by @undefined" from the meta.
if (!blogPost.value) {
  throw createError({ statusCode: 404, statusMessage: 'Blog post not found', fatal: true })
}

const { data: formattedBlogPost } = await useAsyncData<BlogCollectionItem & { authors: { name: string, description: string, avatar: { src: string } }[] }>(`formatted-blog-post-${route.path}`, async () => {
  if (!blogPost.value) return {}

  const authorSlugs = Array.isArray(blogPost.value.author)
    ? blogPost.value.author
    : [blogPost.value.author]

  const authorPromises = authorSlugs.map(authorSlug =>
    useAsyncData(`author-${authorSlug}`, () =>
      queryCollection('authors')
        .where('slug', '=', authorSlug)
        .first()
    )
  )

  const authorResults = await Promise.all(authorPromises)
  const authors = authorResults.map(result => result.data?.value).filter(Boolean).map(author => ({
    name: author?.name,
    description: `@${author?.github}`,
    avatar: {
      src: author?.avatar,
    },
    to: author?.website,
    target: '_blank'
  }))

  return {
    ...blogPost.value,
    authors
  }
})

const ogImageUrl = computed(() => {
  const imagePath = blogPost?.value?.thumbnail ?? `/${blogPost?.value?.path?.split('/').pop()}.png`
  return img(imagePath, {
    width: 1200,
    height: 630,
    fit: 'cover'
  })
})

// nuxt-og-image v6's defineOgImage signature is (component, props, options).
// Passing a prebuilt thumbnail URL must go through the options arg, otherwise
// the object is treated as the component and crashes meta resolution.
defineOgImage(undefined, {}, {
  url: ogImageUrl.value,
  width: 1200,
  height: 630,
  alt: blogPost?.value?.title,
  extension: 'png',
})

useSeoMeta({
  title: blogPost?.value?.title,
  description: blogPost?.value?.description,
  keywords: blogPost?.value?.tags?.join(', '),
  ogTitle: `${blogPost?.value?.title} made with TresJS by @${blogPost?.value?.author}`,
  ogDescription: blogPost?.value?.description,
  ogType: 'article',
  ogImageAlt: blogPost?.value?.title,
  twitterCard: 'summary_large_image',
  twitterSite: '@alvarosabu',
  twitterTitle: `${blogPost?.value?.title} - Tres`,
  twitterDescription: blogPost?.value?.description,
  twitterImageAlt: blogPost?.value?.title,
  icon: joinURL(site.url, '/favicon.ico'),
})

// readingTime is injected by the remark-reading-time plugin (see nuxt.config).
const readingTime = computed(() => blogPost.value?.readingTime?.text)

const shareUrl = computed(() => joinURL(site.url, route.path))
const { copy, copied } = useClipboard({ source: shareUrl })

const shareItems = computed(() => {
  const url = shareUrl.value
  const text = blogPost.value?.title ?? ''
  return [
    {
      label: 'Post on X',
      icon: 'i-simple-icons-x',
      to: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      target: '_blank',
    },
    {
      label: 'Share on Bluesky',
      icon: 'i-simple-icons-bluesky',
      to: `https://bsky.app/intent/compose?text=${encodeURIComponent(`${text} ${url}`)}`,
      target: '_blank',
    },
    {
      label: 'Share on LinkedIn',
      icon: 'i-simple-icons-linkedin',
      to: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      target: '_blank',
    },
  ]
})
</script>

<template>
  <div class="grid min-h-dvh grid-cols-1 grid-rows-[1fr_1px_auto_1px_auto] justify-center [--gutter-width:2.5rem] lg:grid-cols-[var(--gutter-width)_minmax(0,var(--ui-container))_var(--gutter-width)] overflow-hidden">
   
    <div class="hidden lg:block col-start-1 row-span-full row-start-1 pattern-bg border-r border-solid border-gray-100 dark:border-default"/>
    <div class="row-span-full row-start-1 mb-32">
      <header class="ml-2 mt-24 font-mono font-medium text-xs">
        <NuxtTime v-if="formattedBlogPost?.date" year="numeric" month="short" day="numeric" class="ml-6 mt-24 font-mono font-medium text-xs text-toned" :datetime="formattedBlogPost?.date" />
      </header>
      <div class="relative before:absolute before:top-0 before:h-px before:w-[200vw] before:border-t before:border-dashed before:border-gray-200 dark:before:border-default before:-left-[100vw]  after:w-[200vw] after:absolute after:bottom-0 after:h-px after:border-t after:border-dashed after:border-gray-200 dark:after:border-default  after:-left-[100vw]">
        <div
class="flex justify-center items-center rounded-full border-1 border-dashed border-gray-200 dark:border-default w-12 h-12 absolute -top-6 -left-6" 
        >
        <Motion
        class="hidden md:flex"
        as-child 
        :initial="{ opacity: 0 }"
        :whileHover="{ opacity: 1 }">
          <UButton
            variant="ghost"
            color="neutral"
            class="rounded-full transition-opacity duration-300"
            icon="i-heroicons-arrow-left"
            to="/blog"
      
          />
        </Motion>
        </div>
        
        <h2 class="px-2 py-16 w-full sm:w-1/2 text-4xl tracking-tighter text-balance sm:text-5xl lg:text-6xl font-display font-extrabold">
          {{ formattedBlogPost?.title }}
        </h2>
        
        <div class="ml-2 flex items-center justify-between gap-4 py-4">
          <div class="flex gap-4">
            <UUser
              v-for="author in formattedBlogPost?.authors"
              :key="author.name"
              :name="author.name"
              :description="author.description"
              :avatar="author.avatar"
            />
          </div>
          <div class="flex items-center gap-3 text-muted mr-8">
            <span v-if="readingTime" class="flex items-center gap-1 font-mono text-xs uppercase whitespace-nowrap">
              <UIcon name="i-heroicons-clock" class="size-4" />
              {{ readingTime }}
            </span>
            <UFieldGroup>
              <UButton
                color="neutral"
                variant="outline"
                :icon="copied ? 'i-heroicons-check' : 'i-heroicons-link'"
                :label="copied ? 'Copied!' : 'Copy Link'"
                @click="copy(shareUrl)"
              />
              <UDropdownMenu :items="shareItems" :content="{ align: 'end' }">
                <UButton
                  color="neutral"
                  variant="outline"
                  icon="i-heroicons-chevron-down"
                  aria-label="Share article"
                />
              </UDropdownMenu>
            </UFieldGroup>
          </div>
        </div>
      </div>
      <div class="w-full pl-2 pr-4 flex flex-col flex-col-reverse lg:flex-row gap-8">
        <div class="flex-1 pt-8">
          <ContentRenderer  v-if="formattedBlogPost" class="max-w-4xl" :value="formattedBlogPost" />
        </div>
        <div class="md:border-l md:border-gray-100 dark:md:border-default md:px-8">
          <UContentToc :links="formattedBlogPost?.body?.toc?.links" />
        </div>
      </div>
    </div>
    <div class="row-span-full row-start-1 hidden lg:block pattern-bg border-l border-solid border-gray-100 dark:border-default"/>
  </div>
</template>
