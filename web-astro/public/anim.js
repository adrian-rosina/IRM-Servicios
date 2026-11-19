// IRM · reveal on scroll + contadores — con fallback para que nunca se quede contenido oculto
(() => {
  const reveal = (el) => el.classList.add('in');
  const all = () => document.querySelectorAll('[data-anim],[data-stagger]');
  const counters = () => document.querySelectorAll('[data-count-to]');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // --- Counters ------------------------------------------------
  const easeOut = (t) => 1 - Math.pow(1 - t, 3);
  const runCounter = (el) => {
    if (el.dataset.counted) return;
    el.dataset.counted = '1';
    const target = parseFloat(el.dataset.countTo);
    if (!isFinite(target)) return;
    if (reducedMotion) { el.textContent = Math.round(target).toString(); return; }
    const duration = 1400;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      el.textContent = Math.round(target * easeOut(t)).toString();
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  // --- Listas de pasos que se iluminan al hacer scroll ([data-proc]) ---
  if ('IntersectionObserver' in window) {
    document.querySelectorAll('[data-proc]').forEach((list) => {
      const items = [...list.children];
      const pio = new IntersectionObserver((entries) => {
        for (const e of entries) {
          if (e.isIntersecting) items.forEach((i) => i.classList.toggle('is-active', i === e.target));
        }
      }, { rootMargin: '-45% 0px -45% 0px' });
      items.forEach((i) => pio.observe(i));
    });
  }

  // --- Reveal observer ----------------------------------------
  if (reducedMotion) {
    all().forEach(reveal);
    counters().forEach(runCounter);
    return;
  }

  if (!('IntersectionObserver' in window)) {
    all().forEach(reveal);
    counters().forEach(runCounter);
    return;
  }

  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) { reveal(e.target); io.unobserve(e.target); }
    }
  }, { rootMargin: '0px 0px 10% 0px', threshold: 0.08 });

  const counterIO = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) { runCounter(e.target); counterIO.unobserve(e.target); }
    }
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.4 });

  all().forEach(el => { if (!el.classList.contains('in')) io.observe(el); });
  counters().forEach(el => { el.textContent = '0'; counterIO.observe(el); });

  // Fallback: lo que ya está en pantalla (o por encima) y siga oculto 2.5s tras cargar se activa.
  // Lo que queda por debajo se sigue animando al llegar con el scroll.
  const visto = (el) => el.getBoundingClientRect().top < innerHeight;
  const safetyNet = () => {
    setTimeout(() => {
      all().forEach(el => { if (!el.classList.contains('in') && visto(el)) reveal(el); });
      counters().forEach(el => { if (visto(el)) runCounter(el); });
    }, 2500);
  };
  if (document.readyState === 'complete') safetyNet();
  else window.addEventListener('load', safetyNet, { once: true });
})();
