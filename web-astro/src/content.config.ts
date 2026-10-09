// src/content.config.ts — colección de páginas de zona (una por provincia)
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const zonas = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/zonas' }),
  schema: ({ image }) => z.object({
    provincia: z.string(),
    keyword: z.string(),                       // keyword principal (Paso 04)
    title: z.string().max(60),                 // el build falla si el título SEO es demasiado largo
    description: z.string().max(155),
    h1: z.string(),
    imagen: image(),
    alt: z.string(),
    fase2: z.boolean().default(false),         // Cádiz: pendiente de confirmar cobertura
  }),
});

export const collections = { zonas };
