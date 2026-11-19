// src/data/testimonios.ts — SOLO testimonios reales y con permiso del cliente (CLAUDE.md regla 4).
// Mientras la lista esté vacía, la sección "Opiniones" de la home no se muestra.
// foto: ruta en /public/img de una foto REAL del jardín del cliente (opcional).
export interface Testimonio {
  pregunta: string;     // la duda que tenía antes de contratar
  texto: string;        // lo que dice, con sus palabras
  nombre: string;       // nombre de pila
  municipio: string;
  detalle: string;      // p. ej. "450 m² · Particular" o "Finca de bodas"
  foto?: string;
  alt?: string;
}

export const TESTIMONIOS: Testimonio[] = [];
