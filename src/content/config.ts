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

const showcase = defineCollection({
	schema: ({ image }) => z.object({
		title: z.string(),
		date: z.coerce.date(),
		repo: z.string().url().optional(),
		thumbnail: image(),
		avatar: image(),
		video: z.string().optional(),
		demo: z.string().url().optional(),
		author: z.string(),
		author_link: z.string().url().optional(),
		status: z.enum(['Soon', 'Published']),
	}),
});

const testimonials = defineCollection({
	schema: ({ image }) => z.object({
		name: z.string(),
		subtitle: z.string(),
		avatar: image(),
		twitter: z.string().optional(),
	}),
});

const section = defineCollection({
	schema: () => z.object({
		link : z.string().url(),
	}),
});

const block = defineCollection({
	schema: () => z.object({
	}),
});

export const collections = { blog, authors, showcase, testimonials, section, block };
