# IRM Servicios · web en Astro (base del proyecto)

Base del proyecto descrita en el capítulo 5 de la memoria. Compila y genera la home, /precios/, /gracias/ y las páginas de zona de Valladolid y Cádiz.

## Requisitos
- Node.js 22 o superior

## Comandos
```bash
npm install        # instala Astro y la integración de sitemap
npm run dev        # servidor local en http://localhost:4321
npm run build      # genera la web estática en dist/
npm run preview    # sirve dist/ para revisarla
```

## Pendiente (segunda mitad del proyecto)
- Migrar el resto de páginas del prototipo (prototipos/*.html) a componentes.
- Completar las zonas de Segovia y Toledo en src/content/zonas/.
- Formularios, cookies y medición; despliegue en irmservicios.com.
