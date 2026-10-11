// src/content.config.ts — colecciones (zonas y artículos del blog)
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const zonas = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/zonas' }),
  schema: ({ image }) => z.object({
    provincia: z.string(),
    keyword: z.string(),
    title: z.string().max(60),
    description: z.string().max(155),
    h1: z.string(),
    imagen: image(),
    alt: z.string(),
    fase2: z.boolean().default(false),
  }),
});

const articulos = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/articulos' }),
  schema: ({ image }) => z.object({
    titulo: z.string(),
    title: z.string().max(60),
    description: z.string().max(160),
    keyword: z.string(),
    fecha: z.date(),
    actualizado: z.date().optional(),
    autor: z.string().default('IRM Servicios'),
    portada: image().optional(),
    alt: z.string().optional(),
    extracto: z.string(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { zonas, articulos };
