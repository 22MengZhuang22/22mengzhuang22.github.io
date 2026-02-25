import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    slug: z.string(),
    title_en: z.string(),
    title_zh: z.string(),
    date: z.string(),
    preview_en: z.string(),
    preview_zh: z.string(),
    author: z.string().optional(),
  }),
});

export const collections = { posts };
