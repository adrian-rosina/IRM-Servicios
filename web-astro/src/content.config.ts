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
    fotoLocal: z.boolean().default(true),
    fase2: z.boolean().default(false),
    entradilla: z.string(),
    incluye: z.string(),
    organizacion: z.string(),
    zonaTexto: z.string(),
    municipios: z.array(z.string()).default([]),
    municipiosNota: z.string(),
    clima: z.object({
      temporada: z.string(),
      texto: z.string(),
      claves: z.array(z.object({ icono: z.string(), titulo: z.string(), texto: z.string() })).length(3),
    }),
    galeria: z.array(z.object({ src: image(), alt: z.string(), pie: z.string() })).default([]),
    faqs: z.array(z.object({ q: z.string(), a: z.string() })).min(6),
  }),
});

const articulos = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/articulos' }),
  schema: () => z.object({
    titulo: z.string(),
    title: z.string().max(60),
    description: z.string().max(160),
    keyword: z.string(),
    fecha: z.date(),
    actualizado: z.date().optional(),
    autor: z.string().default('IRM Servicios'),
    portada: z.string().optional(),
    alt: z.string().optional(),
    categoria: z.string().default('Guía'),
    minutos: z.number().int().positive().optional(),
    extracto: z.string(),
    tags: z.array(z.string()).default([]),
    cta: z.object({
      titulo: z.string(),
      texto: z.string(),
      boton: z.string(),
      href: z.string(),
    }).optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { zonas, articulos };
