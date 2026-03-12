import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

const posts = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
	schema: z.object({
		title: z.string(),
		date: z.string().optional(),
		excerpt: z.string().optional(),
		author: z
			.object({
				name: z.string(),
				picture: z.string().optional(),
			})
			.optional(),
		image: z
			.object({
				url: z.string(),
				alt: z.string(),
				width: z.number(),
				height: z.number(),
				effect: z.boolean().optional(),
			})
			.optional(),
	}),
})

export const collections = { posts }
