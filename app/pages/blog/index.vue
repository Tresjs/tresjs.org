<script setup lang="ts">
import { USeparator } from '#components';
import type { BlogCollectionItem, PageCollectionItemBase } from '@nuxt/content';
import { useInfiniteScroll } from '@vueuse/core'
import { ref, computed } from 'vue'

useSeoMeta({
  title: 'Blog | TresJS',
  description: 'Latest news from the TresJS ecosystem',
  ogTitle: 'Blog',
  ogDescription: 'Latest news from the TresJS ecosystem',
  ogImage: '/social/og-blog.png',
  twitterTitle: 'Blog',
  twitterDescription: 'Latest news from the TresJS ecosystem',
  twitterImage: '/social/og-blog.png',
  twitterCard: 'summary_large_image',
})

/**
 * Extracts the slug from a blog post's path
 * @param blogPost - The blog post object containing the path
 * @returns The slug extracted from the path, or empty string if not found
 */
function getSlugFromBlogPost(blogPost: BlogCollectionItem & PageCollectionItemBase): string {
  return blogPost.path?.split('/').pop() ?? ''
}

const { data: blog } = await useAsyncData('blog', () =>
  queryCollection('blog').all().then(items =>
    items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  )
)

const { data: formattedBlog } = await useAsyncData('formatted-blog',
  async () => {
    if (!blog.value) return []

    return await Promise.all(
      blog.value.map(async (item) => {
        const slug = getSlugFromBlogPost(item)

        const authorSlugs = Array.isArray(item.author)
          ? item.author
          : [item.author]

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
          ...item,
          slug,
          authors,
          badge: {
            label: item.category.charAt(0).toUpperCase() + item.category.slice(1),
            color: 'primary',
            variant: 'soft'
          }
        }
      })
    )
  }
)

const itemsPerLoad = 2
const visibleCount = ref(itemsPerLoad)
const blogPosts = ref<HTMLElement | null>(null)

const visibleBlog = computed(() => {
  if (!formattedBlog.value) return []
  return formattedBlog.value.slice(0, visibleCount.value)
})

useInfiniteScroll(
  blogPosts,
  () => {
    if (visibleCount.value < (formattedBlog.value?.length || 0)) {
      visibleCount.value += itemsPerLoad
    }
  },
  {
    distance: 100,
    canLoadMore: () => visibleCount.value < (formattedBlog.value?.length || 0),
  }
)

</script>
<template>
  <div
    class="grid min-h-[calc(100vh-var(--ui-header-height))] max-h-[calc(100vh-var(--ui-header-height))] overflow-hidden grid-cols-1 grid-rows-[1fr_1px_auto_1px_auto] justify-center [--gutter-width:2.5rem] lg:grid-cols-[var(--gutter-width)_minmax(0,var(--ui-container))_var(--gutter-width)]"
  >
    <div class="hidden lg:block col-start-1 row-span-full row-start-1 pattern-bg border-r border-solid border-gray-100 dark:border-default"/>
    <div class="row-span-full row-start-1">
      <header class="mt-24">
        <h1 class="mx-4 text-lg font-mono font-medium">Blog</h1>
      </header>
      <div class="relative before:absolute before:top-0 before:h-px before:w-[200vw] before:border-t before:border-dashed before:border-gray-200 dark:before:border-default before:-left-[100vw]">
        <div class="h-[calc(100vh-var(--ui-header-height))] flex gap-8 justify-between items-stretch">
          <div class="w-1/4 hidden lg:block border-r border-solid border-gray-200 dark:border-default">
            <div class="p-4 prose prose-sm dark:prose-invert mx-auto">
              <h2 class="text-lg font-medium">
                Subscribe
              </h2>
              <p class="text-sm text-gray-500">
                Stay up-to-date with news from TresJS
              </p>
              <UButton variant="outline" color="neutral" to="https://tresjs.org/blog/rss.xml" target="_blank" icon="i-heroicons-rss" label="RSS Feed" />
            </div>
            <USeparator />
          </div>
          <div class="w-full h-full border-l border-solid border-gray-200 dark:border-default">
            <div
              ref="blogPosts"
              class="relative px-4 pt-8 mx-auto max-h-[80vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent dark:scrollbar-thumb-gray-800 blog-gradient-after"

            >
              <UChangelogVersions class="mb-20">
                <UChangelogVersion
                  v-for="({ title, date, thumbnail, description, path, authors, badge}, index) in visibleBlog"
                  :key="index"
                  :to="path"
                  :title="title"
                  :date="date"
                  :image="thumbnail"
                  :description="description"
                  :authors="authors"
                  :badge="badge"
                />
              </UChangelogVersions>
            </div>
          </div>
        </div>
      </div>
      
    </div>
    <div class="row-span-full row-start-1 hidden lg:block pattern-bg border-l border-solid border-gray-100 dark:border-default"/>
  </div>
</template>