// astro.config.mjs — configuración global del proyecto
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://irmservicios.com',      // dominio canónico (URLs absolutas, sitemap)
  trailingSlash: 'always',               // /precios/ y no /precios
  build: { format: 'directory' },        // /precios/index.html
  integrations: [
    sitemap({
      // las páginas noindex no entran en el sitemap
      filter: (page) => !page.includes('/gracias/') && !page.includes('/lp/'),
    }),
  ],
});
