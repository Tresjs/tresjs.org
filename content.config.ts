import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    authors: defineCollection({
      type: 'page',
      source: 'authors/**/*.md',
      schema: z.object({
        name: z.string(),
        avatar: z.string(),
        slug: z.string(),
        email: z.string(),
        twitter: z.string(),
        github: z.string(),
        website: z.string(),
      }),
    }),
    showcase: defineCollection({
      type: 'data',
      source: 'showcase/**/*.md',
      schema: z.object({
        title: z.string(),
        date: z.string(),
        description: z.string(),
        thumbnail: z.string(),
        _video: z.string(),
        url: z.string(),
        author: z.string(),
        status: z.string(),
        repo: z.string(),
      }),
    }),
    blog: defineCollection({
      type: 'page',
      source: 'blog/**/*.md',
      schema: z.object({
        title: z.string(),
        date: z.string(),
        thumbnail: z.string(),
        category: z.string(),
        description: z.string(),
        url: z.string(),
        author: z.union([z.string(), z.array(z.string())]),
        status: z.string(),
      }),
    }),
  }
})