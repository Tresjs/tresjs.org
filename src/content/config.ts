import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
	// Type-check frontmatter using a schema
	schema: ({ image }) => z.object({
		title: z.string(),
		description: z.string(),
		author: z.string(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: image(),
	}),
});

const authors = defineCollection({
	schema: ({ image }) => z.object({
		name: z.string(),
		avatar: image(),
		handle: z.string(),
		website: z.string().url(),
	}),
});

export const collections = { blog, authors };
