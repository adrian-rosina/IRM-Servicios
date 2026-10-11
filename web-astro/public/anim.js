// IRM · reveal on scroll (sin dependencias)
(() => {
  if (!('IntersectionObserver' in window)) return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    }
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.1 });
  const q = document.querySelectorAll('[data-anim],[data-stagger]');
  q.forEach(el => io.observe(el));
})();
