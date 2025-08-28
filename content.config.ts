import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    index: defineCollection({
      type: 'data',
      source: 'index.yml',
      schema: z.object({
        hero: z.object({
          title: z.string(),
          titleHighlight: z.string(),
          body: z.string(),
          ctas: z.array(z.object({
            label: z.string(),
            color: z.string(),
            variant: z.string(),
            size: z.string(),
            icon: z.string(),
          })),
        }),
        scenes: z.object({
          tabs: z.array(z.object({
            title: z.string(),
            descriptionTitle: z.string(),
            descriptionHighlight: z.string(),
            description: z.string(),
            icon: z.string(),
            content: z.string(),
          })),
        }),
      }),
    }),
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
    testimonials: defineCollection({
      type: 'page',
      source: 'testimonials/**/*.md',
      schema: z.object({
        name: z.string(),
        subtitle: z.string(),
        avatar: z.string(),
        content: z.string(),
        date: z.string(),
      }),
    }),
  }
})