# IRM Servicios · irmservicios.com

Sitio web de IRM Servicios, empresa de renting anual de robots cortacésped con instalación, mantenimiento y averías incluidos. Zona principal: Comunidad de Madrid, con cobertura en Valladolid, Segovia, Toledo y Cádiz.

## Estructura del repositorio

```
.
├── prototipos/        Prototipo HTML del sitio (12 páginas) con sus estilos y
│                      las imágenes optimizadas en WebP.
├── web-astro/         Implementación en Astro 7 del sitio final.
├── theme/             Tema hijo de Hello Elementor con los tokens de marca
│                      para una posible versión en WordPress + Elementor.
├── imagenes/          Fotografías originales de instalaciones y robots.
└── backups/           Carpeta reservada para copias de seguridad del CMS.
```

## Prototipo HTML

Prototipo estático para revisar maquetación y contenido sin dependencias.

```bash
# Abrir en el navegador
open prototipos/home.html
```

Las páginas comparten los estilos de `prototipos/assets/css/irm.css` y las fotos de `prototipos/assets/img/`.

## Web en Astro

Base del sitio final, estática y lista para desplegar.

```bash
cd web-astro
npm install
npm run dev        # servidor local en http://localhost:4321
npm run build      # genera dist/
npm run preview    # sirve dist/
```

Requisitos: Node.js 22 o superior.

## Marca

- Paleta: lima `#9BDD5F`, negro `#141615`, hueso `#F2EFE6`, verde bosque `#155F06`.
- Tipografías: Space Grotesk (títulos y texto) y Space Mono (etiquetas).
- Botones píldora, tarjetas de 24 px, iconos de línea.

## Páginas del sitio

Inicio · Cómo funciona · Precios · Profesionales (fincas de bodas, campos de fútbol) · Demostración · Preguntas frecuentes · Páginas de zona (Valladolid, Segovia, Toledo, Cádiz) · Contacto, Gracias y Legales.

## Licencia

Proyecto académico. Fotografías y marca propiedad de IRM Servicios.
