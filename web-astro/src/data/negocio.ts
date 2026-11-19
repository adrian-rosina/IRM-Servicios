// src/data/negocio.ts — única fuente de verdad del negocio
export const NEGOCIO = {
  nombre: 'IRM Servicios',
  url: 'https://irmservicios.com',
  telefono: '652331968',
  telefonoFormato: '652 33 19 68',
  whatsapp: '34652331968',
  instagram: 'irmservicios',
  facebook: 'irmservicios',
  email: 'info@irmservicios.com',
  horario: 'Lunes a viernes · 08:00 - 20:00',
  horarioCorto: '08:00 - 20:00',
  sede: 'Laguna de Duero · Valladolid',
  titular: 'José Cabezudo Sánchez Girón',
  nif: '71188330H',
  direccion: 'Avenida de Madrid, 121 · 47140 Laguna de Duero · Valladolid · España',
  claim: 'Tu césped ya se corta solo.',
  slogan: 'Sin comprar, sin mantener, sin cortar.',
  sustitucionDias: 7,
  demoEuros: 175,
} as const;

export const TRAMOS = [
  { id: 'hasta-600',  metros: 600,  precioAnual: 660, destacado: false, etiqueta: 'Hasta 600 m²' },
  { id: 'hasta-1000', metros: 1000, precioAnual: 760, destacado: true,  etiqueta: 'Hasta 1.000 m²' },
] as const;

export const precioDia = (anual: number): string =>
  (anual / 365).toLocaleString('es-ES', { maximumFractionDigits: 2 });

export const precioMes = (anual: number): string =>
  (anual / 12).toLocaleString('es-ES', { maximumFractionDigits: 0 });

export const ZONAS = [
  { slug: 'valladolid', nombre: 'Valladolid', fase: 1 },
  { slug: 'segovia',    nombre: 'Segovia',    fase: 1 },
  { slug: 'toledo',     nombre: 'Toledo',     fase: 1 },
  { slug: 'cadiz',      nombre: 'Cádiz',      fase: 2 },
] as const;

export const NAV = [
  {
    label: 'Cómo funciona', href: '/como-funciona/',
    sub: [
      { label: 'Jardines con pendiente', href: '/como-funciona/jardines-con-pendiente/' },
    ],
  },
  { label: 'Precios', href: '/precios/' },
  {
    label: 'Profesionales', href: '/profesionales/',
    sub: [
      { label: 'Fincas de bodas y eventos', href: '/profesionales/fincas-de-bodas-y-eventos/' },
      { label: 'Campos de fútbol', href: '/profesionales/campos-de-futbol/' },
    ],
  },
  { label: 'Contacto', href: '/contacto/' },
] as const;

// Los precios de los tramos son SIN IVA (confirmado por Pepo, 22/10/2026).
export const IVA = 0.21;
export const conIva = (anual: number): string =>
  (anual * (1 + IVA)).toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

// Datos de la ficha de Google Business Profile "IRM Servicios | Empresa de robots cortacésped"
// (consultada el 14/11/2026). Los datos estructurados del negocio deben coincidir con ella.
export const FICHA_GOOGLE = {
  direccion: {
    calle: 'C. de José Bergamín, 30',
    barrio: 'Moratalaz',
    cp: '28030',
    localidad: 'Madrid',
    region: 'Comunidad de Madrid',
    pais: 'ES',
  },
  geo: { lat: 40.4115378, lng: -3.6386608 },
  mapa: 'https://www.google.com/maps?cid=5649934142248412978',
  horario: [
    { dias: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], abre: '08:00', cierra: '20:00' },
    { dias: ['Saturday'], abre: '09:00', cierra: '15:00' },
  ],
} as const;
