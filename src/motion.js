const REVEAL = { threshold: 0.14, rootMargin: '0px 0px -6% 0px' };

export function initReveals() {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (reduced.matches) return;

  document.documentElement.classList.add('motion-ok');

  const items = document.querySelectorAll('[data-reveal]');
  if (!items.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-in');
      observer.unobserve(entry.target);
    });
  }, REVEAL);

  items.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92 && rect.bottom > 24) {
      requestAnimationFrame(() => el.classList.add('is-in'));
    } else {
      observer.observe(el);
    }
  });

  reduced.addEventListener('change', () => {
    if (reduced.matches) {
      document.documentElement.classList.remove('motion-ok');
      items.forEach((el) => el.classList.add('is-in'));
    }
  });
}
