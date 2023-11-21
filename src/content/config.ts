import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		description: z.string(),
		author: z.string(),
		// Transform string to Date object
		publishedDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string().optional(),
	}),
});

const authors = defineCollection({
	schema: z.object({
		name: z.string(),
		avatar: z.string(),
		handle: z.string(),
		website: z.string().url(),
	}),
});

export const collections = { blog, authors };
