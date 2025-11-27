<script setup lang="ts">
import type { BlogCollectionItem } from '@nuxt/content'
import { Motion } from "motion-v"

const route = useRoute()
const { data: blogPost } = await useAsyncData(route.path, () => {
  return queryCollection('blog').path(route.path).first()
})

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

defineOgImage({
  url: blogPost?.value?.thumbnail ?? `/${blogPost?.value?.path?.split('/').pop()}.png`,
  alt: blogPost?.value?.title,
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
        
        <div class="ml-2 flex gap-4 py-4">
          <UUser
            v-for="author in formattedBlogPost?.authors"
            :key="author.name"
            :name="author.name"
            :description="author.description"
            :avatar="author.avatar"
        />
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
