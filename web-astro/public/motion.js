// IRM · movimiento al hacer scroll: titulares palabra a palabra, entradas elemento a elemento
// (con dirección en los bloques de dos columnas) y botones con zoom. Sin librerías.
// Si el usuario pide menos movimiento o el navegador no tiene IntersectionObserver, no hace nada.
(() => {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!('IntersectionObserver' in window)) return;

  const main = document.querySelector('main');
  if (!main) return;

  const PASO_PALABRA = 45; // ms entre palabras de un titular
  const PASO_ELEMENTO = 90; // ms entre elementos que entran a la vez
  const esMovil = matchMedia('(max-width: 767px)').matches;

  // --- Titulares palabra a palabra --------------------------------------
  const partirEnPalabras = (titulo) => {
    let i = 0;
    const recorrer = (nodo) => {
      [...nodo.childNodes].forEach((hijo) => {
        if (hijo.nodeType === Node.TEXT_NODE) {
          const trozos = hijo.textContent.split(/(\s+)/);
          if (trozos.every((t) => !t.trim())) return;
          const frag = document.createDocumentFragment();
          trozos.forEach((t) => {
            if (!t) return;
            if (!t.trim()) { frag.appendChild(document.createTextNode(t)); return; }
            const w = document.createElement('span');
            w.className = 'irm-w';
            w.textContent = t;
            w.style.transitionDelay = `${i++ * PASO_PALABRA}ms`;
            frag.appendChild(w);
          });
          hijo.replaceWith(frag);
        } else if (hijo.nodeType === Node.ELEMENT_NODE && hijo.tagName !== 'BR') {
          recorrer(hijo);
        }
      });
    };
    recorrer(titulo);
    titulo.dataset.mov = 'palabras';
  };

  // --- Elementos que entran uno detrás de otro ---------------------------
  const OBJETIVOS = [
    '.irm-eyebrow', 'h3', 'p', '.irm-btn', '.irm-card', '.irm-foto', 'figure', 'ul', 'ol',
    'table', 'details', 'blockquote', '.irm-chip', '.irm-cifra-grande', '.irm-post-cta',
  ].join(',');
  const EXCLUIR = 'form, [data-stagger], [data-proc], .irm-hx, .irm-article, .irm-marquee, nav, header, footer';

  const direccion = (el) => {
    if (esMovil) return 'arriba';
    const split = el.closest('.irm-split');
    if (!split) return 'arriba';
    const col = [...split.children].find((c) => c.contains(el));
    return [...split.children].indexOf(col) === 0 ? 'izquierda' : 'derecha';
  };

  const marcarElementos = (seccion) => {
    const candidatos = [...seccion.querySelectorAll(OBJETIVOS)].filter((el) => {
      if (el.closest(EXCLUIR) && !el.matches('.irm-post-cta')) return false;
      if (el.closest('.irm-post-cta') && !el.matches('.irm-post-cta')) return false;
      if (el.matches('p') && el.querySelector('.irm-btn')) return false; // el botón entra solo, con zoom
      return true;
    });
    // Solo el elemento más externo de cada grupo: una tarjeta entra entera, no sus párrafos por separado
    candidatos
      .filter((el) => !candidatos.some((otro) => otro !== el && otro.contains(el)))
      .forEach((el) => { el.dataset.mov = el.matches('.irm-btn') ? 'zoom' : direccion(el); });
  };

  // --- Montaje ------------------------------------------------------------
  document.documentElement.classList.add('irm-motion');

  main.querySelectorAll('h1, h2').forEach((t) => {
    if (!t.closest('.irm-article') && !t.closest('form')) partirEnPalabras(t);
  });

  const secciones = [...main.querySelectorAll('section')];
  secciones.forEach((s, idx) => {
    if (idx === 0) return; // la primera sección (hero) se ve desde el principio: no retrasa la imagen principal
    if (s.hasAttribute('data-anim')) s.removeAttribute('data-anim'); // ahora se anima por dentro, no en bloque
    marcarElementos(s);
  });
  // El CTA de los artículos del blog vive fuera de <section>
  main.querySelectorAll('.irm-post-cta').forEach((el) => { el.dataset.mov = 'arriba'; });

  const entrar = (el) => el.classList.add('m-in');

  const io = new IntersectionObserver((entradas) => {
    let orden = 0;
    entradas
      .filter((e) => e.isIntersecting)
      .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top || a.boundingClientRect.left - b.boundingClientRect.left)
      .forEach((e) => {
        const el = e.target;
        if (el.dataset.mov !== 'palabras') el.style.transitionDelay = `${orden++ * PASO_ELEMENTO}ms`;
        entrar(el);
        io.unobserve(el);
      });
  }, { rootMargin: '0px 0px -6% 0px', threshold: 0 });

  const pendientes = () => main.querySelectorAll('[data-mov]:not(.m-in)');
  pendientes().forEach((el) => io.observe(el));

  // Red de seguridad: lo que está en pantalla y siga oculto a los 2.5s, aparece igualmente
  const red = () => setTimeout(() => {
    pendientes().forEach((el) => { if (el.getBoundingClientRect().top < innerHeight) entrar(el); });
  }, 2500);
  if (document.readyState === 'complete') red();
  else addEventListener('load', red, { once: true });
})();
