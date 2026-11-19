// Comprobación antes de subir a producción: `npm run check` (después de `npm run build`).
// Falla si la web generada tiene datos sin confirmar o integraciones sin configurar.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIST = fileURLToPath(new URL('../dist/', import.meta.url));
const SRC = fileURLToPath(new URL('../src/', import.meta.url));

const htmlFiles = (dir) => readdirSync(dir).flatMap((f) => {
  const p = join(dir, f);
  return statSync(p).isDirectory() ? htmlFiles(p) : p.endsWith('.html') ? [p] : [];
});

const textOf = (html) => html
  .replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, ' ')
  .replace(/<[^>]+>/g, ' ')
  .replace(/\s+/g, ' ');

const bloqueantes = [];
const pendientes = new Map();
for (const file of htmlFiles(DIST)) {
  const url = '/' + relative(DIST, file).replace(/index\.html$/, '');
  for (const m of textOf(readFileSync(file, 'utf8')).matchAll(/.{0,60}\[CONFIRMAR[^\]]*\]/g)) {
    pendientes.set(url, [...(pendientes.get(url) ?? []), m[0].trim()]);
  }
}
const total = [...pendientes.values()].reduce((n, l) => n + l.length, 0);
if (total) bloqueantes.push(`${total} marcadores [CONFIRMAR] visibles en ${pendientes.size} páginas`);

const forms = readFileSync(join(SRC, 'data/forms.ts'), 'utf8');
if (!/script\.google\.com\/macros\/s\/[\w-]{20,}\/exec/.test(forms) || /REEMPLAZAR/i.test(forms)) {
  bloqueantes.push('Formularios sin webhook: pega la URL del Apps Script en src/data/forms.ts');
}
const tracking = readFileSync(join(SRC, 'data/tracking.ts'), 'utf8');
if (!/gtmId:\s*'GTM-[A-Z0-9]+'/.test(tracking)) {
  bloqueantes.push('Sin analítica: pon el ID de GTM en src/data/tracking.ts');
}

for (const [url, lista] of pendientes) {
  console.log(`\n${url}`);
  for (const l of lista) console.log(`  · …${l}`);
}
if (bloqueantes.length) {
  console.log('\n✗ NO LISTA PARA PUBLICAR');
  for (const b of bloqueantes) console.log(`  - ${b}`);
  process.exit(1);
}
console.log('\n✓ Lista para publicar');
